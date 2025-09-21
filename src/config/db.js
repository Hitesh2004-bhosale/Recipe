import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema.js";

// Create Neon HTTP client
const sql = neon(process.env.DATABASE_URL);

// Initialize Drizzle ORM with schema
export const db = drizzle(sql, { schema });
