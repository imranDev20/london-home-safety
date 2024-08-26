"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SiteSettingsFormValues, siteSettingsSchema } from "./schema";

export const getSettings = async () => {
  try {
    const settings = await prisma.siteSettings.findFirst({
      include: {
        address: true,
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

    const updatedSettings = await prisma.siteSettings.upsert({
      where: {
        // Assuming there's only one SiteSettings record
        id: await prisma.siteSettings
          .findFirst()
          .then((settings) => settings?.id),
      },

      update: {
        email: validatedData.email,
        phone1: validatedData.phone1,
        phone2: validatedData.phone2,
        whatsapp: validatedData.whatsapp,
        websiteUrl: validatedData.websiteUrl,
        facebookUrl: validatedData.facebookUrl,
        twitterUrl: validatedData.twitterUrl,
        instagramUrl: validatedData.instagramUrl,
        address: {
          upsert: {
            create: validatedData.address,
            update: validatedData.address,
          },
        },
      },
      create: {
        email: validatedData.email,
        phone1: validatedData.phone1,
        phone2: validatedData.phone2,
        whatsapp: validatedData.whatsapp,
        websiteUrl: validatedData.websiteUrl,
        facebookUrl: validatedData.facebookUrl,
        twitterUrl: validatedData.twitterUrl,
        instagramUrl: validatedData.instagramUrl,
        address: {
          create: validatedData.address,
        },
      },
    });

    revalidatePath("/admin/site-settings");
    return {
      success: true,
      data: updatedSettings,
      message: "Site settings updated successfully",
    };
  } catch (error) {
    console.error("Failed to update site settings:", error);
    return {
      success: false,
      message: "Failed to update site settings",
    };
  }
}
