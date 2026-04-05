"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { OnboardingModal, NudgeBanner } from "@/features/onboarding";

function getOnboardingCompleted(): boolean {
  try {
    const token = getCookie("token") as string | undefined;
    if (!token) return true; // Default to completed if no token (guard handles auth)
    const decoded = jwt.decode(token) as {
      onboarding_completed?: boolean;
      user?: { onboarding_completed?: boolean };
    } | null;
    // Check both token structures
    const completed = decoded?.onboarding_completed ?? decoded?.user?.onboarding_completed ?? false;
    return Boolean(completed);
  } catch {
    return true;
  }
}

type OnboardingState = "loading" | "modal" | "nudge" | "done";

export function OnboardingWrapper() {
  const [state, setState] = useState<OnboardingState>("loading");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const completed = getOnboardingCompleted();
    if (completed) {
      setState("done");
    } else {
      setState("modal");
      setModalOpen(true);
    }
  }, []);

  if (state === "loading" || state === "done") return null;

  if (state === "modal") {
    return (
      <OnboardingModal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          // When modal closes without completing, show nudge banner
          if (!open) {
            setState("nudge");
          }
        }}
        onCompleted={() => {
          setState("done");
          setModalOpen(false);
        }}
      />
    );
  }

  if (state === "nudge") {
    return (
      <NudgeBanner
        onStartSetup={() => {
          setState("modal");
          setModalOpen(true);
        }}
      />
    );
  }

  return null;
}
