import { z } from "zod";

export const purchaseSchema = z.object({
  userId: z.string().min(1, "User ID hökmany bolmaly"),
  courseId: z.string().min(1, "Course ID hökmany bolmaly"),
  pricePaid: z.number().int().nonnegative("Bahasy nädogry").default(0),
  status: z.enum(["active", "refunded", "pending"]).default("active"),
});

export type PurchaseInput = z.infer<typeof purchaseSchema>;