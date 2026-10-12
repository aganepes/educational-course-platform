import { pgSchema } from "drizzle-orm/pg-core";

import { loadEnvConfig } from '@next/env'
const projectDir = process.cwd()
loadEnvConfig(projectDir)

export const mySchema  =  pgSchema(process.env.DATABASE_SCHEMA!);