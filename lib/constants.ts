import { OrderStatus } from "@prisma/client";

export const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "CANCELLED",
  "COMPLETED",
  "IN_PROGRESS",
  "PENDING",
  "CONFIRMED",
];
