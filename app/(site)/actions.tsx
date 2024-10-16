"use server";

import { contactAdminNotificationEmailHtml } from "@/lib/contact-admin-email";
import {
  contactCustomerNotificationEmailHtml,
  customerEmailSubject,
} from "@/lib/contact-customer-email";
import prisma from "@/lib/prisma";
import { EMAIL_ADDRESS } from "@/shared/data";
import { UserEmailDataType } from "@/types/misc";
import { revalidatePath, unstable_cache as cache } from "next/cache";
import { reviewSchema } from "./schema";
import { handlePrismaError } from "@/lib/prisma-error";

export const getReviews = cache(async () => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
});

export async function createReview(data: unknown) {
  try {
    const { rating, subject, description, name } = reviewSchema.parse(data);

    const newReview = await prisma.review.create({
      data: {
        rating,
        title: subject,
        comment: description,
        userName: name,
      },
    });

    revalidatePath("/");

    return {
      message: "Review created successfully!",
      data: newReview,
      success: true,
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return handlePrismaError(error);
  }
}

export async function sendEmailToAdminAndCustomerAction(
  emailData: UserEmailDataType
) {
  try {
    const { name, email, subject, message, phone } = emailData;
    const adminEmailSubject = `${name} wants to contact you`;

    return {
      message: "Email sent successfully!",
      success: true,
    };
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return handlePrismaError(error);
  }
}
