import { z } from "zod";

export const checkoutFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  date: z.date(),
  time: z.enum(["morning", "afternoon", "evening"]),
  parkingOption: z.enum(["free", "no", "paid"]),
  isInCongestionZone: z.boolean(),
});

export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;
