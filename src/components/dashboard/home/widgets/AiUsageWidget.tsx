"use client";

import Link from "next/link";
import { WidgetCard, Counter } from "@/components/rr";
import { useAiUsageSummary } from "@/features/ai-analytics";

export function AiUsageWidget({ reduce }: { reduce: boolean }) {
  const { calls, cacheHitRate, loading, error } = useAiUsageSummary();
  const hitPct = Math.round(cacheHitRate <= 1 ? cacheHitRate * 100 : cacheHitRate);

  return (
    <WidgetCard title="AI Usage">
      {error ? (
        <p className="text-[13px] text-rr-text-muted">Usage unavailable.</p>
      ) : (
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold text-rr-text">
            {loading ? "…" : <Counter to={calls} reduce={reduce} />}
          </span>
          <span className="text-xs text-rr-text-muted">calls this month · {hitPct}% cached</span>
        </div>
      )}
      <Link
        href="/dashboard/ai-analytics"
        className="mt-3 inline-block text-[13px] font-medium text-rr-accent hover:text-rr-accent-hover"
      >
        View analytics
      </Link>
    </WidgetCard>
  );
}
