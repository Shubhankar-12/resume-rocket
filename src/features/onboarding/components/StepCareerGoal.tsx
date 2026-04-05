"use client";

import { Briefcase, ArrowRightLeft, GraduationCap, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";
import { CAREER_GOALS } from "../types/onboarding";
import type { CareerGoal } from "../types/onboarding";

const ICON_MAP = {
  Briefcase,
  ArrowRightLeft,
  GraduationCap,
  Laptop,
} as const;

const DESCRIPTIONS: Record<CareerGoal, string> = {
  NEW_JOB: "Find your next role",
  CAREER_CHANGE: "Transition to a new field",
  FIRST_JOB: "Start your career journey",
  FREELANCING: "Work on your own terms",
};

interface StepCareerGoalProps {
  selected: CareerGoal | null;
  onSelect: (goal: CareerGoal) => void;
}

export function StepCareerGoal({ selected, onSelect }: StepCareerGoalProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">What&apos;s your career goal?</h2>
        <p className="text-sm text-muted-foreground">This helps us personalise your experience.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {CAREER_GOALS.map((goal) => {
          const Icon = ICON_MAP[goal.icon as keyof typeof ICON_MAP];
          const isSelected = selected === goal.value;

          return (
            <button
              key={goal.value}
              type="button"
              onClick={() => onSelect(goal.value as CareerGoal)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all hover:border-primary/60 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-ring",
                isSelected
                  ? "ring-2 ring-primary border-primary bg-primary/5"
                  : "border-border bg-card"
              )}
            >
              <Icon
                className={cn("h-6 w-6", isSelected ? "text-primary" : "text-muted-foreground")}
              />
              <div className="space-y-0.5">
                <p
                  className={cn(
                    "text-sm font-medium leading-tight",
                    isSelected ? "text-foreground" : "text-foreground/80"
                  )}
                >
                  {goal.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {DESCRIPTIONS[goal.value as CareerGoal]}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
