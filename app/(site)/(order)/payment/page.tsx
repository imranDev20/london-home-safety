import React, { Suspense } from "react";
import PaymentCompo from "./_components/payment-compo";

export default function PaymentPage({
  searchParams: { redirect_status },
}: {
  searchParams: {
    redirect_status?: string;
  };
}) {
  return <PaymentCompo redirectStatus={redirect_status} />;
}
