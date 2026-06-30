"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { captureEvent } from "@/lib/analytics/posthog";
import { AnnouncementPill } from "./AnnouncementPill";
import { FEATURE_CHIPS, TRUST_NOTES } from "../hero-demo-data";

export function HeroContent() {
  const onPrimary = () =>
    captureEvent("hero_cta_clicked", { cta_label: "Upload Resume", cta_position: "hero" });

  return (
    <div className="flex flex-col items-start">
      <AnnouncementPill />

      <h1 className="mt-6 max-w-[14ch] text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-rr-text sm:text-5xl lg:text-6xl">
        Land more interviews with a better resume
      </h1>

      <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-rr-text-secondary sm:text-lg">
        Upload your resume to get ATS analysis, recruiter-focused feedback, personalized tailoring,
        AI cover letters, GitHub project analysis, and application tracking — all from one
        workspace.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/auth?next=/dashboard"
          onClick={onPrimary}
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-rr-accent px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_hsl(243_78%_60%/0.6)] transition-all hover:bg-rr-accent-hover hover:shadow-[0_12px_28px_-8px_hsl(243_78%_60%/0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2"
        >
          Upload Resume <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="#how"
          className="inline-flex h-12 items-center rounded-xl border border-rr-border px-6 text-sm font-semibold text-rr-text transition-colors hover:bg-rr-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
        >
          See How It Works
        </a>
      </div>

      <ul className="mt-7 flex flex-wrap gap-2" aria-label="Capabilities">
        {FEATURE_CHIPS.map((c) => (
          <li
            key={c}
            className="inline-flex items-center gap-1.5 rounded-full border border-rr-border bg-rr-card px-3 py-1.5 text-xs font-medium text-rr-text-secondary"
          >
            <Check className="h-3.5 w-3.5 text-rr-success" aria-hidden />
            {c}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs text-rr-text-muted">{TRUST_NOTES.join("  ·  ")}</p>
    </div>
  );
}
