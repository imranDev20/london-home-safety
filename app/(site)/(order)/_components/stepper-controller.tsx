"use client";

import Stepper from "@/components/stepper";
import { usePathname } from "next/navigation";
import React from "react";
import useOrderStore from "@/hooks/use-order-store";

export default function StepperController() {
  const pathname = usePathname();
  const { cartItems, customerDetails } = useOrderStore();

  let activeStep = 1;

  if (pathname === "/cart") {
    activeStep = 1;
  } else if (pathname === "/checkout") {
    activeStep = 2;
  } else if (pathname === "/payment") {
    activeStep = 3;
  }

  const isCheckoutDisabled = cartItems.length === 0;
  const isPaymentDisabled =
    cartItems.length === 0 || !customerDetails.customerName;

  return (
    <>
      <Stepper
        steps={[
          { label: "Cart", link: "/cart" },
          {
            label: "Checkout",
            link: "/checkout",
            disabled: isCheckoutDisabled,
          },
          { label: "Payment", link: "/payment", disabled: isPaymentDisabled },
        ]}
        activeStep={activeStep}
      />
    </>
  );
}
