"use server";
import exceljs  from 'exceljs';

import prisma from "@/lib/prisma";
import { ServiceType, Prisma, PropertyType } from "@prisma/client";
import { unstable_cache as cache, revalidatePath } from "next/cache";
import dayjs from 'dayjs';

export const getServices = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = "",
  filterType: ServiceType | "" = ""
) => {
  try {
    const skip = (page - 1) * pageSize;

    // Build the where clause for filtering by type and search
    const whereClause: Prisma.ServiceWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
                { unitType: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        filterType ? { type: filterType } : {},
      ],
    };

    // Fetch the services and the total count
    const [services, totalCount] = await Promise.all([
      prisma.service.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        include: {
          order: true,
        },
      }),
      prisma.service.count({ where: whereClause }),
    ]);
  

    return {
      services,      
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
};

export async function deleteService(serviceId: string) {
  try {
    const deletedService = await prisma.service.delete({
      where: {
        id: serviceId,
      },
    });

    revalidatePath("/services");

    return {
      message: "Service deleted successfully!",
      data: deletedService,
      success: true,
    };
  } catch (error) {
    console.error("Error deleting service:", error);
    return {
      message: "An error occurred while deleting the service.",
      success: false,
    };
  }
}
