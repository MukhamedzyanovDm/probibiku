import { db } from "@/db";
import { getPresignedDownloadUrl } from "@/lib/s3";
import { vehicles } from "@/db/schema";
import { getVehicleDetail, getSessionUser } from "@/db/queries";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getCarImageUrl } from "@/lib/wikipedia-image";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }
    const vehicle = await getVehicleDetail(id);
    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    // Auto-fetch and save Wikipedia image if missing
    if (!vehicle.imageUrl) {
      try {
        const wikiUrl = await getCarImageUrl(vehicle.make, vehicle.model);
        if (wikiUrl) {
          vehicle.imageUrl = wikiUrl;
          await db.update(vehicles)
            .set({ imageUrl: wikiUrl })
            .where(eq(vehicles.id, id));
        }
      } catch (wikiError) {
        console.error("Failed to auto-fetch Wikipedia image in GET /api/vehicles:", wikiError);
      }
    }

    // Generate presigned download URLs for all service record receipts
    const serviceRecordsWithUrls = await Promise.all(
      (vehicle.serviceRecords || []).map(async (rec) => {
        let receiptUrl = null;
        if (rec.receiptImageUrl) {
          try {
            receiptUrl = await getPresignedDownloadUrl(rec.receiptImageUrl);
          } catch (e) {
            console.error("Failed to generate download URL for", rec.receiptImageUrl, e);
          }
        }
        return {
          ...rec,
          receiptUrl,
        };
      })
    );

    const vehicleWithUrls = {
      ...vehicle,
      serviceRecords: serviceRecordsWithUrls,
    };

    return NextResponse.json(vehicleWithUrls);
  } catch (error) {
    console.error("Failed to fetch vehicle:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    const body = await request.json();
    const { make, model, year, plateNumber, currentMileage, vin, imageUrl, insuranceExpiry } = body;

    if (!make || !model) {
      return NextResponse.json(
        { error: "Make and model are required" },
        { status: 400 }
      );
    }

    // Auto-fetch Wikipedia image if missing
    let finalImageUrl = imageUrl || null;
    if (!finalImageUrl) {
      try {
        finalImageUrl = await getCarImageUrl(make, model);
      } catch (wikiError) {
        console.error("Failed to auto-fetch Wikipedia image in POST /api/vehicles:", wikiError);
      }
    }

    const newVehicle = await db.insert(vehicles).values({
      userId: user.id,
      make,
      model,
      year: year ? parseInt(year) : null,
      plateNumber,
      currentMileage: currentMileage ? parseInt(currentMileage) : 0,
      vin,
      imageUrl: finalImageUrl,
      insuranceExpiry,
    }).returning();

    return NextResponse.json(newVehicle[0]);
  } catch (error) {
    console.error("Failed to create vehicle:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }
    await db.delete(vehicles).where(eq(vehicles.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete vehicle:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, make, model, year, plateNumber, currentMileage, vin, imageUrl, insuranceExpiry } = body;
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const [existing] = await db.select().from(vehicles).where(eq(vehicles.id, id));

    let finalImageUrl = imageUrl || null;
    
    // If make or model changed, and the image is from Wikipedia, reset it to auto-fetch the new model image
    if (existing && (existing.make !== make || existing.model !== model)) {
      const isWikiImage = existing.imageUrl && (existing.imageUrl.includes("wikipedia.org") || existing.imageUrl.includes("wikimedia.org"));
      if (isWikiImage || !imageUrl) {
        finalImageUrl = null;
      }
    }

    if (!finalImageUrl && make && model) {
      try {
        finalImageUrl = await getCarImageUrl(make, model);
      } catch (wikiError) {
        console.error("Failed to auto-fetch Wikipedia image in PATCH /api/vehicles:", wikiError);
      }
    }

    const updated = await db.update(vehicles)
      .set({
        make,
        model,
        year: year ? parseInt(year) : null,
        plateNumber,
        currentMileage: currentMileage ? parseInt(currentMileage) : 0,
        vin,
        imageUrl: finalImageUrl,
        insuranceExpiry,
      })
      .where(eq(vehicles.id, id))
      .returning();
    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Failed to update vehicle:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
