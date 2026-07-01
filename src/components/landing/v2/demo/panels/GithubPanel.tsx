"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Star, Sparkles } from "lucide-react";
import { GITHUB } from "../tour-data";

const RELEVANCE: Record<string, string> = {
  High: "bg-rr-success/12 text-rr-success",
  Medium: "bg-rr-warning/15 text-rr-warning",
  Low: "bg-rr-border-muted text-rr-text-muted",
};

export function GithubPanel() {
  const reduce = useReducedMotion() ?? false;
  const [selected, setSelected] = useState(0);
  const repo = GITHUB.repos[selected];

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.4fr]">
      {/* repo list */}
      <ul className="space-y-1.5" aria-label="Repositories">
        {GITHUB.repos.map((r, i) => {
          const active = i === selected;
          return (
            <li key={r.name}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={active}
                className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent ${
                  active
                    ? "border-rr-accent/40 bg-rr-accent-light"
                    : "border-rr-border-muted bg-rr-card hover:border-rr-border hover:bg-rr-bg-elevated"
                }`}
              >
                <Github
                  className={`h-4 w-4 shrink-0 ${active ? "text-rr-accent" : "text-rr-text-muted"}`}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-[13px] font-medium ${active ? "text-rr-accent" : "text-rr-text"}`}
                  >
                    {r.name}
                  </span>
                  <span className="block truncate text-[11px] text-rr-text-muted">
                    {r.stack.join(" · ")}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${RELEVANCE[r.relevance]}`}
                >
                  {r.relevance}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* selected repo detail */}
      <motion.div
        key={repo.name}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.2 }}
        className="rounded-xl border border-rr-border-muted bg-rr-card p-4"
      >
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4 text-rr-text" aria-hidden />
          <span className="text-[13px] font-semibold text-rr-text">{repo.name}</span>
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-rr-text-muted">
            <Star className="h-3 w-3" aria-hidden />
            AI relevance: <span className="font-medium text-rr-text">{repo.relevance}</span>
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-rr-border-muted bg-rr-bg-elevated px-2 py-0.5 text-[11px] font-medium text-rr-text-secondary"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-rr-accent/20 bg-rr-accent-light/50 p-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-accent">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Generated resume bullet
          </p>
          <p className="text-[13px] leading-relaxed text-rr-text">{repo.bullet}</p>
        </div>
      </motion.div>
    </div>
  );
}
