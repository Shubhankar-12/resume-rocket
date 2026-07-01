"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Stage } from "./how-data";

/**
 * One stage of the journey: a numbered node on the flow line, a connector
 * segment that fills once the stage is passed, and the product preview panel.
 * Reports itself as active when it scrolls near the viewport centre.
 */
export function WorkflowStage({
  stage,
  index,
  active,
  isLast,
  onEnter,
  children,
}: {
  stage: Stage;
  index: number;
  active: number;
  isLast: boolean;
  onEnter: (index: number) => void;
  children: ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onEnter(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onEnter]);

  const passed = index <= active;

  return (
    <li
      ref={ref}
      id={`how-${stage.key}`}
      className="grid scroll-mt-28 grid-cols-[32px_1fr] gap-x-4 sm:gap-x-6"
    >
      {/* node + connector */}
      <div className="relative flex flex-col items-center" aria-hidden>
        <span
          className={`z-10 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold ring-4 ring-rr-bg-elevated transition-colors duration-500 ${
            passed
              ? "bg-rr-accent text-white"
              : "bg-rr-card text-rr-text-muted shadow-[inset_0_0_0_1px_hsl(var(--rr-border))]"
          }`}
        >
          {index + 1}
        </span>
        {!isLast && (
          <span className="relative mt-2 w-px flex-1 bg-rr-border">
            <motion.span
              className="absolute inset-0 origin-top bg-rr-accent"
              initial={{ scaleY: reduce ? (index < active ? 1 : 0) : 0 }}
              animate={{ scaleY: index < active ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: [0.2, 0, 0, 1] }}
            />
          </span>
        )}
      </div>

      {/* panel */}
      <motion.div
        className="pb-10"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.2, 0, 0, 1] }}
      >
        <h3 className="text-base font-semibold text-rr-text">{stage.name}</h3>
        <p className="mb-3 mt-0.5 text-sm text-rr-text-secondary">{stage.caption}</p>
        {children}
      </motion.div>
    </li>
  );
}
