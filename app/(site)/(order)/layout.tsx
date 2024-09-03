import { Suspense } from "react";
import StepperController from "./_components/stepper-controller";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-section-background">
      <Suspense fallback="Loading...">
        <StepperController />
      </Suspense>

      {children}
    </div>
  );
}
