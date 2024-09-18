"use server";

import prisma from "@/lib/prisma";
import { Package, PropertyType } from "@prisma/client";

export async function getPackagesByService(
  serviceName: string,
  propertyType?: PropertyType | "ALL"
): Promise<Package[]> {
  try {
    let whereClause: any = {
      serviceName: serviceName,
    };

    if (propertyType && propertyType !== "ALL") {
      whereClause.propertyType = propertyType;
    }

    const packages = await prisma.package.findMany({
      where: whereClause,
      orderBy: {
        price: "asc",
      },
    });

    return packages;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw new Error("Failed to fetch packages. Please try again later.");
  }
}
