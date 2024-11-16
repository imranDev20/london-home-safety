import {
  OrderStatus,
  PackageCategory,
  PackageType,
  PaymentStatus,
  PropertyType,
} from "@prisma/client";

export const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "CANCELLED",
  "COMPLETED",
  "IN_PROGRESS",
  "PENDING",
  "CONFIRMED",
];

export const PAYMENT_STATUS_OPTION: PaymentStatus[] = [
  "UNPAID",
  "PARTIALLY_PAID",
  "PAID",
  "REFUNDED",
];

export const SERVICE_TYPE_OPTIONS: PackageType[] = [
  "CERTIFICATE",
  "REPAIR",
  "INSTALLATION",
  "INSPECTION",
  "OTHER",
];

export const SERVICE_CATEGORY_OPTION: PackageCategory[] = [
  "ELECTRICAL",
  "FIRE",
  "GAS",
  "HEALTH_SAFETY",
  "PROPERTY_MANAGEMENT",
];

export const PROPERTY_TYPE_OPTIONS: PropertyType[] = [
  "RESIDENTIAL",
  "COMMERCIAL",
];

export const NON_INVERTED_ROUTES = [
  "cart",
  "checkout",
  "admin/login",
  "payment",
];
