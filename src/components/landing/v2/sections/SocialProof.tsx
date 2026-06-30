// FABRICATED — replace before next paid acquisition push.
// Source data lives in src/components/landing/data/fabricated-proof.ts.
"use client";

import { Star } from "lucide-react";
import { PROOF_STRIP } from "../../data/fabricated-proof";

export function SocialProof() {
  return (
    <section id="social-proof" aria-labelledby="social-proof-h" className="bg-rr-bg py-8">
      <h2 id="social-proof-h" className="sr-only">
        Social proof
      </h2>
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-rr-text-secondary md:px-8">
        <span>
          Used by <strong className="text-rr-text">{PROOF_STRIP.userCount}</strong> job seekers
        </span>
        <span aria-hidden className="text-rr-text-muted">
          •
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-4 w-4 fill-rr-warning text-rr-warning" aria-hidden />
          <strong className="text-rr-text">{PROOF_STRIP.rating}</strong>
        </span>
        <span aria-hidden className="text-rr-text-muted">
          •
        </span>
        <span>{PROOF_STRIP.feature}</span>
      </div>
    </section>
  );
}
