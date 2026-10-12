import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config({ path: '.env.local' });
dotenvExpand.expand(myEnv);

export default defineConfig({
  schema: './database/schemas',
  out: './drizzle',
  dialect: 'postgresql',
  schemaFilter: [process.env.DATABASE_SCHEMA || "test"],
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://localhost:5432",
  },
});