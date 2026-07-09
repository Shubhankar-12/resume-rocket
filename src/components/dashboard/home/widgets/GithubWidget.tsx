"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { WidgetCard } from "@/components/rr";
import type { GithubProfile } from "@/app/types/DashboardTypes";

export function GithubWidget({
  provider,
  githubProfile,
}: {
  provider?: string;
  githubProfile?: GithubProfile;
}) {
  const connected = provider === "github" && !!githubProfile?.username;
  return (
    <WidgetCard title="GitHub">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rr-accent/10 text-rr-accent">
          <Github className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          {connected ? (
            <>
              <p className="truncate text-[13px] font-semibold text-rr-text">
                @{githubProfile!.username}
              </p>
              <p className="text-[11px] text-rr-text-muted">Connected</p>
            </>
          ) : (
            <p className="text-[13px] text-rr-text-secondary">Not connected</p>
          )}
        </div>
      </div>
      <Link
        href="/dashboard/github"
        className="mt-3 inline-block text-[13px] font-medium text-rr-accent hover:text-rr-accent-hover"
      >
        {connected ? "Analyze projects" : "Connect GitHub"}
      </Link>
    </WidgetCard>
  );
}
