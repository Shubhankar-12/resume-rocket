"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Target, ArrowDown } from "lucide-react";
import { TAILORED } from "../tour-data";

export function TailoredPanel() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rr-accent-light px-2.5 py-1 text-[11px] font-medium text-rr-accent">
          <Target className="h-3.5 w-3.5" aria-hidden />
          Tailoring for: {TAILORED.job}
        </span>
        <span className="text-[13px] text-rr-text-secondary">
          Role alignment{" "}
          <span className="font-semibold text-rr-success">{TAILORED.alignment}%</span>
        </span>
      </div>

      <div className="space-y-2">
        <div className="rounded-xl border border-rr-border-muted bg-rr-card p-4">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
            Original summary
          </p>
          <p className="text-[13px] text-rr-text-muted line-through decoration-rr-danger/40">
            {TAILORED.original}
          </p>
        </div>

        <div className="flex justify-center" aria-hidden>
          <ArrowDown className="h-4 w-4 text-rr-text-muted" />
        </div>

        <motion.div
          className="rounded-xl border border-rr-success/30 bg-rr-success/[0.05] p-4"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
        >
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-success">
            Tailored summary
          </p>
          <p className="text-[13px] text-rr-text">{TAILORED.tailored}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-rr-border-muted bg-rr-card p-4">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
            Keywords added
          </p>
          <div className="flex flex-wrap gap-1.5">
            {TAILORED.addedKeywords.map((k) => (
              <span
                key={k}
                className="rounded-full bg-rr-success/10 px-2 py-0.5 text-[11px] font-medium text-rr-success"
              >
                + {k}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-rr-border-muted bg-rr-card p-4">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
            What changed
          </p>
          <ul className="space-y-1.5">
            {TAILORED.changes.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[13px] text-rr-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-rr-accent" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
