import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { NextResponse } from "next/server";

// Temporary demo userId until auth is fully integrated
const DEMO_USER_ID = "00000000-0000-0000-0000-000000000000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { make, model, year, plateNumber, currentMileage, vin } = body;

    if (!make || !model) {
      return NextResponse.json(
        { error: "Make and model are required" },
        { status: 400 }
      );
    }

    const newVehicle = await db.insert(vehicles).values({
      userId: DEMO_USER_ID,
      make,
      model,
      year: year ? parseInt(year) : null,
      plateNumber,
      currentMileage: currentMileage ? parseInt(currentMileage) : 0,
      vin,
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
