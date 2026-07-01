"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MetricCard, ScoreRing, StatMeter } from "./HeroWidgets";
import { SuggestionsPanel, ActivityPanel } from "./HeroPanels";
import { SCORE, WORKSPACE } from "./hero-data";
import { heroStagger, heroItem } from "./motion";

/**
 * Mobile-first retelling of the dashboard — not a shrunk browser. The same data
 * as native stacked cards, ordered by importance: score, then ATS/keyword,
 * then suggestions and activity.
 */
export function HeroMobileStack() {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      variants={heroStagger(reduce)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto flex w-full max-w-md flex-col gap-3 md:hidden"
    >
      <motion.div
        variants={heroItem(reduce)}
        className="flex items-center gap-4 rounded-xl border border-rr-border-muted bg-rr-card p-4 shadow-sm"
      >
        <ScoreRing
          pct={0.9}
          tone="accent"
          size={72}
          center={<span className="text-lg font-bold text-rr-text">{SCORE.grade}</span>}
        />
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
            Resume score
          </p>
          <p className="text-sm font-semibold text-rr-text">Overall grade</p>
          <p className="text-xs text-rr-text-muted">{WORKSPACE.workspace}</p>
        </div>
      </motion.div>

      <motion.div variants={heroItem(reduce)} className="grid grid-cols-2 gap-3">
        <MetricCard label="ATS Score">
          <StatMeter value={SCORE.ats} tone="success" caption="Compatible" />
        </MetricCard>
        <MetricCard label="Keyword Match">
          <StatMeter value={SCORE.keyword} tone="info" caption="Strong" />
        </MetricCard>
      </motion.div>

      <motion.div variants={heroItem(reduce)}>
        <SuggestionsPanel />
      </motion.div>

      <motion.div variants={heroItem(reduce)}>
        <ActivityPanel />
      </motion.div>
    </motion.div>
  );
}
