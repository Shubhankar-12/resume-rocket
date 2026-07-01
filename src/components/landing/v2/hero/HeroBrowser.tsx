"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock } from "lucide-react";
import { HeroSidebar } from "./HeroSidebar";
import { HeroDashboard } from "./HeroDashboard";
import { InterviewCard } from "./InterviewCard";
import { AmbientCursor } from "./AmbientCursor";
import { browserRise } from "./motion";

/**
 * The hero centerpiece: one realistic application window. Rises into view on
 * load, then plays quiet scripted micro-animations inside. Read by assistive
 * tech as a single labelled image.
 */
export function HeroBrowser() {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.figure
      variants={browserRise(reduce)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative mx-auto w-full max-w-[1120px]"
    >
      <div
        role="img"
        aria-label="Preview of the ResumeRocket dashboard for an example workspace: an A-minus resume score, 87 percent ATS score, 82 percent keyword match, improvement suggestions, recent activity, and an application pipeline."
        className="overflow-hidden rounded-2xl border border-rr-border bg-rr-card shadow-xl ring-1 ring-rr-text/5"
      >
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-rr-border-muted bg-rr-card px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-1.5 rounded-md bg-rr-bg-elevated px-3 py-1 text-[11px] text-rr-text-muted">
            <Lock className="h-3 w-3" aria-hidden />
            app.resumerocket.ai/dashboard
          </div>
          <div className="hidden w-12 sm:block" aria-hidden />
        </div>

        {/* app body */}
        <div className="grid lg:grid-cols-[212px_1fr]">
          <HeroSidebar />
          <HeroDashboard />
        </div>
      </div>

      <InterviewCard />
      <AmbientCursor />
    </motion.figure>
  );
}
