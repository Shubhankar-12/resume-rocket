"use client";

import { ScoreRing } from "../../shared/ScoreRing";
import { DEMO_ANALYSIS } from "../../part2-demo-data";

export function AnalysisTab() {
  return (
    <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
      <div className="flex items-center gap-4 rounded-xl border border-rr-border bg-rr-card p-4">
        <ScoreRing value={DEMO_ANALYSIS.ats} size={72} centerText="A-" label="ATS score" />
        <dl className="text-sm">
          <div className="flex justify-between gap-6">
            <dt className="text-rr-text-muted">ATS Score</dt>
            <dd className="font-semibold text-rr-text">{DEMO_ANALYSIS.ats}%</dd>
          </div>
          <div className="mt-1 flex justify-between gap-6">
            <dt className="text-rr-text-muted">Keyword Match</dt>
            <dd className="font-semibold text-rr-text">{DEMO_ANALYSIS.keyword}%</dd>
          </div>
        </dl>
      </div>
      <div className="rounded-xl border border-rr-border bg-rr-card p-4">
        <p className="text-xs font-semibold uppercase text-rr-text-muted">Suggestions</p>
        <ul className="mt-2 space-y-2">
          {DEMO_ANALYSIS.suggestions.map((s, i) => (
            <li key={s}>
              <p className="text-sm text-rr-text-secondary">{s}</p>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-rr-border-muted">
                <div
                  className="h-full rounded-full bg-rr-accent"
                  style={{ width: `${70 - i * 10}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
