"use client";

import { useEffect, useState } from "react";
import { AIAnalyticsAPI } from "../api/aiAnalyticsAPI";
import type { AnalyticsResponse } from "../types/analytics";

export interface AiUsageSummary {
  calls: number;
  cacheHitRate: number;
  loading: boolean;
  error: boolean;
}

/** Current-month AI usage summary for the dashboard home widget. */
export function useAiUsageSummary(): AiUsageSummary {
  const [state, setState] = useState<AiUsageSummary>({
    calls: 0,
    cacheHitRate: 0,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let active = true;
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const to = now.toISOString();

    AIAnalyticsAPI.getAnalytics({ from, to, groupBy: "day" })
      .then((r) => {
        if (!active) return;
        const body = (r.data.body ?? {}) as Partial<AnalyticsResponse>;
        setState({
          calls: body?.totalCalls ?? 0,
          cacheHitRate: body?.cacheHitRate ?? 0,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (active) setState((s) => ({ ...s, loading: false, error: true }));
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
