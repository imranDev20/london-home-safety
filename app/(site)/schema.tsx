import { z } from "zod";

export const reviewSchema = z.object({
  userId: z.string().cuid(),
  rating: z.number().int().min(1).max(5).default(5),
  title: z.string().max(100),
  comment: z.string().optional(),
});

export type ReviewFormInput = z.infer<typeof reviewSchema>;
