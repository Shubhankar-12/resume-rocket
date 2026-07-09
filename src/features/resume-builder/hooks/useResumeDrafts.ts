"use client";

import { useState, useEffect, useCallback } from "react";
import { ResumeBuilderAPI } from "../api/resumeBuilderAPI";
import { getUserIdFromToken } from "../lib/user";
import type { BuilderResume, ResumeDraftSummary, TemplateId } from "../types";

export interface CreateDraftArgs {
  title: string;
  template_id: TemplateId;
  seed_from_resume_id?: string | null;
}

export interface UseResumeDraftsResult {
  drafts: ResumeDraftSummary[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (args: CreateDraftArgs) => Promise<BuilderResume>;
  remove: (resumeDraftId: string) => Promise<void>;
}

export function useResumeDrafts(): UseResumeDraftsResult {
  const [drafts, setDrafts] = useState<ResumeDraftSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await ResumeBuilderAPI.list(userId);
      setDrafts((res?.data?.body as ResumeDraftSummary[]) ?? []);
    } catch {
      setError("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const create = useCallback(async (args: CreateDraftArgs): Promise<BuilderResume> => {
    const userId = getUserIdFromToken();
    if (!userId) throw new Error("User not authenticated");
    const res = await ResumeBuilderAPI.create({ user_id: userId, ...args });
    return res?.data?.body as BuilderResume;
  }, []);

  const remove = useCallback(
    async (resumeDraftId: string) => {
      const userId = getUserIdFromToken();
      if (!userId) throw new Error("User not authenticated");
      await ResumeBuilderAPI.disable(resumeDraftId, userId);
      await refetch();
    },
    [refetch]
  );

  return { drafts, loading, error, refetch, create, remove };
}
