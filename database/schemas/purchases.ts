import {
  varchar,
  integer,
  timestamp,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { courses } from "./courses";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { mySchema } from './schema';

export const purchases = mySchema.table(
  "purchases",
  {
    userId: varchar("user_id", { length: 255 }).notNull()
    .references(() => users.id, { onDelete: "restrict" }),
    courseId: varchar("course_id", { length: 255 })
      .notNull()
      .references(() => courses.id, { onDelete: "restrict" }),
    pricePaid: integer("price_paid").notNull().default(0),
    status: varchar("status", { length: 50 }).notNull().default("active"),
    createdAt: timestamp("created_at", { mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.courseId] }),
    index("purchases_user_idx").on(table.userId),
    index("purchases_course_idx").on(table.courseId),
  ]
);


export const coursesRelations = relations(courses, ({ many }) => ({
  purchases: many(purchases),
}));

export const purchasesRelations = relations(purchases, ({ one }) => ({
  course: one(courses, {
    fields: [purchases.courseId],
    references: [courses.id],
  }),
}));


export type PurchaseSelect = typeof purchases.$inferSelect;
export type PurchaseInsert = typeof purchases.$inferInsert;