import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../schemas/users";

// 1. Bazaga Ulanyjy Goşmak / Register Etmek Üçin Validasiýa
export const insertUserSchema = createInsertSchema(users, {
  username: z
    .string()
    .min(3, "validation.usernameMin")
    .max(50),
  email: z
    .string()
    .email("validation.invalidEmail")
    .or(z.literal(""))
    .optional()
    .transform((val) => val ?? null),
  phone: z
    .string()
    .min(8, "validation.phoneMin")
    .regex(/^\+?[0-9]{8,15}$/, "validation.phoneRegex")
    .or(z.literal(""))
    .optional()
    .transform((val) => val ?? null),
  password: z
    .string()
    .min(6, "validation.passwordMin"),
  role: z
  .string()
  .min(4)
}).refine((data) => data.email || data.phone, {
  message: "validation.emailOrPhoneRequired",
  path: ["email"],
});

// Bazadan Ulanyjyny Seçip Almak / Barlamak Üçin
export const selectUserSchema = createSelectSchema(users);

// TypeScript tiplerini almak
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;