"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FileText } from "lucide-react";
import { PipelineStep } from "./PipelineStep";
import { PIPELINE_STAGES, PIPELINE_CAPTION } from "./why-data";

/**
 * The signature visual: a vertical hiring pipeline. As the reader scrolls, the
 * spine draws in and a resume token travels down through each stage. Stages
 * fade in on entry. Everything resolves to a full, static state under reduced
 * motion.
 */
export function HiringPipeline() {
  const reduce = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const tokenTop = useTransform(scrollYProgress, [0, 1], ["0%", "92%"]);

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.06em] text-rr-text-muted">
        {PIPELINE_CAPTION}
      </p>

      <div ref={trackRef} className="relative mt-6">
        {/* spine track */}
        <span aria-hidden className="absolute bottom-10 left-[9px] top-1.5 w-px bg-rr-border" />
        {/* drawn progress line */}
        <motion.span
          aria-hidden
          className="absolute bottom-10 left-[9px] top-1.5 w-px origin-top bg-rr-accent"
          style={{ scaleY: reduce ? 1 : lineScale }}
        />
        {/* resume token descending through the stages */}
        {!reduce && (
          <motion.span
            aria-hidden
            style={{ top: tokenTop }}
            className="absolute left-[1px] z-20 flex h-6 w-[18px] items-center justify-center rounded-[5px] border border-rr-accent/40 bg-rr-card shadow-sm"
          >
            <FileText className="h-3 w-3 text-rr-accent" />
          </motion.span>
        )}

        <motion.ol
          aria-label="Stages of the hiring pipeline"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.14 } } }}
        >
          {PIPELINE_STAGES.map((stage) => (
            <PipelineStep key={stage.key} stage={stage} reduce={reduce} />
          ))}
        </motion.ol>
      </div>
    </div>
  );
}
