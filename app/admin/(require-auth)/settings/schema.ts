import { z } from "zod";

export const siteSettingsSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address for customer inquiries."),
  phone1: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Please enter a valid phone number including the country code."
    ),
  phone2: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Please enter a valid alternative phone number including the country code."
    )
    .optional()
    .or(z.literal("")),
  whatsapp: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Please enter a valid WhatsApp number including the country code."
    )
    .optional()
    .or(z.literal("")),
  websiteUrl: z
    .string()
    .url(
      "Please enter a valid website URL, including the protocol (e.g., https://)."
    )
    .optional()
    .or(z.literal("")),
  facebookUrl: z
    .string()
    .url("Please enter a valid Facebook page URL.")
    .optional()
    .or(z.literal("")),
  twitterUrl: z
    .string()
    .url("Please enter a valid Twitter profile URL.")
    .optional()
    .or(z.literal("")),
  instagramUrl: z
    .string()
    .url("Please enter a valid Instagram profile URL.")
    .optional()
    .or(z.literal("")),
  address: z.object({
    street: z.string().min(1, "Please provide the street address."),
    city: z.string().min(1, "Please specify the city."),
    postcode: z.string().min(1, "Please enter the postcode."),
  }),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;
