"use server";

import prisma from "@/lib/prisma";
import { unstable_cache as cache } from "next/cache";

export const getOrders = async (page: number = 1, pageSize: number = 10) => {
  try {
    const skip = (page - 1) * pageSize;

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: pageSize,
        include: {
          user: {
            include: {
              address: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc", // You can change this to sort by any field
        },
      }),
      prisma.order.count(), // Get total count for pagination info
    ]);

    return {
      orders,
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

export const getOrdersById = async (orderId: string) => {
  try {
    if (!orderId) {
      console.error("No product ID available");
      return null;
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: {
          include: {
            address: true,
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};
