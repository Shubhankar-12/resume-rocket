"use client";

import { motion } from "framer-motion";

const TONE = {
  accent: "bg-rr-accent",
  info: "bg-rr-info",
  success: "bg-rr-success",
  warning: "bg-rr-warning",
} as const;

/** Animated progress meter. `value` is 0..1. */
export function StatMeter({
  value,
  tone = "accent",
  reduce,
}: {
  value: number;
  tone?: keyof typeof TONE;
  reduce: boolean;
}) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 w-full overflow-hidden rounded-full bg-rr-border-muted"
    >
      <motion.div
        className={`h-full rounded-full ${TONE[tone]}`}
        initial={{ width: reduce ? `${pct}%` : "0%" }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1, ease: [0.2, 0, 0, 1] }}
      />
    </div>
  );
}
