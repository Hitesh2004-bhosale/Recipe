import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js";
import * as schema from "../db/schema.js";

// Create Neon HTTP client
//const sql = neon(ENV.DATABASE_URL);

// Initialize Drizzle ORM with schema
export const db = drizzle(sql, { schema });







import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default sql;
