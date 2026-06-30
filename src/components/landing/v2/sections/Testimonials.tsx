// FABRICATED — replace before next paid acquisition push.
// Source data lives in src/components/landing/data/fabricated-proof.ts.
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionHeading } from "../shared/SectionHeading";
import { TESTIMONIALS } from "../../data/fabricated-proof";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-h"
      className="bg-rr-bg-elevated py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeading
          id="testimonials-h"
          eyebrow="Early users"
          title="Built for engineers who actually ship"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.id} className="rounded-2xl border border-rr-border bg-rr-card p-6">
              <blockquote className="text-base leading-relaxed text-rr-text-secondary">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={t.avatarSrc} alt="" />
                  <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-rr-text">{t.name}</p>
                  <p className="text-xs text-rr-text-muted">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
