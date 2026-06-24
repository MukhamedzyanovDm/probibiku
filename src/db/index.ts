import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import * as schema from "./schema/index";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env");
}

// Singleton pattern for Pool to prevent connection leaks during Next.js hot reloads in development
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const pool = globalForDb.conn ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Limit connections to prevent exceeding Supabase limits
  idleTimeoutMillis: 10000, // Close idle connections faster
});

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = pool;
}

export const db = drizzlePg(pool, { schema });
