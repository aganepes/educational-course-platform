import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { neon } from "@neondatabase/serverless";
import { Pool } from "pg";
import * as users from "./schemas/users";
import * as courses from "./schemas/courses";
import * as instructors from "./schemas/instructors";
import * as purchases from "./schemas/purchases";
import * as verifications from "./schemas/verifications";

import { loadEnvConfig } from '@next/env'
const projectDir = process.cwd()
loadEnvConfig(projectDir)

const dbUrl = process.env.DATABASE_URL!;

export const schema = {
  ...users,
  ...courses,
  ...instructors,
  ...purchases,
  ...verifications
}

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