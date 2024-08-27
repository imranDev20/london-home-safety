

import { z } from "zod";

// Enums for Select options
export const ServiceCategorySchema = z.enum([
  "ELECTRICAL",
  "FIRE",
  "GAS",
  "HEALTH_SAFETY",
]);

export const ServiceTypeSchema = z.enum([
  "CERTIFICATE",
  "REPAIR",
  "INSTALLATION",
  "INSPECTION",
  "OTHER",
]);

export const PropertyTypeSchema = z.enum(["RESIDENTIAL", "COMMERCIAL"]);

export const ResidentialTypeSchema = z.enum([
  "BUNGALOW",
  "MID_TERRACED_HOUSE",
  "DETACHED_HOUSE",
  "SEMI_DETACHED_HOUSE",
  "FLAT",
  "APARTMENT",
  "OTHER",
]);

export const CommercialTypeSchema = z.enum([
  "PUB",
  "STORE",
  "OFFICE",
  "RESTAURANT",
  "WAREHOUSE",
  "OTHER",
]);

// Zod schema for a service package
export const PackageSchema = z.object({
  name: z.string().min(1, "Package name is required"),
  description: z.string().optional(),
  unitCount: z.number().min(1, "Unit count must be at least 1"),
  price: z.string().min(1, "Price is required"),
});

// Main Zod schema for the form
export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  type: ServiceTypeSchema,
  category: ServiceCategorySchema,
  description: z.string().optional(),
  propertyType: PropertyTypeSchema,
  residentialType: ResidentialTypeSchema.optional(),
  commercialType: CommercialTypeSchema.optional(),
  unitType: z.string().optional(),
  issuedDate: z.date().optional(),
  expiryDate: z.date().optional(),
  packages: z.array(PackageSchema).min(1, "At least one package is required"),
});

// TypeScript type derived from the schema
export type ServiceFormInputType = z.infer<typeof serviceSchema>;
