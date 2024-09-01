"use server";

import { contactAdminNotificationEmailHtml } from "@/lib/contact-admin-email";
import {
  contactCustomerNotificationEmailHtml,
  customerEmailSubject,
} from "@/lib/contact-customer-email";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { EMAIL_ADDRESS } from "@/shared/data";
import { UserEmailDataType } from "@/types/misc";
import { revalidatePath, unstable_cache as cache } from "next/cache";
import { z } from "zod";
import { reviewSchema } from "./schema";

export const getReviews = cache(async () => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
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
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      throw new Error("Invalid review data");
    }

    // Handle Prisma errors
    if (error instanceof Error) {
      console.error("Database error:", error.message);
      throw new Error("Failed to create review");
    }

    // Handle other errors
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred");
  }
}

export async function sendEmailToAdminAndCustomerAction(
  emailData: UserEmailDataType
) {
  try {
    const { name, email, subject, message, phone } = emailData;
    const adminEmailSubject = `${name} wants to contact you`;
    await sendEmail({
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: EMAIL_ADDRESS,
      subject: adminEmailSubject,
      html: contactAdminNotificationEmailHtml(
        name,
        email,
        subject,
        message,
        phone
      ),
    });

    // Send email to customer
    await sendEmail({
      fromName: "London Home Safety",
      fromEmail: EMAIL_ADDRESS,
      to: email,
      subject: customerEmailSubject,
      html: contactCustomerNotificationEmailHtml(name, subject, message),
    });
    // Revalidate the necessary paths if applicable (example paths)
    revalidatePath(`/contact`);

    return {
      message: "Email sent successfully!",
      success: true,
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      message:
        "An error occurred while sending the email. Please try again later.",
      success: false,
    };
  }
}
