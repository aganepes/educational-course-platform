import {
  varchar,
  text,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { mySchema } from './schema';
import { MultilingualText } from "./instructors";


export const paymenMethods = mySchema.table("payment_methods", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(()=>crypto.randomUUID()),
  name: jsonb().$type<MultilingualText>().notNull(),
  logo: text().notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type PaymentMethodsSelect = typeof paymenMethods.$inferSelect;
export type PaymentMethodsInsert = typeof paymenMethods.$inferInsert;