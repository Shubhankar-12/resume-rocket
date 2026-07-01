"use client";

import { SectionHeading } from "../shared/SectionHeading";
import { DemoBrowser } from "../demo/DemoBrowser";

export function InteractiveDemo() {
  return (
    <section
      id="demo"
      aria-labelledby="demo-h"
      className="relative overflow-hidden bg-rr-bg py-20 md:py-28"
    >
      {/* subtle mesh behind the browser */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-[36rem] max-w-[1100px] bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--rr-accent)/0.08),transparent),radial-gradient(50%_50%_at_80%_20%,hsl(var(--rr-info)/0.06),transparent)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="glass-rr inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rr-text-secondary">
            Preview Workspace
          </span>
          <SectionHeading
            id="demo-h"
            title="Interactive Product Tour"
            intro="Everything below uses demonstration data to show the product experience. Explore how ResumeRocket analyzes resumes, tailors applications, generates cover letters, and keeps your job search organized."
          />
        </div>

        <div className="mt-12">
          <DemoBrowser />
        </div>
      </div>
    </section>
  );
}
