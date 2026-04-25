// FABRICATED — replace before next paid acquisition push.
// Source data lives in src/components/landing/data/fabricated-proof.ts.
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionShell } from "../primitives/SectionShell";
import { EyebrowLabel } from "../primitives/EyebrowLabel";
import { TESTIMONIALS } from "../data/fabricated-proof";

export function Testimonials() {
  return (
    <SectionShell id="testimonials" labelledBy="testimonials-h" variant="dark">
      <div className="text-center">
        <EyebrowLabel tone="muted" className="text-white/70">
          Early users
        </EyebrowLabel>
        <h2 id="testimonials-h" className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Built for engineers who actually ship.
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.id}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <blockquote className="text-base leading-relaxed text-white/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={t.avatarSrc} alt="" />
                <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-white/60">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
