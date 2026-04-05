"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "../hooks/useOnboarding";
import { StepProgress } from "./StepProgress";
import { StepCareerGoal } from "./StepCareerGoal";
import { StepTargetRole } from "./StepTargetRole";
import { StepResumeUpload } from "./StepResumeUpload";
import { StepScore } from "./StepScore";
import type { CareerGoal } from "../types/onboarding";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleted: () => void;
}

const STEP_TITLES = ["Let's get started", "Target role", "Upload resume", "Your score"] as const;

export function OnboardingModal({ open, onOpenChange, onCompleted }: OnboardingModalProps) {
  const {
    step,
    formData,
    roles,
    rolesLoading,
    setCareerGoal,
    setTargetRole,
    setResumeResult,
    advance,
    back,
    skip,
    complete,
  } = useOnboarding();

  const handleSkip = async () => {
    await skip();
    onOpenChange(false);
  };

  const handleComplete = async () => {
    await complete();
    onCompleted();
    onOpenChange(false);
  };

  // Determine whether the Next button is available on each step
  const canAdvance = (() => {
    if (step === 1) return formData.targetRole !== null;
    return false;
  })();

  const showNav = step === 1 || step === 2;
  const showSkip = step < 3;
  const showBack = step > 0 && step < 3;

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        // Prevent closing by clicking outside — only allow programmatic close
        if (!val) return;
        onOpenChange(val);
      }}
    >
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{STEP_TITLES[step]}</DialogTitle>
        </DialogHeader>

        <StepProgress currentStep={step} />

        <div className="min-h-[260px]">
          {step === 0 && (
            <StepCareerGoal
              selected={formData.careerGoal}
              onSelect={(goal: CareerGoal) => setCareerGoal(goal)}
            />
          )}

          {step === 1 && (
            <StepTargetRole
              roles={roles}
              loading={rolesLoading}
              selected={formData.targetRole}
              onSelect={setTargetRole}
            />
          )}

          {step === 2 && <StepResumeUpload onComplete={(result) => setResumeResult(result)} />}

          {step === 3 && (
            <StepScore
              score={formData.score ?? 0}
              suggestions={formData.suggestions}
              onComplete={handleComplete}
            />
          )}
        </div>

        {/* Footer nav — only shown for steps that need manual navigation */}
        {showNav && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              {showBack && (
                <Button variant="ghost" size="sm" onClick={back}>
                  Back
                </Button>
              )}
              {showSkip && (
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  Skip
                </Button>
              )}
            </div>

            {step === 1 && (
              <Button size="sm" onClick={advance} disabled={!canAdvance}>
                Next
              </Button>
            )}
          </div>
        )}

        {/* Skip-only footer for step 0 (auto-advances on select) and step 2 (auto-advances on upload) */}
        {!showNav && step < 3 && (
          <div className="flex justify-start pt-2">
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
