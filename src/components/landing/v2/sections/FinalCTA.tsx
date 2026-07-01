"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTAButtons } from "../finalcta/CTAButtons";
import { TrustNotes } from "../finalcta/TrustNotes";
import { WorkflowStrip } from "../finalcta/WorkflowStrip";

/** Static mesh atmosphere — large blurred orbs + faint grain, nothing looping. */
function ClosingBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_35%,hsl(var(--rr-accent)/0.10),transparent)]" />
      <div className="absolute -left-24 top-1/4 h-[32rem] w-[32rem] rounded-full bg-rr-accent/10 blur-3xl" />
      <div className="absolute -right-28 bottom-0 h-[30rem] w-[30rem] rounded-full bg-rr-info/10 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export function FinalCTA() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-h"
      className="relative overflow-hidden bg-rr-bg py-24 md:py-36"
    >
      <ClosingBackground />

      <div className="mx-auto max-w-[820px] px-4 md:px-8">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.2, 0, 0, 1] }}
          className="glass-rr rounded-[28px] px-6 py-12 text-center shadow-[0_28px_70px_-32px_hsl(240_24%_10%/0.28)] sm:px-12 md:py-16"
        >
          <h2
            id="final-cta-h"
            className="mx-auto max-w-[16ch] font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] text-rr-text sm:text-5xl lg:text-[3.25rem]"
          >
            Build better job applications.
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-base leading-relaxed text-rr-text-secondary sm:text-lg">
            Upload your resume to receive actionable feedback, tailor it for specific roles,
            generate personalized cover letters, and organize your entire job search from one
            workspace.
          </p>

          <CTAButtons />
          <TrustNotes />
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.25 }}
        >
          <WorkflowStrip />
        </motion.div>
      </div>
    </section>
  );
}
