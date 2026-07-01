"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FIELDS = [
  { label: "Experience", value: "5 roles" },
  { label: "Skills", value: "22 found" },
  { label: "Projects", value: "8 listed" },
  { label: "Education", value: "2 degrees" },
  { label: "Contact", value: "Complete" },
];

/** Stage 2 — the raw document resolves into structured fields, one by one. */
export function ParsePreview() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.3fr)] items-center gap-3 rounded-xl border border-rr-border-muted bg-rr-card p-4 shadow-xs sm:gap-4">
      {/* raw document */}
      <div className="rounded-lg border border-rr-border-muted bg-rr-bg-elevated p-3">
        <div className="space-y-1.5" aria-hidden>
          <div className="h-2 w-3/4 rounded bg-rr-border" />
          <div className="h-2 w-full rounded bg-rr-border-muted" />
          <div className="h-2 w-5/6 rounded bg-rr-border-muted" />
          <div className="h-2 w-2/3 rounded bg-rr-border-muted" />
          <div className="h-2 w-full rounded bg-rr-border-muted" />
        </div>
        <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-rr-text-muted">
          Resume.pdf
        </p>
      </div>

      <ArrowRight className="h-4 w-4 text-rr-text-muted" aria-hidden />

      {/* extracted fields */}
      <motion.ul
        className="space-y-1.5"
        aria-label="Extracted resume sections"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }}
      >
        {FIELDS.map((f) => (
          <motion.li
            key={f.label}
            variants={{
              hidden: reduce ? { opacity: 1 } : { opacity: 0, x: 8 },
              show: { opacity: 1, x: 0 },
            }}
            className="flex items-center justify-between rounded-md border border-rr-border-muted bg-rr-card px-2.5 py-1.5"
          >
            <span className="text-[12px] font-medium text-rr-text">{f.label}</span>
            <span className="text-[11px] text-rr-text-muted">{f.value}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
