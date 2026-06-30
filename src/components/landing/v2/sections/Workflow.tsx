"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { captureEvent } from "@/lib/analytics/posthog";
import { SectionHeading } from "../shared/SectionHeading";
import { WorkflowStep } from "../workflow/WorkflowStep";
import { WORKFLOW_STEPS } from "../part2-demo-data";

export function Workflow() {
  const onPrimary = () =>
    captureEvent("hero_cta_clicked", {
      cta_label: "Start Your First Resume Analysis",
      cta_position: "final",
    });

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-h"
      className="bg-rr-bg-elevated py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeading
          id="workflow-h"
          eyebrow="The Workflow"
          title="From Resume Upload to Interview Tracking"
          intro="Every step lives in one place — so your job search moves forward without juggling tools."
        />

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {WORKFLOW_STEPS.map((step, i) => (
            <WorkflowStep key={step.title} step={step} index={i} />
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/auth?next=/dashboard"
            onClick={onPrimary}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-rr-accent px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_hsl(243_78%_60%/0.6)] transition-all hover:bg-rr-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2"
          >
            Start Your First Resume Analysis <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#features"
            className="inline-flex h-12 items-center rounded-xl border border-rr-border px-6 text-sm font-semibold text-rr-text transition-colors hover:bg-rr-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
}
