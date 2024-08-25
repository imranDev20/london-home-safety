import Stepper from "@/components/stepper";
import React from "react";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-section-background">
      <Stepper />
      {children}
    </div>
  );
}
