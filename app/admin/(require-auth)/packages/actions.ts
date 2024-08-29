"use server";

import prisma from "@/lib/prisma";
import { PackageType, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { PackageFormInputType } from "./schema";

export const getServices = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = "",
  filterType: PackageType | "" = ""
) => {
  try {
    const skip = (page - 1) * pageSize;

    // Build the where clause for filtering by type and search
    const whereClause: Prisma.PackageWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { unitType: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        filterType ? { type: filterType } : {},
      ],
    };

    // Fetch the services and the total count
    const [services, totalCount] = await Promise.all([
      prisma.package.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        include: {
          order: true,
        },
      }),
      prisma.package.count({ where: whereClause }),
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
    const deletedService = await prisma.package.delete({
      where: {
        id: serviceId,
      },
    });

    revalidatePath("/packages");

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

export async function createPackage(data: PackageFormInputType) {
  try {
    // Create the service with the associated packages
    const createdPackage = await prisma.package.create({
      data: {
        name: data.name,
        type: data.type,
        price:
          typeof data.price === "number" ? data.price : parseFloat(data.price),

        serviceName: data.serviceName,
        category: data.category,
        propertyType: data.propertyType,
        residentialType:
          data.propertyType === "RESIDENTIAL" ? data.residentialType : null,
        commercialType:
          data.propertyType === "COMMERCIAL" ? data.commercialType : null,
        unitType: data.unitType,
      },
    });

    // Revalidate paths if needed
    revalidatePath("/admin/packages");
    revalidatePath("/admin/packages/new");
    revalidatePath("/book-now");
    revalidatePath("/");

    return {
      message: "Package created successfully!",
      data: createdPackage,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while creating the service.",
      success: false,
    };
  }
}
