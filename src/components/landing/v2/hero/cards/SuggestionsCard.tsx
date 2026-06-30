"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { GlassCard } from "../GlassCard";
import { SUGGESTIONS_DEMO } from "../../hero-demo-data";

export function SuggestionsCard() {
  const reduce = useReducedMotion();
  return (
    <GlassCard className="w-56">
      <p className="text-xs font-semibold uppercase tracking-wide text-rr-text-muted">
        AI Suggestions
      </p>
      <ul className="mt-3 space-y-2">
        {SUGGESTIONS_DEMO.map((s, i) => (
          <motion.li
            key={s}
            className="flex items-center gap-2 text-sm text-rr-text"
            initial={reduce ? false : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: reduce ? 0 : i * 0.15 }}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rr-success/15 text-rr-success">
              <Check className="h-3 w-3" aria-hidden />
            </span>
            {s}
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}
