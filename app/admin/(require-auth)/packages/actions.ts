"use server";

import prisma from "@/lib/prisma";
import { PackageType, Prisma } from "@prisma/client";
import { revalidatePath, unstable_cache as cache } from "next/cache";
import { PackageFormInputType } from "./schema";
import { handlePrismaError } from "@/lib/prisma-error";

export const getPackages = cache(
  async (
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
                  { serviceName: { contains: search, mode: "insensitive" } },
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
  }
);

export async function deletePackage(serviceId: string) {
  try {
    const deletedService = await prisma.package.delete({
      where: {
        id: serviceId,
      },
    });

    revalidatePath("/", "layout");

    return {
      message: "Package deleted successfully!",
      data: deletedService,
      success: true,
    };
  } catch (error) {
    console.error("Error deleting service:", error);
    return handlePrismaError(error);
  }
}

export async function createPackage(data: PackageFormInputType) {
  try {
    // Create the service with the associated packages
    const createdPackage = await prisma.package.create({
      data: {
        name: data.name,
        type: data.type,
        description: data.description,
        isAdditionalPackage: data.isAdditionalPackage,
        price:
          typeof data.price === "number" ? data.price : parseFloat(data.price),
        extraUnitPrice:
          typeof data.extraUnitPrice === "number"
            ? data.extraUnitPrice
            : data.extraUnitPrice
            ? parseFloat(data.extraUnitPrice)
            : null,
        minQuantity:
          typeof data.minQuantity === "number"
            ? data.minQuantity
            : data.minQuantity
            ? parseInt(data.minQuantity)
            : null,
        serviceName: data.serviceName,
        category: data.category,
        propertyType: data.propertyType,
        unitType: data.unitType,
      },
    });

    revalidatePath("/", "layout");

    return {
      message: "Package created successfully!",
      data: createdPackage,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return handlePrismaError(error);
  }
}

export async function updatePackage(
  packageId: string,
  data: Partial<PackageFormInputType>
) {
  try {
    const updatedPackage = await prisma.package.update({
      where: {
        id: packageId,
      },
      data: {
        name: data.name ?? undefined,
        description: data.description ?? undefined,
        isAdditionalPackage: data.isAdditionalPackage,
        type: data.type ?? undefined,
        priceType: data.priceType ?? undefined,
        price:
          data.price !== undefined
            ? typeof data.price === "number"
              ? data.price
              : parseFloat(data.price)
            : undefined,
        extraUnitPrice:
          typeof data.extraUnitPrice === "number"
            ? data.extraUnitPrice
            : data.extraUnitPrice
            ? parseFloat(data.extraUnitPrice)
            : null,
        minQuantity:
          typeof data.minQuantity === "number"
            ? data.minQuantity
            : data.minQuantity
            ? parseInt(data.minQuantity)
            : null,
        serviceName: data.serviceName ?? undefined,
        category: data.category ?? undefined,
        propertyType: data.propertyType ?? undefined,
        unitType: data.unitType ?? undefined,
      },
    });

    // Revalidate paths if needed

    revalidatePath("/", "layout");

    return {
      message: "Package updated successfully!",
      data: updatedPackage,
      success: true,
    };
  } catch (error) {
    console.error("Error updating package:", error);
    return handlePrismaError(error);
  }
}

export const getPackageById = cache(async (packageId: string) => {
  try {
    const packageData = await prisma.package.findUnique({
      where: {
        id: packageId,
      },
    });

    if (!packageData) {
      return {
        message: "Package not found",
        success: false,
        data: null,
      };
    }

    return {
      message: "Package fetched successfully!",
      data: packageData,
      success: true,
    };
  } catch (error) {
    console.error("Error fetching package by ID:", error);
    return {
      message: "An error occurred while fetching the package.",
      success: false,
      data: null,
    };
  }
});
