import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string().cuid(),
  assignedEngineerId: z.string().cuid().optional().nullable(),
  services: z.array(z.string().cuid()), // Array of service IDs
  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .default("PENDING"),
  paymentStatus: z.enum(["UNPAID", "PAID", "REFUNDED"]).default("UNPAID"),
  paymentMethod: z
    .enum(["CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "CASH"])
    .default("CREDIT_CARD"),
  isParkingAvailable: z.boolean(),
  isCongestionZone: z.boolean(),
  inspectionTime: z.string(), // You might want to use a more specific validation for time format
  date: z.coerce.date(),
  orderNotes: z.string().optional(),
  totalPrice: z.string(), // Consider using a more specific validation for currency
  invoiceId: z.string(),
});

export type OrderFormInput = z.infer<typeof orderSchema>;
