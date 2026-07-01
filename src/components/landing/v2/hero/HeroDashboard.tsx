"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Upload } from "lucide-react";
import { MetricCard, ScoreRing, StatMeter } from "./HeroWidgets";
import { SuggestionsPanel, ActivityPanel, ApplicationsPanel } from "./HeroPanels";
import { SCORE, CREDITS, WORKSPACE } from "./hero-data";
import { meterTransition } from "./motion";

/** The main content area of the browser preview — a real-feeling home screen. */
export function HeroDashboard() {
  const reduce = useReducedMotion() ?? false;
  const creditPct = Math.round((CREDITS.remaining / CREDITS.total) * 100);

  return (
    <div className="flex flex-col gap-4 bg-rr-bg-elevated p-4 md:p-5">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium text-rr-text-muted">Dashboard</p>
          <h2 className="mt-0.5 text-lg font-semibold text-rr-text">
            Welcome back, {WORKSPACE.firstName}
          </h2>
          <p className="text-[13px] text-rr-text-secondary">
            Here&apos;s how your job search is going.
          </p>
        </div>
        <span
          data-hero-target="upload"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-rr-accent px-3 py-2 text-[13px] font-semibold text-white shadow-sm"
        >
          <Upload className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">Upload new resume</span>
          <span className="sm:hidden">Upload</span>
        </span>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Resume Score">
          <div className="flex items-center gap-3">
            <ScoreRing
              pct={0.9}
              tone="accent"
              center={<span className="text-xl font-bold text-rr-text">{SCORE.grade}</span>}
            />
            <div className="leading-tight">
              <p className="text-[13px] font-medium text-rr-text">Overall grade</p>
              <p className="text-[11px] text-rr-text-muted">Top 10% of uploads</p>
            </div>
          </div>
        </MetricCard>

        <MetricCard label="ATS Score">
          <StatMeter value={SCORE.ats} tone="success" caption="Compatible" delay={0.15} />
        </MetricCard>

        <MetricCard label="Keyword Match">
          <StatMeter value={SCORE.keyword} tone="info" caption="Strong" delay={0.25} />
        </MetricCard>

        <MetricCard label="Credits">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-rr-text">{CREDITS.remaining}</span>
              <span className="text-xs font-medium text-rr-text-muted">
                of {CREDITS.total} left
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-rr-border-muted">
              <motion.div
                className="h-full rounded-full bg-rr-accent"
                initial={{ width: reduce ? `${creditPct}%` : "0%" }}
                whileInView={{ width: `${creditPct}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={meterTransition(reduce, 0.35)}
              />
            </div>
          </div>
        </MetricCard>
      </div>

      {/* panels */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_1fr]">
        <SuggestionsPanel />
        <ActivityPanel />
      </div>

      <ApplicationsPanel />
    </div>
  );
}
