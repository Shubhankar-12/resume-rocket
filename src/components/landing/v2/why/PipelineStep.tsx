"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { PipelineStage } from "./why-data";

/**
 * One stage in the hiring pipeline. Stages that filter applicants out carry an
 * amber node plus labelled drop-off reasons — the meaning is never colour alone.
 */
export function PipelineStep({ stage, reduce }: { stage: PipelineStage; reduce: boolean }) {
  const isFilter = stage.dropoffs.length > 0;

  return (
    <motion.li
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0, 0, 1] } },
      }}
      className="relative grid grid-cols-[20px_1fr] gap-x-4 pb-9 last:pb-0"
    >
      {/* node on the spine */}
      <span
        className={`relative z-10 mt-1 h-3 w-3 justify-self-center rounded-full ring-4 ring-rr-bg ${
          isFilter ? "bg-rr-warning" : "bg-rr-accent"
        }`}
        aria-hidden
      />

      <div>
        <p className="text-sm font-semibold text-rr-text">{stage.label}</p>
        <p className="mt-0.5 text-sm text-rr-text-secondary">{stage.desc}</p>

        {isFilter && (
          <ul
            className="mt-3 space-y-1.5"
            aria-label={`Where applications drop off at ${stage.label}`}
          >
            {stage.dropoffs.map((d) => (
              <li key={d} className="flex items-center gap-2 text-xs text-rr-text-muted">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rr-warning" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
}
