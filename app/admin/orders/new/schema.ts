import { PaymentMethod } from "@prisma/client";
import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.string().cuid(),
  assignedEngineer: z.string().cuid().optional().nullable(),
  services: z.array(
    z.object({
      serviceId: z.string().cuid(),
    })
  ),
  isParkingAvailable: z.boolean(),
  isCongestionZone: z.boolean(),
  inspectionTime: z.string(), // You might want to use a more specific validation for time format
  date: z.coerce.date(),
  invoiceId: z.string(),
  PaymentMethod: z.enum(["CASH_TO_ENGINEER", "BANK_TRANSFER"]),
});

export type CreateOrderFormInput = z.infer<typeof createOrderSchema>;

export const createUserSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }).email(),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
});

export type CreateUserFormInput = z.infer<typeof createUserSchema>;