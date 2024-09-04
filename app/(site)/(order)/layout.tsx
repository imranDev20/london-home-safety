import { Suspense } from "react";
import StepperController from "./_components/stepper-controller";
import StepperLoader from "./_components/stepper-loader";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-section-background">
      <Suspense fallback={<StepperLoader />}>
        <StepperController />
      </Suspense>

      {children}
    </div>
  );
}
