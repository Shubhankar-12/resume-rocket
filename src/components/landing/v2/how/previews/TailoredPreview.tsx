"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Target } from "lucide-react";

const ADDED_SKILLS = ["Docker", "GraphQL", "Accessibility"];

/** Stage 4 — a before/after diff that tailors the resume to a target role. */
export function TailoredPreview() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="rounded-xl border border-rr-border-muted bg-rr-card p-4 shadow-xs">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rr-accent-light px-2.5 py-1 text-[11px] font-medium text-rr-accent">
        <Target className="h-3.5 w-3.5" aria-hidden />
        Tailoring for: Senior Frontend Engineer
      </span>

      <div className="mt-3 space-y-2 font-mono text-[12px] leading-snug">
        <div className="flex gap-2 rounded-md bg-rr-danger/[0.06] px-2.5 py-1.5">
          <span className="select-none font-semibold text-rr-danger" aria-hidden>
            −
          </span>
          <span className="text-rr-text-muted line-through decoration-rr-danger/50">
            Frontend developer with experience building web apps.
          </span>
        </div>
        <motion.div
          className="flex gap-2 rounded-md bg-rr-success/[0.08] px-2.5 py-1.5"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: reduce ? 0 : 0.35, duration: 0.4 }}
        >
          <span className="select-none font-semibold text-rr-success" aria-hidden>
            +
          </span>
          <span className="text-rr-text">
            Senior Frontend Engineer with 5 years shipping accessible, performant React apps.
          </span>
        </motion.div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-rr-border-muted pt-3">
        <span className="text-[11px] font-medium text-rr-text-muted">Skills added</span>
        {ADDED_SKILLS.map((skill, i) => (
          <motion.span
            key={skill}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: reduce ? 0 : 0.6 + i * 0.1, duration: 0.25 }}
            className="rounded-full bg-rr-success/10 px-2 py-0.5 text-[11px] font-medium text-rr-success"
          >
            + {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
