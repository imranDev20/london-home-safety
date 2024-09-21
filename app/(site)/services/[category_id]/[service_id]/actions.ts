"use server";

import prisma from "@/lib/prisma";
import { Package } from "@prisma/client";

export async function getPackagesByService(
  serviceName: string
): Promise<Package[]> {
  try {
    const packages = await prisma.package.findMany({
      where: {
        serviceName: serviceName,
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
