"use client";

import Link from "next/link";
import { useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "../primitives/SectionShell";
import { ProductScreenshotLoop } from "../animations/ProductScreenshotLoop";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { captureEvent } from "@/lib/analytics/posthog";

export function DemoShowcase() {
  const fire = useCallback(() => captureEvent("demo_viewed", {}), []);
  const ref = useInViewOnce(fire, "demo-viewed");
  const onCta = () =>
    captureEvent("hero_cta_clicked", { cta_label: "See it on your resume", cta_position: "demo" });

  return (
    <SectionShell id="demo" labelledBy="demo-h" variant="dark" className="!pt-0">
      <div ref={ref} className="grid items-center gap-10 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-2">
          <h2 id="demo-h" className="text-3xl font-semibold tracking-tight md:text-5xl">
            This is what 30 seconds of grading looks like.
          </h2>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            Upload, get a score, see what to fix. Then generate a tailored version for any role —
            without retyping anything.
          </p>
          <Button size="lg" className="mt-6 gap-2" asChild onClick={onCta}>
            <Link href="/auth?next=/dashboard">
              See it on your resume <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="md:col-span-3">
          <ProductScreenshotLoop />
        </div>
      </div>
    </SectionShell>
  );
}
