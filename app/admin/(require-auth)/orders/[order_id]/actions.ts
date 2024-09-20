"use server";

import prisma from "@/lib/prisma";
import {
  OrderStatus,
  Package,
  PaymentStatus,
  PropertyType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getEngineersForOrder = cache(async () => {
  try {
    const engineers = await prisma.user.findMany({
      where: {
        role: "STAFF",
      },
      orderBy: { name: "asc" },
      include: {
        address: true,
      },
    });
    return engineers;
  } catch (error) {
    console.error("Error fetching engineers:", error);
    throw new Error("Failed to fetch engineers");
  }
});

export async function updateOrder(orderId: string, assignedEngineerId: string) {
  try {
    const currentOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        assignedEngineerId: true,
      },
    });

    if (currentOrder?.assignedEngineerId === assignedEngineerId) {
      return {
        message: "No changes detected. Order update skipped.",
        success: false,
      };
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        assignedEngineerId: assignedEngineerId,
      },
    });

    revalidatePath(`/admin/orders`);
    revalidatePath(`/admin/orders/${updatedOrder.id}`);

    return {
      message: "Order updated successfully!",
      data: updatedOrder,
      success: true,
    };
  } catch (error) {
    console.error("Error updating order:", error);
    return {
      message:
        "An error occurred while updating the order. Please try again later.",
      success: false,
    };
  }
}

export async function updateOrderStatus(orderId: string, orderStatus: string) {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: orderStatus as OrderStatus,
      },
    });

    revalidatePath(`/admin/orders`);
    revalidatePath(`/admin/orders/${updatedOrder.id}`);

    return {
      message: "Order status updated successfully!",
      data: updatedOrder,
      success: true,
    };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      message:
        "An error occurred while updating the order status. Please try again later.",
      success: false,
    };
  }
}
export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: string
) {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        paymentStatus: paymentStatus as PaymentStatus,
      },
    });

    revalidatePath(`/admin/orders`);
    revalidatePath(`/admin/orders/${updatedOrder.id}`);

    return {
      message: "Order payment status updated successfully!",
      data: updatedOrder,
      success: true,
    };
  } catch (error) {
    console.error("Error updating order payment status:", error);
    return {
      message:
        "An error occurred while updating the order payment status. Please try again later.",
      success: false,
    };
  }
}

export const getCustomers = cache(async () => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "CUSTOMER" },
      include: {
        address: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
});

export const getEngineers = cache(async () => {
  try {
    const engineers = await prisma.user.findMany({
      where: { role: "STAFF" },
      orderBy: { name: "asc" },
      include: {
        address: true,
      },
    });
    return engineers;
  } catch (error) {
    console.error("Error fetching engineer:", error);
    throw new Error("Failed to fetch engineer");
  }
});

export const getPackages = cache(async (propertyType?: PropertyType) => {
  try {
    const packages = await prisma.package.findMany({
      where: {
        propertyType,
      },
      orderBy: {
        price: "asc",
      },
    });

    return packages;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
});

export const getPackageById = cache(
  async (packageId: string): Promise<Package[]> => {
    try {
      const packages = await prisma.package.findUnique({
        where: {
          id: packageId,
        },
      });

      if (!packages) {
        return []; // Return an empty array if no package is found
      }

      return [packages]; // Return an array with the single package
    } catch (error) {
      console.error("Error fetching package:", error);
      throw new Error("Failed to fetch package");
    }
  }
);
