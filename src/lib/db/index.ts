import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const databaseUrl = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("POSTGRES_URL or DATABASE_URL is missing");
}

const sql = postgres(databaseUrl, {
  max: 1,
  prepare: false,
  ssl: "require",
});

/**
 * Supabase Postgres through the transaction pooler.
 * Prepared statements are disabled for pooler compatibility.
 */
export const db = drizzle(sql, { schema });
