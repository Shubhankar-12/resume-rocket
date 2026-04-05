"use client";

import { useState, useEffect, useCallback } from "react";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { OnboardingAPI } from "../api/onboardingAPI";
import type { CareerGoal, OnboardingFormData } from "../types/onboarding";

function getUserIdFromToken(): string | null {
  try {
    const token = getCookie("token") as string | undefined;
    if (!token) return null;
    const decoded = jwt.decode(token) as {
      user_id?: string;
      id?: string;
      user?: { id?: string };
    } | null;
    return decoded?.user_id ?? decoded?.id ?? decoded?.user?.id ?? null;
  } catch {
    return null;
  }
}

export interface UseOnboardingResult {
  step: number;
  formData: OnboardingFormData;
  roles: string[];
  rolesLoading: boolean;
  setCareerGoal: (goal: CareerGoal) => void;
  setTargetRole: (role: string) => void;
  setResumeResult: (result: {
    resumeId: string;
    score: number;
    suggestions: { title: string; description: string }[];
  }) => void;
  advance: () => void;
  back: () => void;
  skip: () => Promise<void>;
  complete: () => Promise<void>;
}

const INITIAL_FORM_DATA: OnboardingFormData = {
  careerGoal: null,
  targetRole: null,
  resumeId: null,
  score: null,
  suggestions: [],
};

export function useOnboarding(): UseOnboardingResult {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_FORM_DATA);
  const [roles, setRoles] = useState<string[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);

  // Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setRolesLoading(true);
        const response = await OnboardingAPI.getRoles();
        const body = response?.data?.body;
        if (Array.isArray(body)) {
          setRoles(body);
        } else if (Array.isArray(body?.roles)) {
          setRoles(body.roles);
        }
      } catch {
        // Non-critical — continue with empty roles list
      } finally {
        setRolesLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const setCareerGoal = useCallback((goal: CareerGoal) => {
    setFormData((prev) => ({ ...prev, careerGoal: goal }));
    // Auto-advance to step 1 (Target Role)
    setStep(1);
  }, []);

  const setTargetRole = useCallback((role: string) => {
    setFormData((prev) => ({ ...prev, targetRole: role }));
  }, []);

  const setResumeResult = useCallback(
    (result: {
      resumeId: string;
      score: number;
      suggestions: { title: string; description: string }[];
    }) => {
      setFormData((prev) => ({
        ...prev,
        resumeId: result.resumeId,
        score: result.score,
        suggestions: result.suggestions,
      }));
      // Auto-advance to step 3 (Your Score)
      setStep(3);
    },
    []
  );

  const advance = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, 3));
  }, []);

  const back = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);

  // Save partial data to backend (used for skip)
  const saveProfile = useCallback(
    async (extra?: { onboarding_completed?: boolean }) => {
      const userId = getUserIdFromToken();
      if (!userId) return;
      try {
        await OnboardingAPI.updateProfile({
          user_id: userId,
          ...(formData.careerGoal ? { career_goal: formData.careerGoal } : {}),
          ...(formData.targetRole ? { target_role: formData.targetRole } : {}),
          ...extra,
        });
      } catch {
        // Swallow errors — onboarding is not critical path
      }
    },
    [formData.careerGoal, formData.targetRole]
  );

  const skip = useCallback(async () => {
    await saveProfile();
  }, [saveProfile]);

  const complete = useCallback(async () => {
    await saveProfile({ onboarding_completed: true });
  }, [saveProfile]);

  return {
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
  };
}
