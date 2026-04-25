"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "../primitives/SectionShell";
import { useCurrency } from "@/hooks/useCurrency";
import { captureEvent } from "@/lib/analytics/posthog";

export function FinalCTA() {
  const { currency } = useCurrency();
  const proPrice = currency === "INR" ? "₹399/mo" : "$6/mo";
  const onClick = () =>
    captureEvent("hero_cta_clicked", { cta_label: "Start free", cta_position: "final" });

  return (
    <SectionShell id="final-cta" labelledBy="final-cta-h" variant="dark">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="final-cta-h" className="text-4xl font-bold tracking-tight md:text-6xl">
          Stop guessing. <span className="text-[hsl(var(--brand-400))]">Start grading.</span>
        </h2>
        <p className="mt-5 text-lg text-white/80">
          Free to start. Pro is {proPrice}. No card required.
        </p>
        <Button size="lg" asChild className="mt-8 gap-2" onClick={onClick}>
          <Link href="/auth?next=/dashboard">
            Start free <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
