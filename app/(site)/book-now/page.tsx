import React, { Suspense } from "react";
import BookNowCompo from "./_components/book-now-compo";

export default function BookNowPage() {
  return (
    <Suspense fallback="Loading...">
      <BookNowCompo />
    </Suspense>
  );
}
