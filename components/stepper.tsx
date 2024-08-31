import React from "react";
import Link from "next/link";

interface StepperProps {
  activeStep: number;
  steps: Array<{ label: string; link: string; disabled?: boolean }>;
}

export default function Stepper({ activeStep, steps }: StepperProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex w-full max-w-3xl items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index + 1 === activeStep;
          const isCompleted = index + 1 < activeStep;
          const isLastStep = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              {step.disabled ? (
                <div className="flex flex-col items-center opacity-50 cursor-not-allowed">
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-muted-foreground`}
                  >
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <span className="mt-2 text-sm font-medium">{step.label}</span>
                </div>
              ) : (
                <Link href={step.link} className="flex flex-col items-center">
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      isCompleted
                        ? "bg-primary text-white"
                        : isActive
                        ? "bg-primary text-white"
                        : "bg-primary/20 text-muted-foreground"
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
                  <span className="mt-2 text-sm font-medium">{step.label}</span>
                </Link>
              )}
              {!isLastStep && (
                <div
                  className={`h-1 flex-1 ${
                    isCompleted ? "bg-primary" : "bg-primary/20 rounded-full"
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
