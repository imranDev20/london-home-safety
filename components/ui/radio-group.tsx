"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label?: string;
    description?: string;
  }
>(({ className, label, description, ...props }, ref) => {
  return (
    <label className="relative">
      <div className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            "h-4 w-4 rounded-full border border-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary",
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator>
            <div className="h-2 w-2 rounded-full bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="font-medium text-foreground">{label}</span>
            )}
            {description && (
              <span className="text-sm text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    </label>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
