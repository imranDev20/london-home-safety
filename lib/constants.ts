import { OrderStatus, ServiceType } from "@prisma/client";

export const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "CANCELLED",
  "COMPLETED",
  "IN_PROGRESS",
  "PENDING",
  "CONFIRMED",
];

export const SERVICE_TYPE_OPTIONS: ServiceType[] = [
  "CERTIFICATE",
  "REPAIR",
  "INSTALLATION",
  "INSPECTION",
  "OTHER",
];
