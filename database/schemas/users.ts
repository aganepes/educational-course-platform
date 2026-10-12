import { text, varchar, timestamp } from "drizzle-orm/pg-core";
import { mySchema } from './schema';

export const users = mySchema.table("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: varchar("username", { length: 50 }).notNull().unique(),
  
  email: text("email").unique(),
  phone: varchar("phone", { length: 20 }).unique(),
  
  password: text("password").notNull(),
  role:text('role').notNull().default('user'),
  createdAt: timestamp("created_at").defaultNow(),
  
  activeSessionId: text("active_session_id"),
});


export type UsersSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;