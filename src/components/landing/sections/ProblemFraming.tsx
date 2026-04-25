"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "../primitives/SectionShell";
import { EyebrowLabel } from "../primitives/EyebrowLabel";

const BEATS = [
  { stat: "6 seconds", label: "before a recruiter scans your resume" },
  { stat: "75% rejected", label: "by ATS bots before any human sees them" },
  { stat: "Most resumes look the same", label: "yours doesn't have to" },
];

export function ProblemFraming() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="problem" labelledBy="problem-h" variant="dark">
      <div>
        <EyebrowLabel tone="muted" className="text-white/70">
          The hiring funnel
        </EyebrowLabel>
        <h2
          id="problem-h"
          className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Your resume is being filtered before anyone reads it.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
          {BEATS.map((b, i) => (
            <motion.div
              key={b.stat}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-3xl font-bold text-[hsl(var(--brand-400))] md:text-5xl">
                {b.stat}
              </p>
              <p className="mt-3 text-base text-white/80 md:text-lg">{b.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
