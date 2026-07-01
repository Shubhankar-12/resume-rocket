"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { captureEvent } from "@/lib/analytics/posthog";
import { AnnouncementBadge } from "./AnnouncementBadge";
import { FeatureChips } from "./FeatureChips";
import { HERO_HEADLINE, HERO_SUBCOPY } from "./hero-data";
import { heroStagger, heroItem } from "./motion";

/**
 * The top block: announcement, editorial headline, one supporting paragraph,
 * a dominant primary CTA + quiet secondary, and capability chips. Centered so
 * the browser below reads as the single focal point.
 */
export function HeroContent() {
  const reduce = useReducedMotion() ?? false;

  const onUpload = () =>
    captureEvent("hero_cta_clicked", { cta_label: "Upload Resume", cta_position: "hero" });
  const onDemo = () =>
    captureEvent("hero_cta_clicked", { cta_label: "Watch Interactive Demo", cta_position: "hero" });

  return (
    <motion.div
      variants={heroStagger(reduce)}
      initial="hidden"
      animate="show"
      className="mx-auto flex max-w-3xl flex-col items-center text-center"
    >
      <motion.div variants={heroItem(reduce)}>
        <AnnouncementBadge />
      </motion.div>

      <motion.h1
        id="hero-heading"
        variants={heroItem(reduce)}
        className="mt-6 font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-rr-text sm:text-[3.5rem] lg:text-[4.25rem]"
      >
        {HERO_HEADLINE.lead} <span className="text-rr-accent">{HERO_HEADLINE.accent}</span>{" "}
        {HERO_HEADLINE.trail}
      </motion.h1>

      <motion.p
        variants={heroItem(reduce)}
        className="mt-6 max-w-2xl text-base leading-relaxed text-rr-text-secondary sm:text-lg"
      >
        {HERO_SUBCOPY}
      </motion.p>

      <motion.div
        variants={heroItem(reduce)}
        className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
      >
        <Link
          href="/auth?next=/dashboard"
          onClick={onUpload}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-rr-accent px-7 text-base font-semibold text-white shadow-[0_10px_30px_-8px_hsl(243_78%_60%/0.55)] transition-all hover:bg-rr-accent-hover hover:shadow-[0_16px_36px_-10px_hsl(243_78%_60%/0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 sm:h-14 sm:w-auto"
        >
          Upload Resume
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <a
          href="#demo"
          onClick={onDemo}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-rr-border bg-rr-card px-6 text-base font-semibold text-rr-text transition-colors hover:bg-rr-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 sm:h-14 sm:w-auto"
        >
          <Play className="h-4 w-4 text-rr-accent" aria-hidden />
          Watch Interactive Demo
        </a>
      </motion.div>

      <motion.div variants={heroItem(reduce)} className="mt-8">
        <FeatureChips />
      </motion.div>
    </motion.div>
  );
}
