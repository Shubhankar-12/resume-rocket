"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeepDivePreview } from "./DeepDivePreview";

export function DeepDiveFeature({
  feature,
  title,
  explanation,
  href,
  reverse,
}: {
  feature: string;
  title: string;
  explanation: string;
  href: string;
  reverse: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
    >
      <div className={cn(reverse && "md:order-2")}>
        <DeepDivePreview feature={feature} />
      </div>
      <div className={cn("max-w-[52ch]", reverse && "md:order-1")}>
        <h3 className="text-xl font-semibold tracking-[-0.01em] text-rr-text sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-rr-text-secondary">{explanation}</p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rr-accent hover:text-rr-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2"
        >
          Learn More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
