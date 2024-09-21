"use client";

import Stepper from "@/components/stepper";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import useOrderStore from "@/hooks/use-order-store";

export default function StepperController() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cartItems, customerDetails } = useOrderStore();

  let activeStep = 1;
  let paymentCompleted = false;

  if (pathname === "/cart") {
    activeStep = 1;
  } else if (pathname === "/checkout") {
    activeStep = 2;
  } else if (pathname === "/payment") {
    activeStep = 3;
  }

  // Check for redirect_status in search params
  const redirectStatus = searchParams.get("redirect_status");
  if (redirectStatus) {
    activeStep = 3;
    paymentCompleted = true;
  }

  const isCheckoutDisabled = cartItems.length === 0;
  const isPaymentDisabled =
    cartItems.length === 0 || !customerDetails.firstName;

  return (
    <Stepper
      steps={[
        { label: "Cart", link: "/cart", disabled: false },
        {
          label: "Checkout",
          link: "/checkout",
          disabled: isCheckoutDisabled,
        },
        {
          label: "Payment",
          link: "/payment",
          disabled: isPaymentDisabled,
        },
      ]}
      activeStep={activeStep}
      paymentCompleted={paymentCompleted}
    />
  );
}
