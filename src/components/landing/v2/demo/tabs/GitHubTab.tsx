"use client";

import { useState } from "react";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_GITHUB } from "../../part2-demo-data";

export function GitHubTab() {
  const [selected, setSelected] = useState(0);
  const repo = DEMO_GITHUB.repos[selected];
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_1.2fr]">
      <div className="space-y-2">
        {DEMO_GITHUB.repos.map((r, i) => (
          <button
            key={r.name}
            type="button"
            onClick={() => setSelected(i)}
            aria-pressed={i === selected}
            className={cn(
              "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition-colors",
              i === selected
                ? "border-rr-accent bg-rr-accent-light text-rr-text"
                : "border-rr-border bg-rr-card text-rr-text-secondary hover:bg-rr-bg-elevated"
            )}
          >
            <span className="inline-flex items-center gap-2">
              <Github className="h-4 w-4" aria-hidden />
              {r.name}
            </span>
            <span className="text-[10px] font-semibold text-rr-success">{r.relevance}</span>
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-rr-border bg-rr-card p-4">
        <div className="flex flex-wrap gap-1">
          {repo.stack.map((t) => (
            <span
              key={t}
              className="rounded border border-rr-border px-1.5 py-0.5 text-[10px] text-rr-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs font-semibold uppercase text-rr-text-muted">Generated Bullet</p>
        <p className="mt-1 text-sm leading-relaxed text-rr-text-secondary">{repo.bullet}</p>
      </div>
    </div>
  );
}
