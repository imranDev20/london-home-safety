import { PaymentMethod } from "@prisma/client";
import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.string().cuid({
    message: "Please select a valid customer",
  }),
  assignedEngineer: z
    .string()
    .cuid({
      message: "Please select a valid engineer",
    })
    .optional()
    .nullable(),
  services: z
    .array(
      z.object({
        serviceId: z.string().cuid({
          message: "Please select a valid service",
        }),
      })
    )
    .min(1, {
      message: "At least one service must be selected",
    }),
  isParkingAvailable: z.boolean({
    required_error: "Please indicate if parking is available",
  }),
  isCongestionZone: z.boolean({
    required_error: "Please indicate if the property is in a congestion zone",
  }),
  inspectionTime: z.enum(["MORNING", "AFTERNOON", "EVENING"], {
    required_error: "Please select an inspection time slot",
    invalid_type_error: "Invalid time slot selected",
  }),
  date: z.coerce
    .date({
      required_error: "Please select a valid date",
      invalid_type_error: "Invalid date format",
    })
    .min(new Date(), {
      message: "Inspection date must be in the future",
    }),
  invoiceId: z.string({
    required_error: "Invoice ID is required",
  }),
  PaymentMethod: z.nativeEnum(PaymentMethod, {
    required_error: "Please select a payment method",
    invalid_type_error: "Invalid payment method selected",
  }),
});

export type CreateOrderFormInput = z.infer<typeof createOrderSchema>;

export const createUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, {
      message: "Name must be at least 2 characters long",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10}$/.test(val), {
      message: "Phone number must be 10 digits",
    }),
  street: z
    .string()
    .min(3, {
      message: "Street address must be at least 3 characters long",
    })
    .optional(),
  city: z
    .string()
    .min(2, {
      message: "City name must be at least 2 characters long",
    })
    .optional(),
  postcode: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/.test(val),
      {
        message: "Please enter a valid UK postcode",
      }
    ),
});

export type CreateUserFormInput = z.infer<typeof createUserSchema>;
