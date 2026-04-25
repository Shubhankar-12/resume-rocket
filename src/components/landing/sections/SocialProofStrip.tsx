// FABRICATED — replace before next paid acquisition push.
// Source data lives in src/components/landing/data/fabricated-proof.ts.
"use client";

import { Star } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { PROOF_STRIP } from "../data/fabricated-proof";

export function SocialProofStrip() {
  return (
    <SectionShell id="social-proof" labelledBy="social-proof-h" variant="light" className="!py-8">
      <h2 id="social-proof-h" className="sr-only">
        Social proof
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
        <span>
          Used by <strong className="text-foreground">{PROOF_STRIP.userCount}</strong> job seekers
        </span>
        <span aria-hidden>•</span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
          <strong className="text-foreground">{PROOF_STRIP.rating}</strong>
        </span>
        <span aria-hidden>•</span>
        <span>{PROOF_STRIP.feature}</span>
      </div>
    </SectionShell>
  );
}
