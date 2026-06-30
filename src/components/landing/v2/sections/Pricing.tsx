"use client";

import { useCurrency } from "@/hooks/useCurrency";
import { SectionHeading } from "../shared/SectionHeading";
import { RrCurrencyToggle } from "../pricing/RrCurrencyToggle";
import { useBillingData } from "../pricing/useBillingData";
import { PlanCard } from "../pricing/PlanCard";
import { CreditPackCard } from "../pricing/CreditPackCard";
import { PricingSkeleton } from "../pricing/PricingSkeleton";
import { PLAN_META } from "../pricing/plan-meta";

export function Pricing() {
  const { currency } = useCurrency();
  const { plans, packs, loading, error } = useBillingData(currency);

  const sortedPlans = [...plans]
    .filter((p) => p.active !== false)
    .sort((a, b) => (PLAN_META[a.plan_id]?.order ?? 999) - (PLAN_META[b.plan_id]?.order ?? 999));
  const sortedPacks = [...packs].sort((a, b) => a.credits - b.credits);

  return (
    <section id="pricing" aria-labelledby="pricing-h" className="bg-rr-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeading
          id="pricing-h"
          eyebrow="Pricing"
          title="Simple, Transparent Pricing"
          intro="Choose a plan that matches your job search. Upgrade anytime or purchase additional credits when needed."
        />

        <div className="mt-8 flex justify-center">
          <RrCurrencyToggle />
        </div>

        <div className="mt-12">
          {loading ? (
            <PricingSkeleton />
          ) : error ? (
            <div
              role="alert"
              className="mx-auto max-w-xl rounded-2xl border border-rr-danger/40 bg-rr-card p-6 text-center"
            >
              <p className="text-sm font-medium text-rr-text">{error}</p>
            </div>
          ) : sortedPlans.length === 0 ? (
            <p className="text-center text-sm text-rr-text-muted">
              No plans are currently available for {currency}. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sortedPlans.map((plan) => (
                <PlanCard key={`${plan.plan_id}-${plan.region}`} plan={plan} />
              ))}
            </div>
          )}
        </div>

        {!loading && !error && sortedPacks.length > 0 && (
          <div className="mt-16">
            <h3 className="text-center text-xl font-semibold text-rr-text">Credit packs</h3>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-rr-text-secondary">
              One-time purchases for short bursts — no subscription required.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {sortedPacks.map((pack) => (
                <CreditPackCard key={`${pack.pack_id}-${pack.region}`} pack={pack} />
              ))}
            </div>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-rr-text-muted">
          Unused monthly credits expire at renewal. Purchased credit packs never expire.
        </p>
      </div>
    </section>
  );
}
