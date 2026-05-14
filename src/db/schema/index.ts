import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  date,
  decimal,
  jsonb,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// --- Enums ---
export const recordStatusEnum = pgEnum("record_status", [
  "draft",     // Only OCR done, needs review
  "processed", // AI processing complete
  "manual",    // Verified/edited by user
]);

export const workItemCategoryEnum = pgEnum("work_item_category", [
  "maintenance",
  "repair",
  "parts",
  "tuning",
]);

// --- Tables ---

// 1. Users (Extending basic Auth info if needed)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  settings: jsonb("settings").default({ currency: "RUB", language: "ru" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Vehicles (The "Garage")
export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  make: varchar("make", { length: 100 }).notNull(), // Toyota
  model: varchar("model", { length: 100 }).notNull(), // Camry
  year: integer("year"),
  vin: varchar("vin", { length: 17 }),
  plateNumber: varchar("plate_number", { length: 20 }),
  currentMileage: integer("current_mileage").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Service Records (The Receipt/Invoice)
export const serviceRecords = pgTable("service_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  vehicleId: uuid("vehicle_id")
    .references(() => vehicles.id, { onDelete: "cascade" })
    .notNull(),
  date: date("date").notNull(),
  odometer: integer("odometer"), // Mileage at time of service
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  serviceCenterName: varchar("service_center_name", { length: 255 }),
  receiptImageUrl: text("receipt_image_url"), // S3 path
  ocrRawData: jsonb("ocr_raw_data"), // Full raw result from Yandex Vision/GPT
  status: recordStatusEnum("status").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Work Items (Line items inside the receipt)
export const workItems = pgTable("work_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  recordId: uuid("record_id")
    .references(() => serviceRecords.id, { onDelete: "cascade" })
    .notNull(),
  description: text("description").notNull(), // e.g., "Oil Change"
  category: workItemCategoryEnum("category").default("maintenance"),
  cost: decimal("cost", { precision: 12, scale: 2 }).notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 3 }).default("1"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Relations ---

export const usersRelations = relations(users, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  user: one(users, { fields: [vehicles.userId], references: [users.id] }),
  serviceRecords: many(serviceRecords),
}));

export const serviceRecordsRelations = relations(serviceRecords, ({ one, many }) => ({
  vehicle: one(vehicles, { fields: [serviceRecords.vehicleId], references: [vehicles.id] }),
  items: many(workItems),
}));

export const workItemsRelations = relations(workItems, ({ one }) => ({
  record: one(serviceRecords, { fields: [workItems.recordId], references: [serviceRecords.id] }),
}));
