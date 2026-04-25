"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "../primitives/SectionShell";
import { ProductScreenshotLoop } from "../animations/ProductScreenshotLoop";
import { captureEvent } from "@/lib/analytics/posthog";

export function Hero() {
  const reduce = useReducedMotion();
  const onPrimary = () =>
    captureEvent("hero_cta_clicked", { cta_label: "Start free", cta_position: "hero" });
  const onSecondary = () =>
    captureEvent("hero_cta_clicked", { cta_label: "See demo", cta_position: "hero" });

  const initial = reduce ? false : { opacity: 0, y: 12 };
  const animate = reduce ? undefined : { opacity: 1, y: 0 };

  return (
    <SectionShell id="hero" labelledBy="hero-h" variant="lightTinted" className="pt-12 md:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <motion.div initial={initial} animate={animate} transition={{ duration: 0.5 }}>
          <h1 id="hero-h" className="text-5xl font-bold tracking-tight md:text-7xl">
            Land more interviews.{" "}
            <span className="text-[hsl(var(--brand-600))]">Beat the ATS in 30 seconds.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[hsl(var(--ink-700))] md:text-xl">
            Grade your resume against what real recruiters and applicant-tracking systems actually
            look for. Tailor it for any role. Generate cover letters that don&apos;t sound like AI.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild onClick={onPrimary}>
              <Link href="/auth?next=/dashboard" className="gap-2">
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild onClick={onSecondary}>
              <a href="#demo">See demo</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Free during beta. No card required.</p>
        </motion.div>
        <motion.div initial={initial} animate={animate} transition={{ duration: 0.5, delay: 0.1 }}>
          <ProductScreenshotLoop />
        </motion.div>
      </div>
    </SectionShell>
  );
}
