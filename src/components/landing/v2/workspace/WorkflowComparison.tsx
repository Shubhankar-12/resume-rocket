"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { TRADITIONAL, RESUMEROCKET } from "./workspace-data";

const container = (reduce: boolean): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
});
const item = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0, 0, 1] } },
});

/** A "Copy…" step is pure handoff overhead — flag it so it reads as wasted effort. */
const isHandoff = (step: string) => /^copy/i.test(step);

export function WorkflowComparison() {
  const reduce = useReducedMotion() ?? false;
  const [hover, setHover] = useState<"trad" | "rr" | null>(null);

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-rr-border">
      {/* Traditional — a broken, fragmented spine */}
      <motion.div
        onMouseEnter={() => setHover("trad")}
        onMouseLeave={() => setHover(null)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container(reduce)}
        className={`transition-opacity duration-300 md:pr-10 ${
          hover === "rr" ? "opacity-40" : "opacity-100"
        }`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-rr-text-muted">
          {TRADITIONAL.title}
        </p>

        <ol className="relative mt-5">
          {TRADITIONAL.steps.map((step, i) => {
            const last = i === TRADITIONAL.steps.length - 1;
            const handoff = isHandoff(step);
            return (
              <motion.li
                key={step}
                variants={item(reduce)}
                className="relative flex h-11 items-center gap-3.5"
              >
                {/* broken connector: gaps above and below each node */}
                {!last && (
                  <span
                    aria-hidden
                    className="absolute left-[6px] top-[calc(50%+11px)] h-[calc(100%-22px)] border-l border-dashed border-rr-border-muted"
                  />
                )}
                {/* node — hollow, unfinished */}
                <span
                  aria-hidden
                  className={`z-10 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${
                    handoff ? "text-rr-text-muted" : "border border-rr-border-muted bg-rr-bg"
                  }`}
                >
                  {handoff && <Copy className="h-3 w-3" />}
                </span>
                <span
                  className={`text-[13px] leading-tight ${
                    handoff ? "italic text-rr-text-muted/70" : "text-rr-text-muted"
                  }`}
                >
                  {step}
                </span>
              </motion.li>
            );
          })}
        </ol>

        <p className="mt-5 pl-[30px] text-[12px] font-medium text-rr-text-muted">
          {TRADITIONAL.summary}
        </p>
      </motion.div>

      {/* ResumeRocket — one unbroken flow */}
      <motion.div
        onMouseEnter={() => setHover("rr")}
        onMouseLeave={() => setHover(null)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container(reduce)}
        className={`transition-opacity duration-300 md:pl-10 ${
          hover === "trad" ? "opacity-40" : "opacity-100"
        }`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-rr-accent">
          {RESUMEROCKET.title}
        </p>

        <ol className="relative mt-5">
          {/* single continuous accent spine */}
          <span
            aria-hidden
            className="absolute bottom-5 left-[6px] top-5 w-px bg-gradient-to-b from-rr-accent/40 via-rr-accent/60 to-rr-accent"
          />
          {RESUMEROCKET.steps.map((step, i) => {
            const last = i === RESUMEROCKET.steps.length - 1;
            return (
              <motion.li
                key={step}
                variants={item(reduce)}
                className="relative flex h-11 items-center gap-3.5"
              >
                <span
                  aria-hidden
                  className={`z-10 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${
                    last ? "bg-rr-accent" : "bg-rr-bg ring-2 ring-rr-accent"
                  }`}
                >
                  {last && <Check className="h-2.5 w-2.5 text-white" />}
                </span>
                <span
                  className={`text-[13px] leading-tight ${
                    last ? "font-semibold text-rr-accent" : "text-rr-text"
                  }`}
                >
                  {step}
                </span>
              </motion.li>
            );
          })}
        </ol>

        <p className="mt-5 pl-[30px] text-[12px] font-medium text-rr-accent">
          {RESUMEROCKET.summary}
        </p>
      </motion.div>
    </div>
  );
}
