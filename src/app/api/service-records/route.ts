import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { serviceRecords, workItems, vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { deleteObjectFromS3 } from "@/lib/s3";

export async function POST(req: NextRequest) {
  console.log("🚀 POST /api/service-records - Started");
  const startTime = Date.now();
  
  try {
    const data = await req.json();
    console.log("📦 Received data:", JSON.stringify(data, null, 2));
    
    const { 
      vehicleId, 
      date, 
      odometer, 
      serviceCenterName, 
      items, 
      totalAmount,
      type,
      receiptImageUrl,
      ocrRawData
    } = data;

    if (!vehicleId || !date || !totalAmount) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Recalculate total amount on the server
    let finalTotalAmount = "0";
    if (items && items.length > 0) {
      const sum = items.reduce((acc: number, item: any) => {
        const cost = parseFloat(item.cost?.toString() || "0") || 0;
        const qty = parseFloat(item.quantity?.toString() || "1") || 1;
        return acc + Math.round(cost * qty * 100) / 100;
      }, 0);
      finalTotalAmount = (Math.round(sum * 100) / 100).toString();
    } else {
      finalTotalAmount = totalAmount.toString();
    }

    console.log("⏳ Starting DB transaction...");
    const result = await db.transaction(async (tx) => {
      // 1. Create service record
      console.log("📝 Inserting service record...");
      const [record] = await tx.insert(serviceRecords).values({
        vehicleId,
        date: new Date(date).toISOString(),
        odometer: odometer ? parseInt(odometer.toString()) : 0,
        totalAmount: finalTotalAmount,
        serviceCenterName,
        receiptImageUrl: receiptImageUrl || null,
        status: "manual",
        ocrRawData: ocrRawData || null,
      }).returning();
      console.log("✅ Service record created:", record.id);

      // 2. Create work items
      if (items && items.length > 0) {
        console.log(`🛠 Inserting ${items.length} work items...`);
        const itemCategoryMap = {
          "ТО": "maintenance" as const,
          "Ремонт": "repair" as const,
          "Тюнинг": "tuning" as const,
          "Другое": "maintenance" as const,
        };
        const category = itemCategoryMap[type as keyof typeof itemCategoryMap] || "maintenance";
        
        await tx.insert(workItems).values(
          items.map((item: any) => ({
            recordId: record.id,
            description: item.description,
            cost: item.cost.toString(),
            quantity: (item.quantity || "1").toString(),
            category,
          }))
        );
        console.log("✅ Work items inserted");
      }

      // 3. Update vehicle mileage if higher
      console.log("🚗 Checking vehicle mileage...");
      const [vehicle] = await tx.select().from(vehicles).where(eq(vehicles.id, vehicleId));
      const newOdometer = odometer ? parseInt(odometer.toString()) : 0;
      
      if (vehicle && newOdometer > (vehicle.currentMileage || 0)) {
        console.log(`📈 Updating mileage from ${vehicle.currentMileage} to ${newOdometer}`);
        await tx.update(vehicles)
          .set({ currentMileage: newOdometer })
          .where(eq(vehicles.id, vehicleId));
        console.log("✅ Mileage updated");
      } else {
        console.log("ℹ️ Mileage update not needed or vehicle not found");
      }

      // 4. Reset advice history hash to force AI advice re-generation
      console.log("🔄 Resetting advice history hash...");
      await tx.update(vehicles)
        .set({ adviceHistoryHash: null })
        .where(eq(vehicles.id, vehicleId));
      console.log("✅ Advice history hash reset");

      return record;
    });

    const duration = Date.now() - startTime;
    console.log(`✨ POST /api/service-records - Success (${duration}ms)`);
    return NextResponse.json({ success: true, recordId: result.id });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`💥 POST /api/service-records - Failed after ${duration}ms:`, error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  console.log("🚀 PATCH /api/service-records - Started");
  const startTime = Date.now();
  
  try {
    const data = await req.json();
    console.log("📦 Received update data:", JSON.stringify(data, null, 2));
    
    const { 
      id,
      vehicleId, 
      date, 
      odometer, 
      serviceCenterName, 
      items, 
      totalAmount,
      type,
      receiptImageUrl
    } = data;

    if (!id || !vehicleId || !date || !totalAmount) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("⏳ Starting DB transaction for update...");
    await db.transaction(async (tx) => {
      // 1. Update service record
      console.log("📝 Updating service record...");
      await tx.update(serviceRecords)
        .set({
          date: new Date(date).toISOString(),
          odometer: odometer ? parseInt(odometer.toString()) : 0,
          totalAmount: totalAmount.toString(),
          serviceCenterName,
          receiptImageUrl: receiptImageUrl || null,
          status: "manual",
        })
        .where(eq(serviceRecords.id, id));

      // 2. Re-create work items (Delete then Insert)
      console.log("🛠 Updating work items (re-create)...");
      await tx.delete(workItems).where(eq(workItems.recordId, id));

      if (items && items.length > 0) {
        const itemCategoryMap = {
          "ТО": "maintenance" as const,
          "Ремонт": "repair" as const,
          "Тюнинг": "tuning" as const,
          "Другое": "maintenance" as const,
        };
        const category = itemCategoryMap[type as keyof typeof itemCategoryMap] || "maintenance";

        await tx.insert(workItems).values(
          items.map((item: any) => ({
            recordId: id,
            description: item.description,
            cost: item.cost.toString(),
            quantity: (item.quantity || "1").toString(),
            category,
          }))
        );
      }

      // 3. Update vehicle mileage if higher
      console.log("🚗 Checking vehicle mileage...");
      const [vehicle] = await tx.select().from(vehicles).where(eq(vehicles.id, vehicleId));
      const newOdometer = odometer ? parseInt(odometer.toString()) : 0;
      
      if (vehicle && newOdometer > (vehicle.currentMileage || 0)) {
        console.log(`📈 Updating mileage from ${vehicle.currentMileage} to ${newOdometer}`);
        await tx.update(vehicles)
          .set({ currentMileage: newOdometer })
          .where(eq(vehicles.id, vehicleId));
        console.log("✅ Mileage updated");
      }

      // 4. Reset advice history hash to force AI advice re-generation
      console.log("🔄 Resetting advice history hash...");
      await tx.update(vehicles)
        .set({ adviceHistoryHash: null })
        .where(eq(vehicles.id, vehicleId));
      console.log("✅ Advice history hash reset");
    });

    const duration = Date.now() - startTime;
    console.log(`✨ PATCH /api/service-records - Success (${duration}ms)`);
    return NextResponse.json({ success: true });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`💥 PATCH /api/service-records - Failed after ${duration}ms:`, error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    // 1. Fetch record to get the receipt image URL (S3 Key)
    const [record] = await db.select().from(serviceRecords).where(eq(serviceRecords.id, id));

    // 2. Delete the record from database
    await db.delete(serviceRecords).where(eq(serviceRecords.id, id));

    // 3. Reset advice history hash to force AI advice re-generation
    if (record?.vehicleId) {
      try {
        console.log("🔄 Resetting advice history hash...");
        await db.update(vehicles)
          .set({ adviceHistoryHash: null })
          .where(eq(vehicles.id, record.vehicleId));
        console.log("✅ Advice history hash reset");
      } catch (dbError) {
        console.error("Failed to reset advice history hash:", dbError);
      }
    }

    // 4. Delete the file from S3 bucket if it exists
    if (record?.receiptImageUrl) {
      try {
        console.log(`🗑 Deleting receipt image from S3: ${record.receiptImageUrl}`);
        await deleteObjectFromS3(record.receiptImageUrl);
        console.log("✅ Receipt image deleted successfully from S3");
      } catch (s3Error) {
        console.error("⚠️ Failed to delete receipt image from S3:", s3Error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete service record:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
