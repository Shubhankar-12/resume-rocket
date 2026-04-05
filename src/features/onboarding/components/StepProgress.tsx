"use client";

import { cn } from "@/lib/utils";
import { ONBOARDING_STEPS } from "../types/onboarding";

interface StepProgressProps {
  currentStep: number;
}

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex items-start justify-center gap-4 sm:gap-8 mb-6">
      {ONBOARDING_STEPS.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={label} className="flex flex-col items-center gap-1.5 min-w-0">
            <div
              className={cn(
                "h-3 w-3 rounded-full transition-colors",
                isCompleted || isActive
                  ? "bg-primary"
                  : "border border-muted-foreground bg-transparent"
              )}
            />
            <span
              className={cn(
                "text-xs text-center leading-tight max-w-[60px] truncate sm:max-w-none sm:truncate-none",
                isActive
                  ? "text-foreground font-medium"
                  : isCompleted
                    ? "text-primary"
                    : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
