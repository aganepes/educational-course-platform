import { z } from "zod";

// Sargyt formasy
export const CheckoutFormSchema = z.object({
  userId: z.string().min(3,"UserId 3 den az bolmaly däl"),
  amount: z.number().positive("Sargyt mukdary 0-dan uly bolmaly"),
});

export type CheckoutFormDTO = z.infer<typeof CheckoutFormSchema>;

// Bank API schemas
export const BankRegisterResponseSchema = z.object({
  orderId: z.string().optional(),
  formUrl: z.string().url().optional(),
  errorCode: z.string(),
  errorMessage: z.string().optional(),
});

export const BankStatusResponseSchema = z.object({
  orderStatus: z.number(), // 2 = Success
  errorCode: z.string(),
  errorMessage: z.string().optional(),
  amount: z.number().optional(),
});