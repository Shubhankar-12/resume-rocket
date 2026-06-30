"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
  floatDelay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  floatDelay?: number;
}) {
  const reduce = useReducedMotion();
  const float = reduce
    ? undefined
    : {
        y: [0, -6, 0],
        transition: {
          duration: 6,
          ease: "easeInOut" as const,
          repeat: Infinity,
          delay: floatDelay,
        },
      };

  return (
    <motion.div
      animate={float}
      className={cn(
        "glass-rr rounded-2xl p-4 shadow-[0_12px_28px_-6px_hsl(240_24%_10%/0.12)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
