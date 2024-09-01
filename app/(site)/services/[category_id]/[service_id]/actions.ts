"use server";
import prisma from "@/lib/prisma";

export const getPackagesByService = async (serviceName: string) => {
  try {
    const packages = await prisma.package.findMany({
      where: {
        serviceName: serviceName,
      },
    });

    return packages;
  } catch (error) {
    throw new Error();
  }
};
