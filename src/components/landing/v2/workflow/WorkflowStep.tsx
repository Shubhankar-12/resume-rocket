"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ICONS } from "../shared/iconMap";
import type { WORKFLOW_STEPS } from "../part2-demo-data";

type Step = (typeof WORKFLOW_STEPS)[number];

export function WorkflowStep({ step, index }: { step: Step; index: number }) {
  const reduce = useReducedMotion();
  const Icon = ICONS[step.icon];
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: reduce ? 0 : index * 0.06 }}
      className="flex flex-col items-center rounded-2xl border border-rr-border bg-rr-card p-4 text-center"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rr-accent-light text-rr-accent">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-3 text-sm font-semibold text-rr-text">{step.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-rr-text-secondary">{step.note}</p>
    </motion.li>
  );
}
