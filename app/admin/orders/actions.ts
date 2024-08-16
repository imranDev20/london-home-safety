import prisma from "@/lib/prisma";
import { unstable_cache as cache } from "next/cache";

export const getOrders = cache(async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        _count: true,
        user: true,
      },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
});
