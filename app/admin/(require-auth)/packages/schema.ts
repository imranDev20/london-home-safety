import {
  CommercialType,
  PackageCategory,
  PackageType,
  PropertyType,
  ResidentialType,
} from "@prisma/client";
import { z } from "zod";

export const packageSchema = z.object({
  name: z
    .string({
      required_error: "Package name is required",
    })
    .min(1, { message: "Package name cannot be empty" }),
  type: z.nativeEnum(PackageType, {
    errorMap: () => ({ message: "Invalid package type selected" }),
  }),
  category: z.nativeEnum(PackageCategory, {
    errorMap: () => ({ message: "Invalid package category selected" }),
  }),
  price: z
    .string({
      required_error: "Price is required",
    })
    .min(1, { message: "Price cannot be empty" }),
  serviceName: z
    .string({
      required_error: "Service name is required",
    })
    .min(1, { message: "Service name cannot be empty" }),
  description: z.string().optional(),
  propertyType: z.nativeEnum(PropertyType, {
    errorMap: () => ({ message: "Invalid property type selected" }),
  }),
  residentialType: z
    .nativeEnum(ResidentialType, {
      errorMap: () => ({ message: "Invalid residential type selected" }),
    })
    .optional(),
  commercialType: z
    .nativeEnum(CommercialType, {
      errorMap: () => ({ message: "Invalid commercial type selected" }),
    })
    .optional(),
  unitType: z.string().optional(),
});

export type PackageFormInputType = z.infer<typeof packageSchema>;
