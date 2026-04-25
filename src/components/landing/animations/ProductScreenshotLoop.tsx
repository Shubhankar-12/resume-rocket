"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const FRAMES = [
  { src: "/grader.png", alt: "Upload your resume" },
  { src: "/dashboard.png", alt: "Get a score and detailed report" },
  { src: "/cover-letter.png", alt: "Generate tailored versions" },
];

const FRAME_MS = 4000;

export function ProductScreenshotLoop() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FRAMES.length);
    }, FRAME_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
      aria-label="Product demo loop"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={FRAMES[index].src}
            alt={FRAMES[index].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {FRAMES.map((_, i) => (
          <span
            key={i}
            aria-hidden
            className={`h-1.5 w-6 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
