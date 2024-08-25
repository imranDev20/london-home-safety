import Stepper from "@/components/stepper";
import React from "react";
import StepperController from "./_components/stepper-controller";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-section-background">
      <StepperController />
      {children}
    </div>
  );
}
