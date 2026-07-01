"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, FileText } from "lucide-react";
import { Counter } from "../Counter";
import { ANALYSIS } from "../tour-data";

const LINE_STYLE: Record<string, string> = {
  weak: "text-rr-text-muted line-through decoration-rr-danger/50",
  strong: "text-rr-text bg-rr-success/[0.08] rounded px-1",
  add: "text-rr-accent bg-rr-accent-light rounded px-1",
};

export function AnalysisPanel() {
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.1fr]">
        {/* score block */}
        <div className="rounded-xl border border-rr-border-muted bg-rr-card p-5">
          <div className="flex items-end gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
                ATS score
              </p>
              <p className="text-5xl font-bold leading-none text-rr-text">
                <Counter to={ANALYSIS.ats} suffix="%" reduce={reduce} />
              </p>
            </div>
            <span className="mb-1 rounded-lg bg-rr-accent-light px-2.5 py-1 text-sm font-bold text-rr-accent">
              Grade {ANALYSIS.grade}
            </span>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-rr-text-muted">Keyword match</span>
              <span className="font-semibold text-rr-text">
                <Counter to={ANALYSIS.keyword} suffix="%" reduce={reduce} />
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-rr-border-muted">
              <motion.div
                className="h-full rounded-full bg-rr-info"
                initial={{ width: reduce ? `${ANALYSIS.keyword}%` : "0%" }}
                whileInView={{ width: `${ANALYSIS.keyword}%` }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0 : 1, ease: [0.2, 0, 0, 1] }}
              />
            </div>
          </div>
        </div>

        {/* suggestions */}
        <div className="rounded-xl border border-rr-border-muted bg-rr-card p-5">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
            Priority suggestions
          </p>
          <ul className="space-y-2.5">
            {ANALYSIS.suggestions.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-[13px] text-rr-text-secondary">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rr-success/12">
                  <Check className="h-3 w-3 text-rr-success" aria-hidden />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* resume preview toggle */}
      <div className="rounded-xl border border-rr-border-muted bg-rr-card">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center gap-2 px-4 py-3 text-left text-[13px] font-medium text-rr-text transition-colors hover:bg-rr-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
        >
          <FileText className="h-4 w-4 text-rr-accent" aria-hidden />
          Preview resume with improvements
          <ChevronDown
            className={`ml-auto h-4 w-4 text-rr-text-muted transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: [0.2, 0, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-rr-border-muted px-4 py-3">
                <p className="mb-2 text-[11px] text-rr-text-muted">{ANALYSIS.resume.name}</p>
                <div className="space-y-1.5 font-mono text-[12px] leading-relaxed">
                  {ANALYSIS.resume.lines.map((line) => (
                    <p
                      key={line.text}
                      className={line.change ? LINE_STYLE[line.change] : "text-rr-text-secondary"}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
