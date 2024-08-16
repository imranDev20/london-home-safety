"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { ReviewFormInput, reviewSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReview } from "../actions";
import { useTransition } from "react";

export default function CreateReviewForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ReviewFormInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      title: "",
      comment: "",
      userId: "clzuz9lae00011p43pq80y97m",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = form;

  const onCreateReviewFormSubmit: SubmitHandler<ReviewFormInput> = async (
    data
  ) => {
    startTransition(async () => {
      const result = await createReview(data);
      console.log(result);
    });

    try {
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onCreateReviewFormSubmit)}>
        <div>
          <label htmlFor="userId">User ID</label>
          <input id="userId" type="text" {...register("userId")} />
          {errors.userId && <span>{errors.userId.message}</span>}
        </div>

        <div>
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            type="number"
            {...register("rating", { valueAsNumber: true })}
          />
          {errors.rating && <span>{errors.rating.message}</span>}
        </div>

        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" {...register("title")} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" {...register("comment")} />
          {errors.comment && <span>{errors.comment.message}</span>}
        </div>

        <button type="submit" disabled={isPending}>
          Submit Review
        </button>
      </form>
    </div>
  );
}
