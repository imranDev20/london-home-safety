import React from "react";
import BookNowCompo from "./_components/book-now-compo";
import { PropertyType } from "@prisma/client";
import { getPackages } from "@/app/admin/(require-auth)/orders/[order_id]/actions";

export default async function BookNowPage({
  searchParams,
}: {
  searchParams: {
    property_type: PropertyType;
  };
}) {
  const { property_type } = searchParams;
  const packages = await getPackages(property_type || "RESIDENTIAL");

  return (
    <>
      <BookNowCompo propertyType={property_type} packages={packages} />
    </>
  );
}
