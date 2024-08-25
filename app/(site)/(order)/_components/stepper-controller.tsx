"use client";

import Stepper from "@/components/stepper";
import { usePathname } from "next/navigation";
import React from "react";

export default function StepperController() {
  const pathname = usePathname();
  const steps = ["Cart", "Details", "Payment"];

  let activeStep = 1;

  if (pathname === "/cart") {
    activeStep = 1;
  } else if (pathname === "/checkout") {
    activeStep = 2;
  } else if (pathname === "/payment") {
    activeStep = 3;
  }

  console.log(pathname);

  return (
    <>
      <Stepper steps={steps} activeStep={activeStep} />
    </>
  );
}
