CREATE TYPE "public"."record_status" AS ENUM('draft', 'processed', 'manual');--> statement-breakpoint
CREATE TYPE "public"."work_item_category" AS ENUM('maintenance', 'repair', 'parts', 'tuning');--> statement-breakpoint
CREATE TABLE "service_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"date" date NOT NULL,
	"odometer" integer,
	"total_amount" numeric(12, 2) NOT NULL,
	"service_center_name" varchar(255),
	"receipt_image_url" text,
	"ocr_raw_data" jsonb,
	"status" "record_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"settings" jsonb DEFAULT '{"currency":"RUB","language":"ru"}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"make" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer,
	"vin" varchar(17),
	"plate_number" varchar(20),
	"current_mileage" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "work_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"record_id" uuid NOT NULL,
	"description" text NOT NULL,
	"category" "work_item_category" DEFAULT 'maintenance',
	"cost" numeric(12, 2) NOT NULL,
	"quantity" numeric(10, 3) DEFAULT '1',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "service_records" ADD CONSTRAINT "service_records_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_items" ADD CONSTRAINT "work_items_record_id_service_records_id_fk" FOREIGN KEY ("record_id") REFERENCES "public"."service_records"("id") ON DELETE cascade ON UPDATE no action;