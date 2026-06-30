import { Github } from "lucide-react";
import { GlassCard } from "../GlassCard";
import { GITHUB_DEMO } from "../../hero-demo-data";

export function GitHubCard() {
  return (
    <GlassCard className="w-64">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-rr-text">
          <Github className="h-4 w-4" aria-hidden />
          {GITHUB_DEMO.repo}
        </span>
        <span className="shrink-0 rounded-full bg-rr-accent-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rr-accent">
          {GITHUB_DEMO.label}
        </span>
      </div>
      <p className="mt-2 text-xs text-rr-text-muted">
        AI Relevance: <span className="font-semibold text-rr-success">{GITHUB_DEMO.relevance}</span>
      </p>
      <p className="mt-2 rounded-lg bg-rr-bg-elevated p-2 text-xs leading-relaxed text-rr-text-secondary">
        {GITHUB_DEMO.bullet}
      </p>
    </GlassCard>
  );
}
