"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ConnectorLine({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const horizontal = orientation === "horizontal";

  return (
    <svg
      aria-hidden
      className={cn("overflow-visible text-rr-border", className)}
      width={horizontal ? "100%" : 2}
      height={horizontal ? 2 : "100%"}
      preserveAspectRatio="none"
    >
      <motion.line
        x1={0}
        y1={0}
        x2={horizontal ? "100%" : 0}
        y2={horizontal ? 0 : "100%"}
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="4 4"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.6, ease: "easeInOut" }}
      />
    </svg>
  );
}
