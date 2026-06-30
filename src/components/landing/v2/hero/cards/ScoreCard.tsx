"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import { SCORE_DEMO } from "../../hero-demo-data";

const R = 34;
const C = 2 * Math.PI * R;

export function ScoreCard() {
  const reduce = useReducedMotion();
  const pct = SCORE_DEMO.ats / 100;
  return (
    <GlassCard className="w-60">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-rr-accent-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rr-accent">
          {SCORE_DEMO.label}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90" aria-hidden>
            <circle
              cx="40"
              cy="40"
              r={R}
              className="fill-none stroke-rr-border-muted"
              strokeWidth="7"
            />
            <motion.circle
              cx="40"
              cy="40"
              r={R}
              className="fill-none stroke-rr-accent"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: reduce ? C * (1 - pct) : C }}
              whileInView={{ strokeDashoffset: C * (1 - pct) }}
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 1.2, ease: "easeInOut" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-rr-text">
            {SCORE_DEMO.grade}
          </span>
        </div>
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-rr-text-muted">ATS Score</dt>
            <dd className="font-semibold text-rr-text">{SCORE_DEMO.ats}%</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-rr-text-muted">Keyword Match</dt>
            <dd className="font-semibold text-rr-text">{SCORE_DEMO.keyword}%</dd>
          </div>
        </dl>
      </div>
      <button
        type="button"
        className="mt-3 w-full rounded-lg border border-rr-border py-2 text-xs font-semibold text-rr-text transition-colors hover:bg-rr-accent-light"
      >
        View Report
      </button>
    </GlassCard>
  );
}
