"use client";

import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { WidgetCard } from "@/components/rr";
import type { Analysis } from "@/app/types/DashboardTypes";

export function ResumeHealthWidget({
  analysis,
  resumeId,
}: {
  analysis?: Analysis;
  resumeId?: string;
}) {
  const suggestions = analysis?.suggestions ?? [];

  if (!analysis) {
    return (
      <WidgetCard title="Resume Health">
        <p className="text-[13px] text-rr-text-secondary">Upload a resume to see its health.</p>
      </WidgetCard>
    );
  }

  if (suggestions.length === 0) {
    return (
      <WidgetCard title="Resume Health">
        <div className="flex items-center gap-2 text-[13px] text-rr-text-secondary">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rr-success/12 text-rr-success">
            <Check className="h-2.5 w-2.5" />
          </span>
          No issues found — nicely done.
        </div>
      </WidgetCard>
    );
  }

  return (
    <WidgetCard title="Resume Health">
      <ul className="space-y-2">
        {suggestions.slice(0, 4).map((s, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px]">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rr-warning/15 text-rr-warning">
              <Minus className="h-2.5 w-2.5" />
            </span>
            <span className="text-rr-text-secondary">{s.title}</span>
          </li>
        ))}
      </ul>
      {resumeId && (
        <Link
          href={`/dashboard/grader/${resumeId}`}
          className="mt-3 inline-block text-[13px] font-medium text-rr-accent hover:text-rr-accent-hover"
        >
          Fix issues
        </Link>
      )}
    </WidgetCard>
  );
}
