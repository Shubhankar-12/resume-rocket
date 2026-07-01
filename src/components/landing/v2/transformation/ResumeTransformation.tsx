"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { OriginalResume } from "./OriginalResume";
import { ImprovedResume } from "./ImprovedResume";
import { ImprovementSidebar } from "./ImprovementSidebar";
import { HEADING, type SectionKey } from "./transformation-data";

/**
 * "See what changes" — a large before/after resume comparison that visualises
 * improvement rather than advertising AI. The two papers dominate; a slim
 * checklist explains the edits and stays linked to them on hover. Everything
 * shown is demonstration data (labelled Example / Preview). Sits directly after
 * the "Everything in one workspace" section.
 */
export function ResumeTransformation() {
  const reduce = useReducedMotion() ?? false;
  // Shared spotlight: hovering a resume section or a checklist line links the two.
  const [active, setActive] = useState<SectionKey | null>(null);

  return (
    <section
      id="transformation"
      aria-labelledby="tf-h"
      className="bg-rr-bg-elevated py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {/* editorial heading */}
        <div className="max-w-2xl">
          <p className="text-eyebrow uppercase text-rr-accent">{HEADING.eyebrow}</p>
          <h2
            id="tf-h"
            className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-rr-text sm:text-4xl lg:text-[2.75rem]"
          >
            {HEADING.titleLead}
            <br />
            <span className="text-rr-accent">{HEADING.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-rr-text-secondary">
            {HEADING.intro}
          </p>
        </div>

        {/* comparison — resumes dominate; sidebar is a slim rail */}
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          {/* two papers, side by side on desktop, stacked on mobile */}
          <div className="relative grid gap-6 md:grid-cols-2 md:gap-8">
            <OriginalResume />

            {/* mobile-only flow marker between the stacked papers */}
            <div className="flex items-center justify-center md:hidden" aria-hidden>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rr-border bg-rr-card text-rr-accent shadow-sm">
                <ArrowDown className="h-4 w-4" />
              </span>
            </div>

            <ImprovedResume active={active} onSectionHover={setActive} />

            {/* desktop flow marker bridging original → improved */}
            <motion.span
              aria-hidden
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.5 }}
              className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-rr-border bg-rr-card text-rr-accent shadow-lg md:flex"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </div>

          <ImprovementSidebar active={active} onItemHover={setActive} />
        </div>
      </div>
    </section>
  );
}

export default ResumeTransformation;
