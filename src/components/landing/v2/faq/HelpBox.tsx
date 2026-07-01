"use client";

import Link from "next/link";
import { MessageCircle, BookOpen } from "lucide-react";

/**
 * Closing "still stuck?" panel. Contact is a real route; Documentation is
 * intentionally inert and labelled "Coming soon" — no clickable promise.
 */
export function HelpBox() {
  return (
    <div className="mt-16 rounded-2xl border border-rr-border bg-rr-card px-6 py-10 text-center md:mt-20">
      <h3 className="font-display text-xl font-semibold text-rr-text sm:text-2xl">
        Still have questions?
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-rr-text-secondary">
        Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll help you get started.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/contact-us"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rr-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-rr-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 focus-visible:ring-offset-rr-card"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Contact Us
        </Link>
        <span
          aria-disabled
          title="Coming soon"
          className="inline-flex h-11 cursor-default items-center justify-center gap-2 rounded-xl border border-rr-border px-5 text-sm font-semibold text-rr-text-muted"
        >
          <BookOpen className="h-4 w-4" aria-hidden />
          Documentation
          <span className="rounded-full bg-rr-bg px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
            Coming soon
          </span>
        </span>
      </div>
    </div>
  );
}
