"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ResumeBuilderAPI } from "../api/resumeBuilderAPI";
import { normalizeDraft } from "../lib/normalizeDraft";
import type { BuilderResume, BuilderPatch } from "../types";

export interface UseResumeDraftResult {
  draft: BuilderResume | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
  /** Optimistic local update + debounced autosave (PATCH). */
  update: (patch: BuilderPatch) => void;
  refetch: () => Promise<void>;
}

const AUTOSAVE_MS = 800;

export function useResumeDraft(id: string): UseResumeDraftResult {
  const [draft, setDraft] = useState<BuilderResume | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const pendingRef = useRef<BuilderPatch>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await ResumeBuilderAPI.get(id);
      const body = res?.data?.body;
      setDraft(body ? normalizeDraft(body) : null);
    } catch {
      setError("Failed to load resume");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const flush = useCallback(async () => {
    const patch = pendingRef.current;
    pendingRef.current = {};
    if (Object.keys(patch).length === 0) return;
    try {
      setSaving(true);
      await ResumeBuilderAPI.update(id, patch);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }, [id]);

  const update = useCallback(
    (patch: BuilderPatch) => {
      setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
      pendingRef.current = { ...pendingRef.current, ...patch };
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(flush, AUTOSAVE_MS);
    },
    [flush]
  );

  // Flush any pending edit on unmount.
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  return { draft, loading, error, saving, update, refetch: load };
}
