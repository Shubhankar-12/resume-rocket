"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { INTERVIEW } from "./hero-data";

/**
 * The single elevated glass widget, floating over the browser's lower-right
 * edge. Its gentle drift is the only continuous motion in the hero.
 */
export function InterviewCard() {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className="glass-rr absolute -bottom-5 right-4 flex items-center gap-3 rounded-xl p-3 shadow-lg sm:right-6"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.6 }}
    >
      <motion.span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-rr-accent/12 text-rr-accent"
        animate={reduce ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <CalendarClock className="h-4 w-4" aria-hidden />
      </motion.span>
      <div className="leading-tight">
        <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
          Upcoming interview
        </p>
        <p className="text-[13px] font-semibold text-rr-text">{INTERVIEW.role}</p>
        <p className="text-[11px] text-rr-text-secondary">
          {INTERVIEW.day} · {INTERVIEW.time}
        </p>
      </div>
    </motion.div>
  );
}
