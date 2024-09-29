"use server";

import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prisma-error";
import {
  OrderStatus,
  Package,
  PaymentStatus,
  PropertyType,
} from "@prisma/client";
import { revalidatePath, unstable_cache as cache } from "next/cache";

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

interface UpdateOrderParams {
  orderId: string;
  assignedEngineerId?: string;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
}

export async function updateOrder({
  orderId,
  assignedEngineerId,
  orderStatus,
  paymentStatus,
}: UpdateOrderParams) {
  try {
    const currentOrder = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        assignedEngineerId: true,
        status: true,
        paymentStatus: true,
      },
    });

    if (!currentOrder) {
      return {
        message: "Order not found",
        success: false,
      };
    }

    const updateData: any = {};
    let hasChanges = false;

    if (
      assignedEngineerId !== undefined &&
      assignedEngineerId !== currentOrder.assignedEngineerId
    ) {
      updateData.assignedEngineerId = assignedEngineerId;
      hasChanges = true;
    }

    if (orderStatus !== undefined && orderStatus !== currentOrder.status) {
      updateData.status = orderStatus;
      hasChanges = true;
    }

    if (
      paymentStatus !== undefined &&
      paymentStatus !== currentOrder.paymentStatus
    ) {
      updateData.paymentStatus = paymentStatus;
      hasChanges = true;
    }

    if (!hasChanges) {
      return {
        message: "No changes detected. Order update skipped.",
        success: false,
      };
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    revalidatePath("/admin", "layout");

    return {
      message: "Order updated successfully!",
      data: updatedOrder,
      success: true,
    };
  } catch (error) {
    console.error("Error updating order:", error);
    return handlePrismaError(error);
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
    // await new Promise((resolve) => setTimeout(resolve, 5000));

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
