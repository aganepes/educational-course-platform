import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { neon } from "@neondatabase/serverless";
import { Pool } from "pg";
import * as schema from "./schemas/users";

const dbUrl = process.env.DATABASE_URL!;

const createDb = () => {
  const isNeon = process.env.NODE_ENV === "production";

  if (isNeon) {
    const sql = neon(dbUrl);
    return drizzle(sql, { schema });
  }

  const pool = new Pool({
    connectionString: dbUrl,
  });

  return drizzlePg(pool, { schema });
};

export const db = createDb();