"use client";

import { DEMO_TAILORED } from "../../part2-demo-data";

export function TailoredTab() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-xl border border-rr-border bg-rr-card p-4">
        <p className="text-xs font-semibold uppercase text-rr-text-muted">Job Description</p>
        <p className="mt-2 text-sm font-medium text-rr-text">{DEMO_TAILORED.job}</p>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="rounded-md bg-rr-success/10 px-2 py-1 text-rr-success">
            {DEMO_TAILORED.matching} matching skills
          </span>
          <span className="rounded-md bg-rr-warning/10 px-2 py-1 text-rr-warning">
            {DEMO_TAILORED.missing} missing skills
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {DEMO_TAILORED.missingSkills.map((s) => (
            <span
              key={s}
              className="rounded border border-rr-border px-1.5 py-0.5 text-[10px] text-rr-text-secondary"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-rr-accent/40 bg-rr-accent-light p-4">
        <p className="text-xs font-semibold uppercase text-rr-accent">Generated Resume</p>
        <p className="mt-2 text-sm leading-relaxed text-rr-text">{DEMO_TAILORED.generated}</p>
      </div>
    </div>
  );
}
