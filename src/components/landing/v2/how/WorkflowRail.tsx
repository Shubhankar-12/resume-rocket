"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { captureEvent } from "@/lib/analytics/posthog";
import { STAGES, HOW_EYEBROW, HOW_HEADLINE, HOW_SUBCOPY } from "./how-data";

/**
 * The sticky editorial rail: the pitch, plus a live tracker of the six stages
 * that highlights the one currently in view and links to each.
 */
export function WorkflowRail({ active }: { active: number }) {
  const onCta = () =>
    captureEvent("hero_cta_clicked", { cta_label: "Start with your resume", cta_position: "how" });

  return (
    <div className="lg:sticky lg:top-24">
      <p className="text-eyebrow uppercase text-rr-accent">{HOW_EYEBROW}</p>
      <h2
        id="how-h"
        className="mt-4 max-w-[15ch] font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-rr-text sm:text-4xl"
      >
        {HOW_HEADLINE}
      </h2>
      <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-rr-text-secondary">
        {HOW_SUBCOPY}
      </p>

      {/* live stage tracker — hidden on small screens where the journey itself leads */}
      <nav aria-label="Workflow stages" className="mt-8 hidden lg:block">
        <p className="mb-3 text-xs font-medium tabular-nums text-rr-text-muted">
          Step {String(active + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
        </p>
        <ol className="space-y-0.5">
          {STAGES.map((stage, i) => {
            const isActive = i === active;
            return (
              <li key={stage.key}>
                <a
                  href={`#how-${stage.key}`}
                  aria-current={isActive ? "step" : undefined}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent ${
                    isActive
                      ? "bg-rr-accent-light font-semibold text-rr-accent"
                      : "text-rr-text-muted hover:bg-rr-accent-light/50 hover:text-rr-text"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      isActive ? "bg-rr-accent text-white" : "bg-rr-border-muted text-rr-text-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {stage.name}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <Link
        href="/auth?next=/dashboard"
        onClick={onCta}
        className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-rr-accent px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_hsl(243_78%_60%/0.55)] transition-all hover:bg-rr-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2"
      >
        Start with your resume
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
