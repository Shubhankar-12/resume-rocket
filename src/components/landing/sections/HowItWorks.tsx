"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "../primitives/SectionShell";
import { EyebrowLabel } from "../primitives/EyebrowLabel";

const STEPS = [
  {
    n: 1,
    title: "Upload your resume",
    body: "PDF or DOCX. We extract the structure automatically — no formatting required.",
  },
  {
    n: 2,
    title: "Get an instant grade",
    body: "Score, ATS check, and line-by-line feedback in 30 seconds.",
  },
  {
    n: 3,
    title: "Tailor for any role",
    body: "Paste a job description. Get a rewritten version that matches without making things up.",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();
  return (
    <SectionShell id="how" labelledBy="how-h" variant="light">
      <div className="text-center">
        <EyebrowLabel>How it works</EyebrowLabel>
        <h2 id="how-h" className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          From upload to interview-ready in three steps.
        </h2>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-12">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-xl border border-border p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--brand-50))] font-bold text-[hsl(var(--brand-600))]">
              {s.n}
            </div>
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-base text-[hsl(var(--ink-700))]">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
