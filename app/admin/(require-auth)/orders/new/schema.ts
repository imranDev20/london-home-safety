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
  parkingOptions: z.enum(["PAID", "FREE", "NO"], {
    required_error: "Please select a parking option",
    invalid_type_error: "Invalid parking option selected",
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
  phone: z.string({
    required_error: "Phone number is required",
  }),

  street: z
    .string({
      required_error: "Street address is required",
    })
    .min(3, {
      message: "Street address must be at least 3 characters long",
    }),
  city: z
    .string({
      required_error: "City is required",
    })
    .min(2, {
      message: "City name must be at least 2 characters long",
    }),
  postcode: z
    .string({
      required_error: "Postcode is required",
    })
    .refine((val) => /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/.test(val), {
      message: "Please enter a valid UK postcode",
    }),
});

export type CreateUserFormInput = z.infer<typeof createUserSchema>;
