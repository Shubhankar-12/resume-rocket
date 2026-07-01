"use client";

import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { captureEvent } from "@/lib/analytics/posthog";
import type { Plan } from "@/lib/api";
import { PLAN_META } from "./plan-meta";
import { formatPrice, toFeatureLines } from "./pricing-utils";

export function PricingCard({
  plan,
  currentPlanId,
}: {
  plan: Plan;
  /** The signed-in user's active plan_id, if known — drives the "Current plan" state. */
  currentPlanId?: string | null;
}) {
  const meta = PLAN_META[plan.plan_id] ?? {
    name: plan.plan_id.replace(/_/g, " "),
    order: 999,
    icon: Check,
  };
  const Icon = meta.icon;

  const name = plan.name ?? meta.name;
  const isFree = plan.amount === 0;
  const features = toFeatureLines(plan.features);

  // A "Most Popular"-style badge is ONLY ever backend-driven.
  const badgeText = plan.badge ?? (plan.popular ? "Most Popular" : null);
  // `emphasis` is a purely visual accent (allowed on Pro) — not a claim.
  const emphasized = meta.emphasis || Boolean(badgeText);
  const isCurrent = Boolean(currentPlanId) && currentPlanId === plan.plan_id;

  const href = isFree ? "/auth?next=/dashboard" : "/plans";
  const ctaLabel = isCurrent ? "Current plan" : isFree ? "Get Started" : `Choose ${name}`;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-rr-card p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_hsl(240_24%_10%/0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        emphasized
          ? "border-rr-accent/40 ring-1 ring-rr-accent/15"
          : "border-rr-border hover:border-rr-accent/30"
      )}
    >
      {/* backend-provided claim only */}
      {badgeText && (
        <span className="absolute -top-3 left-6 rounded-full bg-rr-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-sm">
          {badgeText}
        </span>
      )}
      {isCurrent && (
        <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full border border-rr-success/40 bg-rr-card px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-rr-success">
          <Check className="h-3 w-3" aria-hidden />
          Current plan
        </span>
      )}

      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rr-accent-light text-rr-accent">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="font-display text-lg font-semibold text-rr-text">{name}</h3>
      </div>

      {plan.description && (
        <p className="mt-2 text-[13px] leading-relaxed text-rr-text-muted">{plan.description}</p>
      )}

      <div className="mt-5 flex items-baseline gap-1">
        {isFree ? (
          <span className="font-display text-[2rem] font-bold leading-none text-rr-text">Free</span>
        ) : (
          <>
            <span className="font-display text-[2rem] font-bold leading-none text-rr-text">
              {formatPrice(plan.amount, plan.currency)}
            </span>
            <span className="text-sm text-rr-text-muted">/mo</span>
          </>
        )}
      </div>
      <p className="mt-2 text-xs font-medium text-rr-text-secondary">
        {plan.monthly_credits} credits / month
      </p>

      {features.length > 0 && (
        <ul className="mt-5 flex-1 space-y-2.5 border-t border-rr-border-muted pt-5">
          {features.map((f) => (
            <li key={f.label} className="flex items-start gap-2.5 text-[13px]">
              {f.included ? (
                <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-rr-success" aria-hidden />
              ) : (
                <Minus
                  className="mt-[3px] h-3.5 w-3.5 shrink-0 text-rr-text-muted/60"
                  aria-hidden
                />
              )}
              <span className={f.included ? "text-rr-text-secondary" : "text-rr-text-muted"}>
                {!f.included && <span className="sr-only">Not included: </span>}
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {isCurrent ? (
        <span
          aria-disabled
          className="mt-6 inline-flex h-11 cursor-default items-center justify-center rounded-xl border border-rr-border bg-rr-bg px-5 text-sm font-semibold text-rr-text-muted"
        >
          {ctaLabel}
        </span>
      ) : (
        <Link
          href={href}
          onClick={() => captureEvent("pricing_teaser_clicked", { plan_id: plan.plan_id })}
          className={cn(
            "mt-6 inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 focus-visible:ring-offset-rr-bg",
            emphasized
              ? "bg-rr-accent text-white hover:bg-rr-accent-hover"
              : "border border-rr-border text-rr-text hover:border-rr-accent/40 hover:bg-rr-accent-light"
          )}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
