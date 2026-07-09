"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { WidgetCard } from "@/components/rr";
import type { CoverLetters, UserResumes } from "@/app/types/DashboardTypes";

interface Row {
  label: string;
  meta: string;
  tone: "accent" | "info";
}

export function RecentActivityWidget({
  userResumes,
  coverLetters,
  className,
}: {
  userResumes?: UserResumes;
  coverLetters?: CoverLetters;
  className?: string;
}) {
  const rows: Row[] = [];
  if (userResumes?.created_on) {
    rows.push({
      label: `Resume added${userResumes.resume?.name ? ` — ${userResumes.resume.name}` : ""}`,
      meta: formatDistanceToNow(new Date(userResumes.created_on), { addSuffix: true }),
      tone: "accent",
    });
  }
  if (coverLetters?.created_on) {
    rows.push({
      label: `Cover letter — ${coverLetters.role}`,
      meta: formatDistanceToNow(new Date(coverLetters.created_on), { addSuffix: true }),
      tone: "info",
    });
  }

  return (
    <WidgetCard title="Recent Activity" className={className}>
      {rows.length === 0 ? (
        <p className="text-[13px] text-rr-text-secondary">No activity yet.</p>
      ) : (
        <ol className="space-y-2.5">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center gap-2.5">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${r.tone === "accent" ? "bg-rr-accent" : "bg-rr-info"}`}
                aria-hidden
              />
              <span className="truncate text-[13px] text-rr-text-secondary">{r.label}</span>
              <span className="ml-auto shrink-0 text-[11px] text-rr-text-muted">{r.meta}</span>
            </li>
          ))}
        </ol>
      )}
      <Link
        href="/dashboard/resumes"
        className="mt-3 inline-block text-[13px] font-medium text-rr-accent hover:text-rr-accent-hover"
      >
        View all resumes
      </Link>
    </WidgetCard>
  );
}
