"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus, ArrowUpRight, CalendarClock, Upload, Wand2, Mail } from "lucide-react";
import { ScoreRing } from "../ScoreRing";
import { Counter } from "../Counter";
import { DASHBOARD, CREDITS, WORKSPACE } from "../tour-data";

const QUICK_ICONS = [Upload, Wand2, Mail];

function Card({
  title,
  className = "",
  children,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border border-rr-border-muted bg-rr-card p-4 transition-shadow hover:shadow-md ${className}`}
    >
      {title && (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

export function DashboardPanel() {
  const reduce = useReducedMotion() ?? false;
  const creditPct = Math.round((CREDITS.remaining / CREDITS.total) * 100);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-rr-text">Welcome back, {WORKSPACE.user}</h3>
          <p className="text-[13px] text-rr-text-secondary">
            Here&apos;s how your job search is going.
          </p>
        </div>
        <span className="rounded-full bg-rr-accent-light px-2.5 py-1 text-[11px] font-medium text-rr-accent">
          {WORKSPACE.label}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Card title="Resume Score">
          <div className="flex items-center gap-3">
            <ScoreRing
              pct={0.9}
              reduce={reduce}
              center={<span className="text-lg font-bold text-rr-text">A-</span>}
            />
            <div>
              <p className="text-[13px] font-medium text-rr-text">
                ATS <Counter to={87} suffix="%" reduce={reduce} />
              </p>
              <p className="text-[11px] text-rr-text-muted">Top 10% of uploads</p>
            </div>
          </div>
        </Card>

        <Card title="Credits">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-rr-text">
              <Counter to={CREDITS.remaining} reduce={reduce} />
            </span>
            <span className="text-xs text-rr-text-muted">of {CREDITS.total} left</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-rr-border-muted">
            <motion.div
              className="h-full rounded-full bg-rr-accent"
              initial={{ width: reduce ? `${creditPct}%` : "0%" }}
              whileInView={{ width: `${creditPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 1, ease: [0.2, 0, 0, 1] }}
            />
          </div>
        </Card>

        <Card title="Upcoming Interview">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rr-info/10 text-rr-info">
              <CalendarClock className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-rr-text">{DASHBOARD.interview.role}</p>
              <p className="text-[11px] text-rr-text-muted">
                {DASHBOARD.interview.company} · {DASHBOARD.interview.when}
              </p>
            </div>
          </div>
        </Card>

        <Card title="Recent Activity" className="sm:col-span-2">
          <ol className="space-y-2.5">
            {DASHBOARD.activity.map((a) => (
              <li key={a.label} className="flex items-center gap-2.5">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    a.tone === "accent"
                      ? "bg-rr-accent"
                      : a.tone === "info"
                        ? "bg-rr-info"
                        : "bg-rr-success"
                  }`}
                  aria-hidden
                />
                <span className="text-[13px] text-rr-text-secondary">{a.label}</span>
                <span className="ml-auto text-[11px] text-rr-text-muted">{a.meta}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Resume Health">
          <ul className="space-y-2">
            {DASHBOARD.health.map((h) => (
              <li key={h.label} className="flex items-center gap-2 text-[13px]">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full ${
                    h.ok ? "bg-rr-success/12 text-rr-success" : "bg-rr-warning/15 text-rr-warning"
                  }`}
                >
                  {h.ok ? <Check className="h-2.5 w-2.5" /> : <Minus className="h-2.5 w-2.5" />}
                </span>
                <span className="text-rr-text-secondary">{h.label}</span>
                <span className="ml-auto text-[11px] text-rr-text-muted">{h.value}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Quick Actions" className="sm:col-span-2 xl:col-span-3">
          <div className="flex flex-wrap gap-2">
            {DASHBOARD.quickActions.map((label, i) => {
              const Icon = QUICK_ICONS[i];
              return (
                <button
                  key={label}
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rr-border-muted bg-rr-card px-3 py-2 text-[13px] font-medium text-rr-text-secondary transition-colors hover:border-rr-accent/40 hover:bg-rr-accent-light hover:text-rr-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                  <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden />
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
