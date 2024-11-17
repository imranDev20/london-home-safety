import { z } from "zod";
import { ParkingOptions } from "@prisma/client";

// Create an enum for address source
const AddressSourceEnum = z.enum(["manual", "search"]);
export type AddressSource = z.infer<typeof AddressSourceEnum>;

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "Please enter your first name")
    .max(50, "First name exceeds maximum length")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "First name should only contain letters, spaces, hyphens, and apostrophes"
    ),

  lastName: z
    .string()
    .min(2, "Please enter your last name")
    .max(50, "Last name exceeds maximum length")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "Last name should only contain letters, spaces, hyphens, and apostrophes"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email address is too short")
    .max(100, "Email address exceeds maximum length"),

  phone: z
    .string()
    .min(10, "Please enter a valid UK phone number")
    .max(15, "Phone number exceeds maximum length")
    .regex(
      /^(?:(?:\+44)|(?:0))(?:\d\s?){9,10}$/,
      "Please enter a valid UK phone number starting with +44 or 0"
    ),

  street: z
    .string()
    .min(5, "Please enter your complete street address")
    .max(200, "Street address exceeds maximum length")
    .regex(
      /^[a-zA-Z0-9\s,.-]+$/,
      "Street address should only contain letters, numbers, spaces, and basic punctuation"
    ),

  city: z
    .string()
    .min(2, "Please enter your city")
    .max(100, "City name exceeds maximum length")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "City should only contain letters, spaces, hyphens, and apostrophes"
    ),

  postcode: z
    .string()
    .min(6, "Please enter your postcode")
    .max(8, "Please enter a valid UK postcode")
    .regex(
      /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2}$/,
      "Please enter a valid UK postcode format (e.g., SW1A 1AA)"
    ),

  addressSource: AddressSourceEnum.default("search"),

  date: z
    .date({
      required_error: "Please select your preferred service date",
      invalid_type_error: "Invalid date format",
    })
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Service date must be today or a future date"
    ),

  timeSlotId: z.string().min(1, "Please select your preferred time slot"),

  parkingOption: z.nativeEnum(ParkingOptions, {
    required_error: "Please indicate parking availability",
    invalid_type_error: "Invalid parking option selected",
  }),

  isInCongestionZone: z.boolean({
    required_error:
      "Please indicate if your property is within the congestion zone",
    invalid_type_error: "Congestion zone must be selected as yes or no",
  }),

  orderNotes: z
    .string()
    .max(500, "Notes exceed maximum length of 500 characters")
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;
