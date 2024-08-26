import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string().cuid(),
  assignedEngineer: z.string().cuid().optional().nullable(),
  services: z.array(
    z.object({
      serviceId: z.string().cuid(),
    })
  ),

  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED", "CONFIRMED"])
    .default("PENDING"),
  paymentStatus: z.enum(["UNPAID", "PAID", "REFUNDED"]).default("UNPAID"),
  paymentMethod: z
    .enum(["CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "CASH"])
    .default("CREDIT_CARD"),

  parkingOptions: z.enum(["PAID", "FREE", "NO"], {
    required_error: "Please select a parking option",
    invalid_type_error: "Invalid parking option selected",
  }),
  isCongestionZone: z.boolean(),
  inspectionTime: z.string(), // You might want to use a more specific validation for time format
  date: z.coerce.date(),
  orderNotes: z.string().optional(),
  totalPrice: z.string(), // Consider using a more specific validation for currency
  invoiceId: z.string(),
});

export type OrderFormInput = z.infer<typeof orderSchema>;
