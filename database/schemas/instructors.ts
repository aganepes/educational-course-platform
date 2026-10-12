import {
  varchar,
  text,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { mySchema } from './schema';

export type MultilingualText = {
  tm: string;
  ru: string;
  en: string;
  [key: string]: string;
};


export type SocialLinks = {
  linkedin?: string;
  telegram?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
  [key: string]: string | undefined;
};

export const instructors = mySchema.table("instructors", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(()=>crypto.randomUUID()),
  name: jsonb("name").$type<MultilingualText>().notNull(),
  profession: jsonb("profession").$type<MultilingualText>().notNull(),
  avatar: text("avatar").notNull(),
  socials: jsonb("socials").$type<SocialLinks>().notNull().default({}),
  createdAt: timestamp("created_at", { mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type InstructorSelect = typeof instructors.$inferSelect;
export type InstructorInsert = typeof instructors.$inferInsert;