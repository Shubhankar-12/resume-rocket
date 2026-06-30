"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { captureEvent } from "@/lib/analytics/posthog";
import type { Plan } from "@/lib/api";
import { PLAN_META } from "./plan-meta";

interface NormalizedFeature {
  name: string;
  included: boolean;
}

function formatFeatureLabel(key: string, value: unknown): string {
  const nice = key.replace(/_/g, " ");
  if (typeof value === "number") return `${value} ${nice}`;
  if (typeof value === "string") return `${nice.charAt(0).toUpperCase() + nice.slice(1)}: ${value}`;
  return nice.charAt(0).toUpperCase() + nice.slice(1);
}

function normalizeFeatures(features: Record<string, unknown>): NormalizedFeature[] {
  return Object.entries(features).map(([key, value]) => {
    let included = true;
    if (typeof value === "boolean") included = value;
    else if (value === null || value === undefined || value === 0) included = false;
    return { name: formatFeatureLabel(key, value), included };
  });
}

export function PlanCard({ plan }: { plan: Plan }) {
  const meta = PLAN_META[plan.plan_id] ?? {
    name: plan.plan_id.replace(/_/g, " "),
    order: 999,
    icon: Check,
  };
  const Icon = meta.icon;
  const symbol = plan.currency === "USD" ? "$" : "₹";
  const price = (plan.amount / 100).toFixed(0);
  const isFree = plan.amount === 0;
  const features = normalizeFeatures(plan.features);
  const href = isFree ? "/auth?next=/dashboard" : "/plans";

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-rr-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_hsl(240_24%_10%/0.18)]",
        meta.popular ? "border-rr-accent ring-1 ring-rr-accent" : "border-rr-border"
      )}
    >
      {meta.popular && (
        <span className="absolute -top-2.5 right-5 rounded-full bg-rr-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          Most Popular
        </span>
      )}
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rr-accent-light text-rr-accent">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="text-lg font-semibold text-rr-text">{meta.name}</h3>
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-rr-text">
          {symbol}
          {price}
        </span>
        {!isFree && <span className="text-sm text-rr-text-muted">/month</span>}
      </div>
      <p className="mt-1 text-xs text-rr-text-muted">{plan.monthly_credits} credits / month</p>

      {features.length > 0 && (
        <ul className="mt-5 flex-1 space-y-2.5">
          {features.map((f) => (
            <li key={f.name} className="flex items-start gap-2 text-sm">
              {f.included ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-rr-success" aria-hidden />
              ) : (
                <X className="mt-0.5 h-4 w-4 shrink-0 text-rr-text-muted" aria-hidden />
              )}
              <span className={cn(f.included ? "text-rr-text-secondary" : "text-rr-text-muted")}>
                {f.name}
              </span>
            </li>
          ))}
        </ul>
      )}

      <Link
        href={href}
        onClick={() => captureEvent("pricing_teaser_clicked", { plan_id: plan.plan_id })}
        className={cn(
          "mt-6 inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2",
          meta.popular
            ? "bg-rr-accent text-white hover:bg-rr-accent-hover"
            : "border border-rr-border text-rr-text hover:bg-rr-accent-light"
        )}
      >
        {isFree ? "Get Started" : "Choose plan"}
      </Link>
    </div>
  );
}
