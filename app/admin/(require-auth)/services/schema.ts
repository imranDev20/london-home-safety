import { z } from "zod";

export const serviceSchema = z.object({
  id: z.string().cuid({ message: "Invalid service ID format" }),
  name: z.string().min(1, { message: "Service name is required" }),
  type: z.enum(
    ["CERTIFICATE", "REPAIR", "INSTALLATION", "INSPECTION", "OTHER"],
    { message: "Invalid service type" }
  ),
  category: z.enum(["ELECTRICAL", "FIRE", "GAS", "HEALTH_SAFETY"], {
    message: "Invalid service category",
  }),
  description: z.string().optional(),
  propertyType: z.enum(["RESIDENTIAL", "COMMERCIAL"], {
    message: "Invalid property type",
  }),
  residentialType: z
    .enum(
      [
        "BUNGALOW",
        "MID_TERRACED_HOUSE",
        "DETACHED_HOUSE",
        "SEMI_DETACHED_HOUSE",
        "FLAT",
        "APARTMENT",
        "OTHER",
      ],
      { message: "Invalid residential type" }
    )
    .optional(),
  commercialType: z
    .enum(["PUB", "STORE", "OFFICE", "RESTAURANT", "WAREHOUSE", "OTHER"], {
      message: "Invalid commercial type",
    })
    .optional(),
  unitType: z.string().optional(),
  issuedDate: z.date().optional(),
  expiryDate: z.date().optional(),
  orderId: z.string().optional(),
  createdAt: z
    .date()
    .default(() => new Date())
    .optional(),
  updatedAt: z
    .date()
    .default(() => new Date())
    .optional(),
});

export type ServiceFormInput = z.infer<typeof serviceSchema>;
