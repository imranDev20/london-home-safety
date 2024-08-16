import { getReviews } from "../actions";
import CreateReviewForm from "./create-review-form";

export default async function Reviews() {
  const reviews = await getReviews();

  return (
    <>
      {reviews.map((review) => (
        <div key={review.id}>{review.title}</div>
      ))}

      <CreateReviewForm />
    </>
  );
}
