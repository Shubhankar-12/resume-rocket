"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { meterTransition } from "./motion";

type Tone = "accent" | "info" | "success";

const BAR: Record<Tone, string> = {
  accent: "bg-rr-accent",
  info: "bg-rr-info",
  success: "bg-rr-success",
};

const RING: Record<Tone, string> = {
  accent: "text-rr-accent",
  info: "text-rr-info",
  success: "text-rr-success",
};

/** A card shell used across the dashboard metrics. */
export function MetricCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col rounded-lg border border-rr-border-muted bg-rr-card p-4 shadow-xs">
      <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
        {label}
      </span>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/** Animated circular gauge with a value (e.g. a letter grade) in the middle. */
export function ScoreRing({
  pct,
  center,
  tone = "accent",
  size = 84,
}: {
  pct: number;
  center: ReactNode;
  tone?: Tone;
  size?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--rr-border-muted))"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className={RING[tone]}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? offset : c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, amount: 0.6 }}
          transition={meterTransition(reduce, 0.2)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">{center}</span>
    </div>
  );
}

/** Labelled horizontal meter with an animated fill. */
export function StatMeter({
  value,
  tone = "accent",
  caption,
  delay = 0,
}: {
  value: number;
  tone?: Tone;
  caption: string;
  delay?: number;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold text-rr-text">{value}%</span>
        <span className="text-xs font-medium text-rr-text-muted">{caption}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-rr-border-muted">
        <motion.div
          className={`h-full rounded-full ${BAR[tone]}`}
          initial={{ width: reduce ? `${value}%` : "0%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={meterTransition(reduce, delay)}
        />
      </div>
    </div>
  );
}
