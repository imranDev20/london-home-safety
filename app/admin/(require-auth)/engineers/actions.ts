"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { unstable_cache as cache, revalidatePath } from "next/cache";

export const getEngineers = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = "",
  sortBy: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
) => {
  try {
    const skip = (page - 1) * pageSize;

    const whereClause: Prisma.UserWhereInput = {
      AND: [
        { role: "STAFF" },
        search
          ? {
              OR: [
                { email: { contains: search, mode: "insensitive" } },
                { name: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };

    // Create orderBy clause for sorting users
    const orderByClause: Prisma.UserOrderByWithRelationInput = {};
    switch (sortBy) {
      case "name":
        orderByClause.name = sortOrder;
        break;
      case "email":
        orderByClause.email = sortOrder;
        break;
      case "createdAt":
        orderByClause.createdAt = sortOrder;
        break;
      default:
        orderByClause.createdAt = "desc";
    }

    // Fetch users and the total count
    const [engineers, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        include: {
          address: true, // Include address if needed
        },
        orderBy: orderByClause,
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    return {
      users: engineers,
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching engineers:", error);
    throw new Error("Failed to fetch engineers");
  }
};

export async function deleteEngineer(engineersId: string) {
  try {
    const deletedEngineer = await prisma.user.delete({
      where: {
        id: engineersId,
      },
    });

    revalidatePath("/engineers");

    return {
      message: "Engineer deleted successfully!",
      data: deletedEngineer,
      success: true,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      message: "An error occurred while deleting the user.",
      success: false,
    };
  }
}

export const getEngineerById = async (engineerId: string) => {
  try {
    const engineer = await prisma.user.findUnique({
      where: { id: engineerId },
      include: {
        address: true,
        assignedOrders: true,
      },
    });

    if (!engineer) {
      return null;
    }

    return engineer;
  } catch (error) {
    console.error("Error fetching engineer:", error);
    throw new Error("Failed to fetch engineer");
  }
};
