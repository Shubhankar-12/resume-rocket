"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { PIPELINE_NODES } from "../part2-demo-data";

export function PipelineDiagram() {
  const reduce = useReducedMotion();
  return (
    <ul className="space-y-0" aria-label="Hiring pipeline and where candidates drop off">
      {PIPELINE_NODES.map((node, i) => (
        <li key={node.label}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.08 }}
            className="rounded-xl border border-rr-border bg-rr-card px-4 py-3"
          >
            <p className="text-sm font-semibold text-rr-text">{node.label}</p>
            {node.reject && (
              <p className="mt-1 flex items-start gap-1.5 text-xs text-rr-text-muted">
                <AlertTriangle
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rr-warning"
                  aria-hidden
                />
                {node.reject}
              </p>
            )}
          </motion.div>
          {i < PIPELINE_NODES.length - 1 && (
            <div className="flex justify-center py-1.5" aria-hidden>
              <ChevronDown className="h-4 w-4 text-rr-text-muted" />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
