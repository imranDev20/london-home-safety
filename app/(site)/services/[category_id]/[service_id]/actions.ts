"use server";

import prisma from "@/lib/prisma";
import { PropertyType, Package } from "@prisma/client";

export async function getPackagesByService(
  serviceName: string,
  propertyType?: PropertyType
): Promise<Package[]> {
  try {
    const effectivePropertyType = propertyType || "RESIDENTIAL";

    const packages = await prisma.package.findMany({
      where: {
        serviceName: serviceName,
        propertyType: effectivePropertyType,
      },
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
