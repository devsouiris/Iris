import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const sql = neon(process.env.DATABASE_URL);

/**
 * Global database client for Neon (HTTP pool).
 * Using neon-http for serverless compatibility.
 */
export const db = drizzle(sql, { schema });
