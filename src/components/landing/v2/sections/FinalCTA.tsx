"use client";

import Link from "next/link";
import { ArrowRight, FileText, BarChart3, Wand2, Send } from "lucide-react";
import { captureEvent } from "@/lib/analytics/posthog";

const CHIPS = [
  "Resume Analysis",
  "ATS Optimization",
  "Cover Letters",
  "GitHub Analysis",
  "Application Tracker",
];

const FLOW = [
  { icon: FileText, label: "Resume" },
  { icon: BarChart3, label: "Analysis" },
  { icon: Wand2, label: "Improvement" },
  { icon: Send, label: "Application" },
];

export function FinalCTA() {
  const onPrimary = () =>
    captureEvent("hero_cta_clicked", { cta_label: "Upload Your Resume", cta_position: "final" });

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-h"
      className="relative overflow-hidden bg-rr-bg py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--rr-accent)/0.12),transparent),radial-gradient(50%_50%_at_100%_100%,hsl(var(--rr-info)/0.10),transparent)]"
      />
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="glass-rr mx-auto max-w-3xl rounded-3xl p-8 text-center md:p-12">
          <h2
            id="final-cta-h"
            className="text-3xl font-bold tracking-[-0.02em] text-rr-text sm:text-4xl"
          >
            Build Stronger Job Applications With AI
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-rr-text-secondary sm:text-lg">
            Upload your resume, receive actionable feedback, tailor it for your next opportunity,
            and manage your applications from one workspace.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth?next=/dashboard"
              onClick={onPrimary}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-rr-accent px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_hsl(243_78%_60%/0.6)] transition-all hover:bg-rr-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2"
            >
              Upload Your Resume <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#pricing"
              className="inline-flex h-12 items-center rounded-xl border border-rr-border px-6 text-sm font-semibold text-rr-text transition-colors hover:bg-rr-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
            >
              Explore Pricing
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Capabilities">
            {CHIPS.map((c) => (
              <li
                key={c}
                className="rounded-full border border-rr-border bg-rr-card px-3 py-1.5 text-xs font-medium text-rr-text-secondary"
              >
                {c}
              </li>
            ))}
          </ul>

          <div
            className="mt-8 flex items-center justify-center gap-2 text-rr-text-muted"
            aria-hidden
          >
            {FLOW.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-rr-bg-elevated px-2.5 py-1.5 text-xs">
                  <step.icon className="h-3.5 w-3.5 text-rr-accent" />
                  {step.label}
                </span>
                {i < FLOW.length - 1 && <ArrowRight className="h-3.5 w-3.5" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
