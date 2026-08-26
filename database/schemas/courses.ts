import {
  pgTable,
  varchar,
  text,
  integer,
  real,
  jsonb,
  timestamp,
  index,
  pgEnum,
  boolean
} from "drizzle-orm/pg-core";
import { instructors, type MultilingualText } from "./instructors";

export const GROUPS = ["construction", "programming"] as const;

export const groupEnum = pgEnum("course_group", GROUPS);


export const courses = pgTable(
  "courses",
  {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    image: text("image").notNull(),
    group: groupEnum("group").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    subcategory: varchar("subcategory", { length: 100 }).notNull(),
    title: jsonb("title").$type<MultilingualText>().notNull(),
    instructorId: varchar("instructor_id", { length: 255 })
      .notNull()
      .references(() => instructors.id, { onDelete: "restrict" }),
    rating: real("rating").notNull().default(0.0),
    level: text("level"),
    durationHours: integer("duration_hours").notNull().default(0),
    startTime:integer('start-time').notNull().default(0),
    publicDurationSeconds: integer("public_duration_seconds")
      .notNull()
      .default(360),
    lessons: integer("lessons").notNull().default(0),
    price: integer("price").notNull().default(0),
    videoURL: text("video_url").notNull(),
    isHslReady:boolean('is_hsl_ready').notNull().default(false),
    createdAt: timestamp("created_at", { mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("courses_group_idx").on(table.group),
    index("courses_category_idx").on(table.category),
    index("courses_instructor_idx").on(table.instructorId),
  ]
);

export type CourseSelect = typeof courses.$inferSelect;
export type CourseInsert = typeof courses.$inferInsert;