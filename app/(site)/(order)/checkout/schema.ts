import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  street: z
    .string()
    .min(1, "Street address is required")
    .max(200, "Street address is too long"),
  city: z.string().min(1, "City is required").max(100, "City name is too long"),
  postcode: z
    .string()
    .min(1, "Postcode is required")
    .regex(
      /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2}$/,
      "Please enter a valid UK postcode"
    ),
  date: z
    .date({
      required_error: "Please select a date",
      invalid_type_error: "That's not a valid date",
    })
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Please select today or a future date"
    ),

  time: z.enum(["MORNING", "AFTERNOON", "EVENING"], {
    required_error: "Please select a time slot",
    invalid_type_error: "Please select a valid time slot",
  }),

  parkingOption: z.enum(["FREE", "NO", "PAID"], {
    required_error: "Please select a parking option",
    invalid_type_error: "Please select a valid parking option",
  }),
  isInCongestionZone: z.boolean({
    required_error: "Please indicate if you're in a congestion zone",
    invalid_type_error: "Congestion zone selection must be yes or no",
  }),
});

export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;
