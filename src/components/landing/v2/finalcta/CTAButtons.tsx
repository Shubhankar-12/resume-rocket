"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { captureEvent } from "@/lib/analytics/posthog";

/**
 * The single obvious action (Upload Your Resume) with a quiet ghost secondary
 * (View Pricing). The primary is the most prominent element on the page's
 * closing beat; the secondary deliberately recedes.
 */
export function CTAButtons() {
  return (
    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Link
        href="/auth?next=/dashboard"
        onClick={() =>
          captureEvent("hero_cta_clicked", {
            cta_label: "Upload Your Resume",
            cta_position: "final",
          })
        }
        className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-rr-accent px-8 text-base font-semibold text-white shadow-[0_10px_30px_-12px_hsl(243_78%_60%/0.55)] transition-all duration-300 hover:bg-rr-accent-hover hover:shadow-[0_16px_40px_-12px_hsl(243_78%_60%/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 focus-visible:ring-offset-rr-bg sm:w-auto"
      >
        Upload Your Resume
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden
        />
      </Link>
      <a
        href="#pricing"
        className="inline-flex h-14 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold text-rr-text-secondary transition-colors hover:bg-rr-bg-elevated hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 focus-visible:ring-offset-rr-bg sm:w-auto"
      >
        View Pricing
      </a>
    </div>
  );
}
