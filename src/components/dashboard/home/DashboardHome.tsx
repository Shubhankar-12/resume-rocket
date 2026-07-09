"use client";

import { useReducedMotion } from "framer-motion";
import type { StatsType } from "@/app/types/DashboardTypes";
import { ScoreWidget } from "./widgets/ScoreWidget";
import { CreditsWidget } from "./widgets/CreditsWidget";
import { PipelineWidget } from "./widgets/PipelineWidget";
import { RecentActivityWidget } from "./widgets/RecentActivityWidget";
import { ResumeHealthWidget } from "./widgets/ResumeHealthWidget";
import { GithubWidget } from "./widgets/GithubWidget";
import { AiUsageWidget } from "./widgets/AiUsageWidget";
import { QuickActionsWidget } from "./widgets/QuickActionsWidget";

function welcomeSub(stats: StatsType): string {
  const score = stats.user_resumes?.analysis?.gradingScore;
  if (typeof score === "number") {
    return `Your resume is ${score}% optimized. Here's how to push it further.`;
  }
  return "Upload a resume to get your first AI analysis.";
}

export function DashboardHome({ stats }: { stats: StatsType }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold text-rr-text">Welcome back, {stats.name}</h1>
        <p className="mt-1 text-sm text-rr-text-secondary">{welcomeSub(stats)}</p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <ScoreWidget userResumes={stats.user_resumes} reduce={reduce} />
        <CreditsWidget reduce={reduce} />
        <PipelineWidget reduce={reduce} />
        <RecentActivityWidget
          userResumes={stats.user_resumes}
          coverLetters={stats.cover_letters}
          className="sm:col-span-2"
        />
        <ResumeHealthWidget
          analysis={stats.user_resumes?.analysis}
          resumeId={stats.user_resumes?.user_resume_id}
        />
        <GithubWidget provider={stats.provider} githubProfile={stats.githubProfile} />
        <AiUsageWidget reduce={reduce} />
        <QuickActionsWidget provider={stats.provider} className="sm:col-span-2 xl:col-span-3" />
      </div>
    </div>
  );
}
