"use client";

import { useState, useCallback } from "react";
import { ResumeBuilderAPI } from "../api/resumeBuilderAPI";

/**
 * Synchronous AI-assist actions. Each returns the result or null on failure.
 * A 402 (out of credits) is handled globally by the axios interceptor +
 * OutOfCredits modal, so callers only handle the happy path.
 */
export function useAiAssist() {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const improveBullet = useCallback(
    async (key: string, bullet: string, context: string): Promise<string | null> => {
      setBusy(key);
      setError(null);
      try {
        const res = await ResumeBuilderAPI.improveBullet(bullet, context);
        return (res?.data?.body?.bullet as string) ?? null;
      } catch {
        setError("AI request failed");
        return null;
      } finally {
        setBusy(null);
      }
    },
    []
  );

  const generateSummary = useCallback(async (resumeJson: string): Promise<string | null> => {
    setBusy("summary");
    setError(null);
    try {
      const res = await ResumeBuilderAPI.summary(resumeJson);
      return (res?.data?.body?.summary as string) ?? null;
    } catch {
      setError("AI request failed");
      return null;
    } finally {
      setBusy(null);
    }
  }, []);

  const suggestSkills = useCallback(
    async (role: string, experience: string, existing: string[]): Promise<string[] | null> => {
      setBusy("skills");
      setError(null);
      try {
        const res = await ResumeBuilderAPI.skills(role, experience, existing);
        return (res?.data?.body?.skills as string[]) ?? null;
      } catch {
        setError("AI request failed");
        return null;
      } finally {
        setBusy(null);
      }
    },
    []
  );

  const polishDescription = useCallback(
    async (key: string, text: string, context: string): Promise<string[] | null> => {
      setBusy(key);
      setError(null);
      try {
        const res = await ResumeBuilderAPI.polishDescription(text, context);
        return (res?.data?.body?.bullets as string[]) ?? null;
      } catch {
        setError("AI request failed");
        return null;
      } finally {
        setBusy(null);
      }
    },
    []
  );

  return { busy, error, improveBullet, generateSummary, suggestSkills, polishDescription };
}
