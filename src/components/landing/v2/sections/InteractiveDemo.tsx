"use client";

import { SectionHeading } from "../shared/SectionHeading";
import { DemoBrowser } from "../demo/DemoBrowser";

export function InteractiveDemo() {
  return (
    <section id="demo" aria-labelledby="demo-h" className="bg-rr-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="flex flex-col items-center gap-3">
          <span className="glass-rr inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rr-text-secondary">
            Preview Workspace
          </span>
          <SectionHeading
            id="demo-h"
            title="See ResumeRocket in Action"
            intro="Explore a sample workspace. Every tab uses example data — it never represents a real customer."
          />
        </div>

        <div className="mt-12">
          <DemoBrowser />
        </div>
      </div>
    </section>
  );
}
