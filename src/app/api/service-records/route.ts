import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { serviceRecords, workItems, vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";

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
      type
    } = data;

    if (!vehicleId || !date || !totalAmount) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("⏳ Starting DB transaction...");
    const result = await db.transaction(async (tx) => {
      // 1. Create service record
      console.log("📝 Inserting service record...");
      const [record] = await tx.insert(serviceRecords).values({
        vehicleId,
        date: new Date(date).toISOString(),
        odometer: odometer ? parseInt(odometer.toString()) : 0,
        totalAmount: totalAmount.toString(),
        serviceCenterName,
        status: "manual",
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
      type
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
    await db.delete(serviceRecords).where(eq(serviceRecords.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete service record:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
