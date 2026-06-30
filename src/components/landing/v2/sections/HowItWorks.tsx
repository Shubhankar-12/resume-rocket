"use client";

import { SectionHeading } from "../shared/SectionHeading";
import { TimelineStep } from "../how/TimelineStep";
import { HOW_STEPS } from "../part2-demo-data";

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-h" className="bg-rr-bg-elevated py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeading
          id="how-h"
          eyebrow="How It Works"
          title="One Workspace for Your Entire Job Search"
          intro="ResumeRocket combines resume analysis, AI-powered writing, GitHub project enhancement, and application tracking into a single workflow."
        />

        <div className="relative mt-14">
          {/* decorative timeline rail (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-9 hidden border-t border-dashed border-rr-border lg:block"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {HOW_STEPS.map((step, i) => (
              <li key={step.n}>
                <TimelineStep step={step} index={i} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
