import { db } from "./index";
import { vehicles, serviceRecords, users } from "./schema";
import { eq, desc } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getDemoUser() {
  const allUsers = await db.select().from(users).limit(1);
  if (allUsers.length > 0) {
    return allUsers[0];
  }
  // Fallback test user
  const [newUser] = await db.insert(users).values({
    email: "test@example.com",
    phone: "+79991234567",
  }).returning();
  return newUser;
}

export async function getUserById(id: string) {
  const found = await db.select().from(users).where(eq(users.id, id)).limit(1);
  if (found.length > 0) {
    return found[0];
  }
  return null;
}

export async function getUserByEmail(email: string) {
  const found = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
  if (found.length > 0) {
    return found[0];
  }
  // Auto-create test user if they log in
  const [newUser] = await db.insert(users).values({
    email: email.toLowerCase().trim(),
  }).returning();
  return newUser;
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (userId) {
    const found = await getUserById(userId);
    if (found) return found;
  }
  return await getDemoUser();
}

export async function getVehicles(userId: string) {
  return await db.query.vehicles.findMany({
    where: eq(vehicles.userId, userId),
    with: {
      serviceRecords: true,
    },
  });
}

export async function getGarageStats(userId: string) {
  const allVehicles = await db.query.vehicles.findMany({
    where: eq(vehicles.userId, userId),
    with: {
      serviceRecords: true,
    },
  });

  const totalSpent = allVehicles.reduce((acc, car) => {
    const carSpent = car.serviceRecords.reduce((s, rec) => s + Number(rec.totalAmount), 0);
    return acc + carSpent;
  }, 0);

  const totalRecords = allVehicles.reduce((acc, car) => acc + car.serviceRecords.length, 0);

  return {
    totalSpent: `${totalSpent.toLocaleString("ru-RU")} ₽`,
    totalRecords: totalRecords.toString(),
    // Placeholder for next service - would need more complex logic
    nextService: "Скоро", 
  };
}

export async function getRecentRecords(userId: string, limit = 2) {
  // This is a bit complex with current schema to do in one query across all vehicles
  // For now, let's fetch all vehicles and their records, then flatten and sort
  const allVehicles = await db.query.vehicles.findMany({
    where: eq(vehicles.userId, userId),
    with: {
      serviceRecords: {
        orderBy: [desc(serviceRecords.date)],
        limit: limit,
      },
    },
  });

  const records = allVehicles.flatMap(v => 
    v.serviceRecords.map(r => ({
      ...r,
      vehicleMake: v.make,
      vehicleModel: v.model,
    }))
  );

  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
}

export async function getVehicleDetail(vehicleId: string) {
  return await db.query.vehicles.findFirst({
    where: eq(vehicles.id, vehicleId),
    with: {
      serviceRecords: {
        orderBy: [desc(serviceRecords.date)],
        with: {
          items: true,
        },
      },
    },
  });
}
