"use client";

import { CalendarClock } from "lucide-react";
import { ScoreRing } from "../../shared/ScoreRing";
import { DEMO_DASHBOARD } from "../../part2-demo-data";

export function DashboardTab() {
  const d = DEMO_DASHBOARD;
  const creditsPct = Math.round(((d.credits.total - d.credits.used) / d.credits.total) * 100);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-rr-border bg-rr-card p-4">
        <p className="text-xs font-semibold uppercase text-rr-text-muted">Resume Score</p>
        <div className="mt-2 flex items-center gap-3">
          <ScoreRing
            value={d.score.ats}
            size={64}
            centerText={d.score.grade}
            label="Resume score"
          />
          <p className="text-sm text-rr-text-muted">
            ATS <span className="font-semibold text-rr-text">{d.score.ats}%</span>
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-rr-border bg-rr-card p-4">
        <p className="text-xs font-semibold uppercase text-rr-text-muted">Credits</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-rr-border-muted">
          <div className="h-full rounded-full bg-rr-accent" style={{ width: `${creditsPct}%` }} />
        </div>
        <p className="mt-1.5 text-xs text-rr-text-muted">
          {d.credits.total - d.credits.used} of {d.credits.total} credits left
        </p>
      </div>
      <div className="rounded-xl border border-rr-border bg-rr-card p-4">
        <p className="text-xs font-semibold uppercase text-rr-text-muted">Recent Activity</p>
        <ul className="mt-2 space-y-1 text-xs text-rr-text-secondary">
          {d.activity.map((a) => (
            <li key={a}>· {a}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-rr-border bg-rr-card p-4">
        <p className="text-xs font-semibold uppercase text-rr-text-muted">Upcoming Interview</p>
        <p className="mt-2 flex items-center gap-2 text-sm text-rr-text">
          <CalendarClock className="h-4 w-4 text-rr-accent" aria-hidden />
          {d.interview.role}
        </p>
        <p className="text-xs text-rr-text-muted">{d.interview.when}</p>
      </div>
      <div className="sm:col-span-2">
        <p className="mb-2 text-xs font-semibold uppercase text-rr-text-muted">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          {d.quickActions.map((q) => (
            <span
              key={q}
              className="rounded-lg border border-rr-border bg-rr-card px-3 py-1.5 text-xs font-medium text-rr-text-secondary"
            >
              {q}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
