"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Counter } from "../Counter";

const SUGGESTIONS = ["Add Docker to your skills", "Quantify achievements", "Improve the summary"];

function Meter({ label, value, reduce }: { label: string; value: number; reduce: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-rr-text-muted">{label}</span>
        <span className="text-sm font-semibold text-rr-text">
          <Counter to={value} suffix="%" reduce={reduce} />
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-rr-border-muted">
        <motion.div
          className="h-full rounded-full bg-rr-accent"
          initial={{ width: reduce ? `${value}%` : "0%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.2, 0, 0, 1] }}
        />
      </div>
    </div>
  );
}

/** Stage 3 — the analysis panel: grade ring, ATS/keyword meters, suggestions. */
export function AnalysisPreview() {
  const reduce = useReducedMotion() ?? false;
  const size = 76;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = 0.9;

  return (
    <div className="rounded-xl border border-rr-border-muted bg-rr-card p-4 shadow-xs">
      <div className="flex items-center gap-4">
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
              initial={{ strokeDashoffset: reduce ? c * (1 - pct) : c }}
              whileInView={{ strokeDashoffset: c * (1 - pct) }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduce ? 0 : 1.2, ease: [0.2, 0, 0, 1] }}
            />
          </svg>
          <span className="absolute text-lg font-bold text-rr-text">A-</span>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
            Resume score
          </p>
          <p className="text-sm font-semibold text-rr-text">Strong — ready to improve</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <Meter label="ATS score" value={87} reduce={reduce} />
        <Meter label="Keyword match" value={82} reduce={reduce} />
      </div>

      <motion.ul
        className="mt-4 space-y-1.5 border-t border-rr-border-muted pt-3"
        aria-label="Top suggestions"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          show: {
            transition: { staggerChildren: reduce ? 0 : 0.15, delayChildren: reduce ? 0 : 0.4 },
          },
        }}
      >
        {SUGGESTIONS.map((s) => (
          <motion.li
            key={s}
            variants={{
              hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 4 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex items-center gap-2 text-[13px] text-rr-text-secondary"
          >
            <Check className="h-3.5 w-3.5 shrink-0 text-rr-success" aria-hidden />
            {s}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
