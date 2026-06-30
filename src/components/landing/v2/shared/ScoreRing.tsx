"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ScoreRing({
  value,
  size = 80,
  label,
  centerText,
}: {
  value: number;
  size?: number;
  label?: string;
  centerText?: string;
}) {
  const reduce = useReducedMotion();
  const stroke = 7;
  const r = (size - stroke) / 2 - 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value)) / 100;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        width={size}
        height={size}
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="fill-none stroke-rr-border-muted"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="fill-none stroke-rr-accent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? c * (1 - pct) : c }}
          whileInView={{ strokeDashoffset: c * (1 - pct) }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.2, ease: "easeInOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-rr-text">
        {centerText ?? `${value}%`}
      </span>
    </div>
  );
}
