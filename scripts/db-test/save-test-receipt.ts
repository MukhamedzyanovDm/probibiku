import { db } from "../../src/db";
import { users, vehicles, serviceRecords, workItems } from "../../src/db/schema";

async function main() {
  console.log("⏳ Starting database seeding...");

  // 1. Create a Test User
  const [testUser] = await db.insert(users).values({
    email: "test@example.com",
    phone: "+79991234567",
  }).returning();
  console.log(`✅ Created user: ${testUser.id}`);

  // 2. Create a Test Vehicle
  const [testCar] = await db.insert(vehicles).values({
    userId: testUser.id,
    make: "Opel",
    model: "Astra",
    year: 2014,
    currentMileage: 93405,
  }).returning();
  console.log(`✅ Created vehicle: ${testCar.id}`);

  // 3. Structured Data from our GPT test (Om Club receipt)
  const gptData = {
    "date": "2025-02-14",
    "total_amount": "77250.00",
    "mileage": 93405,
    "service_name": "om club",
    "items": [
      { "name": "Защита картера с/у", "price": "520.00" },
      { "name": "Помпа D4 с/у", "price": "4810.00" },
      { "name": "ТЕРМОСТАТ В СБОРЕ с корпусом", "price": "15500.00" },
      { "name": "АНТИФРИЗ КРАСНЫЙ 5Л ГОТОВЫЙ", "price": "1600.00" }
    ]
  };

  // 4. Save Service Record
  const [record] = await db.insert(serviceRecords).values({
    vehicleId: testCar.id,
    date: gptData.date,
    odometer: gptData.mileage,
    totalAmount: gptData.total_amount,
    serviceCenterName: gptData.service_name,
    status: "processed",
  }).returning();
  console.log(`✅ Created service record: ${record.id}`);

  // 5. Save Work Items
  for (const item of gptData.items) {
    await db.insert(workItems).values({
      recordId: record.id,
      description: item.name,
      cost: item.price,
      quantity: "1",
    });
  }
  console.log(`✅ Created ${gptData.items.length} work items.`);

  console.log("\n🚀 Success! Check your Supabase dashboard to see the data.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
