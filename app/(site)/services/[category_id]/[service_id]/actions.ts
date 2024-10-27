"use server";

import prisma from "@/lib/prisma";
import { unstable_cache as cache } from "next/cache";

export const getPackagesByService = cache(async (serviceName: string) => {
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
});
