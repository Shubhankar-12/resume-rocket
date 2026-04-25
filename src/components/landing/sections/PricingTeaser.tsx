"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionShell } from "../primitives/SectionShell";
import { EyebrowLabel } from "../primitives/EyebrowLabel";
import { useCurrency } from "@/hooks/useCurrency";
import { captureEvent } from "@/lib/analytics/posthog";

const PLAN_BULLETS_FREE = [
  "10 grading credits to start",
  "Full report + ATS check",
  "Tailored resume + cover letter",
];

const PLAN_BULLETS_PRO = [
  "Monthly credits that don't expire mid-month",
  "Unlimited tailored versions",
  "Application tracker + GitHub project import",
  "Priority support",
];

export function PricingTeaser() {
  const { currency } = useCurrency();
  const isInr = currency === "INR";
  const proPrice = isInr ? "₹399/mo" : "$6/mo";
  const onCta = (planId: string) => () =>
    captureEvent("pricing_teaser_clicked", { plan_id: planId });

  return (
    <SectionShell id="pricing" labelledBy="pricing-h" variant="light">
      <div className="text-center">
        <EyebrowLabel>Pricing</EyebrowLabel>
        <h2 id="pricing-h" className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Free to start. Pro when you&apos;re serious.
        </h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <p className="text-3xl font-bold">₹0 / $0</p>
            <p className="text-sm text-muted-foreground">No card required</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {PLAN_BULLETS_FREE.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full" onClick={onCta("free")}>
              <Link href="/auth?next=/dashboard">Start free</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-[hsl(var(--brand-600))] ring-1 ring-[hsl(var(--brand-600))]">
          <CardHeader>
            <CardTitle>
              Pro <span className="text-xs font-normal text-muted-foreground">most popular</span>
            </CardTitle>
            <p className="text-3xl font-bold">{proPrice}</p>
            <p className="text-sm text-muted-foreground">Cancel anytime</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {PLAN_BULLETS_PRO.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full" onClick={onCta("pro")}>
              <Link href="/plans">View Pro details</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 text-center">
        <Button variant="link" asChild onClick={onCta("all")}>
          <Link href="/plans" className="gap-1">
            See all plans + credit packs <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
