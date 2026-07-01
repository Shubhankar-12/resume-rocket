"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Info } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { useAppSelector } from "@/lib/store/slices/hooks";
import { CurrencyToggle } from "../pricing/CurrencyToggle";
import { useBillingData } from "../pricing/useBillingData";
import { PricingCard } from "../pricing/PricingCard";
import { CreditPack } from "../pricing/CreditPack";
import { PricingNotes } from "../pricing/PricingNotes";
import { PricingSkeleton } from "../pricing/PricingSkeleton";
import { PLAN_META } from "../pricing/plan-meta";
import { getFallbackBilling } from "../pricing/pricing-fallback";

const grid = (reduce: boolean): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
});
const card = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0, 0, 1] } },
});

export function Pricing() {
  const { currency } = useCurrency();
  const { plans, packs, loading, error } = useBillingData(currency);
  const reduce = useReducedMotion() ?? false;

  // "Current plan" is shown only when the signed-in user's plan is actually
  // known — read defensively so it lights up if/when the JWT carries it.
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
  const user = useAppSelector((s) => s.auth.user) as { plan_id?: string; plan?: string } | null;
  const currentPlanId = isLoggedIn ? (user?.plan_id ?? user?.plan ?? null) : null;

  // If the live API failed, fall back to clearly-labelled example pricing so
  // the section is never empty — real prices always load on the /plans page.
  const fallback = error ? getFallbackBilling(currency) : null;
  const usingFallback = Boolean(fallback);
  const rawPlans = fallback ? fallback.plans : plans;
  const rawPacks = fallback ? fallback.packs : packs;

  const sortedPlans = [...rawPlans]
    .filter((p) => p.active !== false)
    .sort((a, b) => (PLAN_META[a.plan_id]?.order ?? 999) - (PLAN_META[b.plan_id]?.order ?? 999));
  const sortedPacks = [...rawPacks]
    .filter((p) => p.active !== false)
    .sort((a, b) => a.credits - b.credits);

  return (
    <section id="pricing" aria-labelledby="pricing-h" className="bg-rr-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow uppercase text-rr-accent">Pricing</p>
          <h2
            id="pricing-h"
            className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-rr-text sm:text-4xl"
          >
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-rr-text-secondary">
            Whether you&apos;re preparing your first resume or applying every week, choose a plan
            that matches your workflow. Plans include monthly AI credits, and you can buy extra
            credit packs whenever you need them.
          </p>
        </div>

        {/* currency toggle — sticky on mobile so it stays reachable while scrolling */}
        <div className="sticky top-16 z-20 mt-8 flex justify-center bg-rr-bg/85 py-3 backdrop-blur sm:static sm:top-auto sm:mt-8 sm:bg-transparent sm:py-0 sm:backdrop-blur-none">
          <CurrencyToggle />
        </div>

        {/* example-pricing notice when the live API is unavailable */}
        {usingFallback && (
          <div
            role="status"
            className="mx-auto mt-8 flex max-w-2xl items-start gap-2.5 rounded-xl border border-rr-border bg-rr-card px-4 py-3 text-left"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-rr-accent" aria-hidden />
            <p className="text-[13px] leading-relaxed text-rr-text-secondary">
              <span className="font-medium text-rr-text">Showing example pricing.</span> Live prices
              couldn&apos;t be loaded right now — the exact, current amounts are always confirmed
              before checkout.
            </p>
          </div>
        )}

        {/* plan cards */}
        <div className="mt-10 md:mt-12">
          {loading ? (
            <PricingSkeleton />
          ) : sortedPlans.length === 0 ? (
            <p className="text-center text-sm text-rr-text-muted">
              No plans are currently available for {currency}. Please check back soon.
            </p>
          ) : (
            <motion.div
              variants={grid(reduce)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {sortedPlans.map((plan) => (
                <motion.div key={`${plan.plan_id}-${plan.region}`} variants={card(reduce)}>
                  <PricingCard plan={plan} currentPlanId={currentPlanId} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* credit packs */}
        {!loading && sortedPacks.length > 0 && (
          <div className="mt-16 border-t border-rr-border pt-12 md:mt-20">
            <div className="mx-auto max-w-xl text-center">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-rr-text">
                Need extra credits?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-rr-text-secondary">
                Purchase one-time credit packs that never expire — no subscription required.
              </p>
            </div>
            {/* swipeable carousel on mobile, 3-up grid from sm */}
            <div className="-mx-4 mt-8 grid auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {sortedPacks.map((pack) => (
                <CreditPack key={`${pack.pack_id}-${pack.region}`} pack={pack} />
              ))}
            </div>
          </div>
        )}

        {!loading && sortedPlans.length > 0 && <PricingNotes />}
      </div>
    </section>
  );
}
