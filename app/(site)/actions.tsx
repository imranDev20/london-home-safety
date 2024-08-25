"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { reviewSchema } from "./schema";
import { z } from "zod";

export const getReviews = async () => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // Limit to 10 most recent reviews, adjust as needed
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

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

    revalidatePath("/reviews");

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
