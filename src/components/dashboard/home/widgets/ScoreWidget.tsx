"use client";

import Link from "next/link";
import { ArrowUpRight, Upload } from "lucide-react";
import { WidgetCard, ScoreRing, Counter } from "@/components/rr";
import type { UserResumes } from "@/app/types/DashboardTypes";
import { getGrade } from "../grade";

export function ScoreWidget({
  userResumes,
  reduce,
}: {
  userResumes?: UserResumes;
  reduce: boolean;
}) {
  if (!userResumes?.analysis) {
    return (
      <WidgetCard title="Resume Score">
        <p className="text-[13px] text-rr-text-secondary">Upload a resume to see your score.</p>
        <Link
          href="/dashboard/upload"
          className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-rr-accent hover:text-rr-accent-hover"
        >
          <Upload className="h-3.5 w-3.5" aria-hidden />
          Upload resume
        </Link>
      </WidgetCard>
    );
  }

  const { atsScore, gradingScore } = userResumes.analysis;
  return (
    <WidgetCard title="Resume Score">
      <div className="flex items-center gap-4">
        <ScoreRing
          pct={atsScore / 100}
          reduce={reduce}
          center={<span className="text-lg font-bold text-rr-text">{getGrade(gradingScore)}</span>}
        />
        <div className="space-y-1">
          <p className="text-[13px] text-rr-text-secondary">
            ATS{" "}
            <span className="font-semibold text-rr-text">
              <Counter to={atsScore} suffix="%" reduce={reduce} />
            </span>
          </p>
          <p className="text-[13px] text-rr-text-secondary">
            Keyword match{" "}
            <span className="font-semibold text-rr-text">
              <Counter to={gradingScore} suffix="%" reduce={reduce} />
            </span>
          </p>
        </div>
      </div>
      <Link
        href={`/dashboard/grader/${userResumes.user_resume_id}`}
        className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-rr-accent hover:text-rr-accent-hover"
      >
        Open full report <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </WidgetCard>
  );
}
