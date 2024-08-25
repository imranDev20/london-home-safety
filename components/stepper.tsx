import React from "react";

interface StepperProps {
  activeStep: number;
  steps: string[]; // Array of step labels
}

export default function Stepper({ activeStep, steps }: StepperProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex w-full max-w-3xl items-center justify-between">
        {steps.map((stepLabel, index) => {
          const isActive = index + 1 === activeStep;
          const isCompleted = index + 1 < activeStep;
          const isLastStep = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className="mt-2 text-sm font-medium">{stepLabel}</span>
              </div>
              {!isLastStep && (
                <div
                  className={`h-1 flex-1 ${
                    isCompleted ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
