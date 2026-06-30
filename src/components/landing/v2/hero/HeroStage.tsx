"use client";

import { motion } from "framer-motion";
import { useParallax } from "./useParallax";
import { UploadCard } from "./cards/UploadCard";
import { ScoreCard } from "./cards/ScoreCard";
import { SuggestionsCard } from "./cards/SuggestionsCard";
import { CoverLetterCard } from "./cards/CoverLetterCard";
import { GitHubCard } from "./cards/GitHubCard";
import { TrackerCard } from "./cards/TrackerCard";

export function HeroStage() {
  const { x, y, bind } = useParallax(10);

  return (
    <div
      {...bind}
      className="relative mx-auto w-full max-w-[640px] md:h-[560px]"
      aria-label="Example product preview"
    >
      {/* decorative background orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-rr-accent/20 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-rr-info/15 blur-3xl" />
      </div>

      {/* Desktop: layered floating layout */}
      <motion.div style={{ x, y }} className="relative hidden h-full md:block">
        <div className="absolute left-0 top-6">
          <UploadCard />
        </div>
        <div className="absolute right-0 top-0">
          <ScoreCard />
        </div>
        <div className="absolute left-4 top-44">
          <SuggestionsCard />
        </div>
        <div className="absolute right-2 top-48">
          <CoverLetterCard />
        </div>
        <div className="absolute bottom-24 left-10">
          <GitHubCard />
        </div>
        <div className="absolute bottom-4 right-6">
          <TrackerCard />
        </div>
      </motion.div>

      {/* Mobile / tablet: horizontal swipe row */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden">
        {[
          <UploadCard key="u" />,
          <ScoreCard key="s" />,
          <SuggestionsCard key="g" />,
          <CoverLetterCard key="c" />,
          <GitHubCard key="h" />,
          <TrackerCard key="t" />,
        ].map((card, i) => (
          <div key={i} className="shrink-0 snap-center">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}
