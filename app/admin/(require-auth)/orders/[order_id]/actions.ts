"use server";

import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prisma-error";
import {
  OrderStatus,
  PaymentStatus,
  PropertyType,
  Package, // Correct import from @prisma/client
} from "@prisma/client"; // Import the correct types directly from @prisma/client
import { revalidatePath, unstable_cache as cache } from "next/cache";

// Fetch engineers for a specific order
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

// Interface to define the expected parameters for updating orders
interface UpdateOrderParams {
  orderId: string;
  assignedEngineerId?: string;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
}

// Update order function
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
        timeSlotId: true,
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

    let updatedOrder;

    if (orderStatus === "CANCELLED") {
      updatedOrder = await prisma.$transaction(async (tx) => {
        const order = await tx.order.update({
          where: { id: orderId },
          data: updateData,
        });

        await tx.timeSlot.update({
          where: { id: currentOrder.timeSlotId },
          data: {
            currentBookings: { decrement: 1 },
            isAvailable: true,
          },
        });

        return order;
      });
    } else {
      updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: updateData,
      });
    }

    revalidatePath("/", "layout");

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

// Fetch customers
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

// Fetch engineers
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
    console.error("Error fetching engineers:", error);
    throw new Error("Failed to fetch engineers");
  }
});

// Fetch packages for a given property type
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
    console.error("Error fetching packages:", error);
    throw new Error("Failed to fetch packages");
  }
});

// Fetch package by ID
export const getPackageById = cache(
  async (packageId: string): Promise<Package[]> => {
    // Correct return type
    try {
      const packageData = await prisma.package.findUnique({
        where: {
          id: packageId,
        },
      });

      if (!packageData) {
        return []; // Return an empty array if no package is found
      }

      return [packageData]; // Return an array with the single package
    } catch (error) {
      console.error("Error fetching package:", error);
      throw new Error("Failed to fetch package");
    }
  }
);

export async function updatePackagePrice(packageId: string, price: number) {
  try {
    const updatedPackage = await prisma.package.update({
      where: { id: packageId },
      data: { price },
    });
    return {
      message: "Package price updated successfully!",
      data: updatedPackage,
      success: true,
    };
  } catch (error) {
    console.error("Error updating package price:", error);
    return handlePrismaError(error);
  }
}
