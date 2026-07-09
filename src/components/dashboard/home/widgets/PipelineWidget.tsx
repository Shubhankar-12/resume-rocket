"use client";

import Link from "next/link";
import { WidgetCard } from "@/components/rr";
import { useApplications } from "@/features/application-tracker/hooks/useApplications";

const STAGES: {
  key: "BOOKMARKED" | "APPLIED" | "PHONE_SCREEN" | "INTERVIEW" | "OFFER";
  label: string;
  dot: string;
}[] = [
  { key: "BOOKMARKED", label: "Saved", dot: "bg-rr-text-muted" },
  { key: "APPLIED", label: "Applied", dot: "bg-rr-accent" },
  { key: "PHONE_SCREEN", label: "Phone screen", dot: "bg-rr-info" },
  { key: "INTERVIEW", label: "Interview", dot: "bg-rr-info" },
  { key: "OFFER", label: "Offer", dot: "bg-rr-success" },
];

export function PipelineWidget({ reduce: _reduce }: { reduce: boolean }) {
  const { columns, loading } = useApplications();
  const total = STAGES.reduce((n, s) => n + columns[s.key].length, 0);

  return (
    <WidgetCard title="Application Pipeline">
      {loading ? (
        <p className="text-[13px] text-rr-text-muted">Loading…</p>
      ) : total === 0 ? (
        <p className="text-[13px] text-rr-text-secondary">Start tracking your applications.</p>
      ) : (
        <ul className="space-y-2">
          {STAGES.map((s) => (
            <li key={s.key} className="flex items-center gap-2 text-[13px]">
              <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} aria-hidden />
              <span className="text-rr-text-secondary">{s.label}</span>
              <span className="ml-auto font-semibold text-rr-text">{columns[s.key].length}</span>
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/dashboard/tracker"
        className="mt-3 inline-block text-[13px] font-medium text-rr-accent hover:text-rr-accent-hover"
      >
        Open tracker
      </Link>
    </WidgetCard>
  );
}
