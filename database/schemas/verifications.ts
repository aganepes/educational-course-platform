import { pgTable, varchar, timestamp, index } from "drizzle-orm/pg-core";

export const purchaseVerifications = pgTable(
  "purchase_verifications",
  {
    id: varchar("id", { length: 255 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id", { length: 255 }).notNull(),
    courseId: varchar("course_id", { length: 255 }).notNull(),
    code: varchar("code", { length: 6 }).notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("verification_user_course_idx").on(table.userId, table.courseId),
  ]
);