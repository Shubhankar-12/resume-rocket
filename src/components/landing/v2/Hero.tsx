"use client";

import { HeroContent } from "./hero/HeroContent";
import { HeroStage } from "./hero/HeroStage";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero" className="relative overflow-hidden bg-rr-bg">
      {/* page-level mesh wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_0%,hsl(var(--rr-accent)/0.10),transparent),radial-gradient(50%_50%_at_100%_20%,hsl(var(--rr-info)/0.08),transparent)]"
      />
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 py-16 md:grid-cols-[45fr_55fr] md:gap-8 md:px-8 md:py-24">
        <HeroContent />
        <HeroStage />
      </div>
    </section>
  );
}
