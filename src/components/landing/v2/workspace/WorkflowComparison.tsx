"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { TRADITIONAL, RESUMEROCKET } from "./workspace-data";

const container = (reduce: boolean): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
});
const item = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0, 0, 1] } },
});

export function WorkflowComparison() {
  const reduce = useReducedMotion() ?? false;
  const [hover, setHover] = useState<"trad" | "rr" | null>(null);

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-rr-border">
      {/* Traditional — long, fragmented, muted */}
      <motion.div
        onMouseEnter={() => setHover("trad")}
        onMouseLeave={() => setHover(null)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container(reduce)}
        className={`transition-opacity md:pr-10 ${hover === "rr" ? "opacity-50" : "opacity-100"}`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-rr-text-muted">
          {TRADITIONAL.title}
        </p>
        <ol className="mt-4">
          {TRADITIONAL.steps.map((step, i) => (
            <motion.li key={step} variants={item(reduce)}>
              <div className="rounded-lg border border-dashed border-rr-border-muted px-3 py-2 text-[13px] text-rr-text-muted">
                {step}
              </div>
              {i < TRADITIONAL.steps.length - 1 && (
                <div className="flex justify-center py-1" aria-hidden>
                  <ChevronDown className="h-3.5 w-3.5 text-rr-text-muted/60" />
                </div>
              )}
            </motion.li>
          ))}
        </ol>
        <p className="mt-4 text-[12px] font-medium text-rr-text-muted">{TRADITIONAL.summary}</p>
      </motion.div>

      {/* ResumeRocket — one connected flow */}
      <motion.div
        onMouseEnter={() => setHover("rr")}
        onMouseLeave={() => setHover(null)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container(reduce)}
        className={`transition-opacity md:pl-10 ${hover === "trad" ? "opacity-50" : "opacity-100"}`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-rr-accent">
          {RESUMEROCKET.title}
        </p>
        <ol className="relative mt-4">
          {/* connected accent spine */}
          <span className="absolute bottom-3 left-[7px] top-3 w-px bg-rr-accent/30" aria-hidden />
          {RESUMEROCKET.steps.map((step, i) => {
            const last = i === RESUMEROCKET.steps.length - 1;
            return (
              <motion.li
                key={step}
                variants={item(reduce)}
                className="relative flex items-center gap-3 py-1.5"
              >
                <span
                  className={`z-10 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${
                    last ? "bg-rr-accent" : "bg-rr-card ring-2 ring-rr-accent"
                  }`}
                  aria-hidden
                >
                  {last && <Check className="h-2.5 w-2.5 text-white" />}
                </span>
                <span
                  className={`text-[13px] ${last ? "font-semibold text-rr-accent" : "text-rr-text"}`}
                >
                  {step}
                </span>
              </motion.li>
            );
          })}
        </ol>
        <p className="mt-4 text-[12px] font-medium text-rr-accent">{RESUMEROCKET.summary}</p>
      </motion.div>
    </div>
  );
}
