"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/** A small animated gauge with content in the middle. `pct` is 0..1. */
export function ScoreRing({
  pct,
  center,
  reduce,
  size = 72,
}: {
  pct: number;
  center: ReactNode;
  reduce: boolean;
  size?: number;
}) {
  const clamped = Math.max(0, Math.min(1, pct));
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - clamped);

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
          className="text-rr-accent"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? offset : c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.2, 0, 0, 1] }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">{center}</span>
    </div>
  );
}
