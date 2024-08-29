"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SiteSettingsFormValues, siteSettingsSchema } from "./schema";

export const getSettings = async () => {
  try {
    const settings = await prisma.siteSettings.findFirst({
      include: {
        user: {
          include: {
            address: true,
          },
        },
        openingDateTime: true,
      },
    });
    return settings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    throw new Error("Failed to fetch site settings");
  }
};

export async function updateSiteSettings(input: SiteSettingsFormValues) {
  try {
    const validatedData = siteSettingsSchema.parse(input);

    const existingSettings = await prisma.siteSettings.findFirst({
      include: { user: { include: { address: true } } },
    });

    if (!existingSettings) {
      throw new Error("No existing site settings found");
    }

    const updatedSettings = await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: {
        email: validatedData.email,
        phone1: validatedData.phone1,
        phone2: validatedData.phone2,
        whatsapp: validatedData.whatsapp,
        websiteUrl: validatedData.websiteUrl,
        facebookUrl: validatedData.facebookUrl,
        twitterUrl: validatedData.twitterUrl,
        instagramUrl: validatedData.instagramUrl,
        openingDateTime: {
          deleteMany: {},
          create: validatedData.openingDateTime.map(
            ({ dayOfWeek, openingTime, closingTime }) => ({
              dayOfWeek,
              openingTime,
              closingTime,
            })
          ),
        },
        user: {
          update: {
            address: {
              upsert: {
                create: {
                  street: validatedData.address.street,
                  city: validatedData.address.city,
                  postcode: validatedData.address.postcode,
                },
                update: {
                  street: validatedData.address.street,
                  city: validatedData.address.city,
                  postcode: validatedData.address.postcode,
                },
              },
            },
          },
        },
      },
      include: {
        openingDateTime: true,
        user: { include: { address: true } },
      },
    });

    revalidatePath("/admin/settings");
    return {
      success: true,
      data: updatedSettings,
      message: "Site settings updated successfully",
    };
  } catch (error) {
    console.error("Failed to update site settings:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update site settings",
    };
  }
}
