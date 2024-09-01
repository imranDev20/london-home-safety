import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface StepperProps {
  activeStep: number;
  steps: Array<{ label: string; link: string; disabled?: boolean }>;
}

export default function Stepper({ activeStep, steps }: StepperProps) {
  const router = useRouter();

  const handleCircleClick = () => {
    if (activeStep > 1) {
      router.push(steps[activeStep - 2].link);
    }
  };

  return (
    <div className="py-8">
      {/* Mobile Stepper */}
      <div className="sm:hidden px-4">
        <div className="flex items-center justify-between">
          <div
            className="relative w-20 h-20 cursor-pointer"
            onClick={handleCircleClick}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E6E6E6"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`${(activeStep / steps.length) * 283}, 283`}
                className="text-primary"
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="50"
                dy="0.35em"
                textAnchor="middle"
                fill="currentColor"
                className="text-2xl font-semibold"
              >
                {activeStep} of {steps.length}
              </text>
            </svg>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-semibold text-gray-800">
              {steps[activeStep - 1].label}
            </span>
            {activeStep < steps.length ? (
              <Link
                href={steps[activeStep].link}
                className="text-sm text-primary hover:underline"
              >
                Next: {steps[activeStep].label}
              </Link>
            ) : (
              <span className="text-sm text-gray-500">Next: Finish</span>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Stepper (Unchanged) */}
      <div className="hidden sm:flex items-center justify-center">
        {/* ... (keep the desktop stepper code unchanged) ... */}
      </div>
    </div>
  );
}
