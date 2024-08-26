import React, { Suspense } from "react";
import BookNowCompo from "./_components/book-now-compo";
import { PropertyType } from "@prisma/client";

export default function BookNowPage({
  searchParams,
}: {
  searchParams: {
    property_type: PropertyType;
  };
}) {
  const { property_type } = searchParams;

  return (
    <>
      <BookNowCompo propertyType={property_type} />
    </>
  );
}
