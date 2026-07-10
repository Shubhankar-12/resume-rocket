"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BillingAPI } from "@/lib/api";
import { useCurrency } from "@/hooks/useCurrency";
import { useAppSelector } from "@/lib/store/slices/hooks";
import { useBillingData } from "@/components/landing/v2/pricing/useBillingData";
import { PLAN_META } from "@/components/landing/v2/pricing/plan-meta";
import { CurrencyToggle } from "@/components/landing/v2/pricing/CurrencyToggle";
import { PricingCard } from "@/components/landing/v2/pricing/PricingCard";
import { CreditPack } from "@/components/landing/v2/pricing/CreditPack";
import { PricingNotes } from "@/components/landing/v2/pricing/PricingNotes";
import { PricingSkeleton } from "@/components/landing/v2/pricing/PricingSkeleton";
import { PageHero } from "@/components/marketing/PageHero";

export function PlansContent() {
  const { currency } = useCurrency();
  const { plans, packs, loading, error } = useBillingData(currency);

  const [subscribingId, setSubscribingId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((s) => s.auth.user);

  const didScrollRef = useRef(false);

  async function handleSubscribe(planId: string) {
    setSubscribingId(planId);
    setCheckoutError(null);
    try {
      const r = await BillingAPI.createCheckoutSession(planId, currency);
      const checkoutUrl = r?.data?.body?.checkoutUrl;
      if (!checkoutUrl) {
        throw new Error("Checkout URL missing from response.");
      }
      window.location.href = checkoutUrl;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Checkout failed. Please try again.";
      setCheckoutError(msg);
      setSubscribingId(null);
    }
  }

  function handleBuyPack(packId: string) {
    const dest = `/dashboard/billing/credits?pack=${packId}`;
    if (!user) {
      router.push(`/auth?next=${encodeURIComponent(dest)}`);
    } else {
      router.push(dest);
    }
  }

  const sortedPlans = [...plans].sort(
    (a, b) => (PLAN_META[a.plan_id]?.order ?? 999) - (PLAN_META[b.plan_id]?.order ?? 999)
  );
  const sortedPacks = [...packs].sort((a, b) => a.credits - b.credits);

  useEffect(() => {
    if (
      searchParams.get("tab") === "credits" &&
      !loading &&
      sortedPacks.length > 0 &&
      !didScrollRef.current
    ) {
      didScrollRef.current = true;
      document
        .getElementById("credit-packs")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Deep-link scroll should fire once, after data has loaded and the
    // #credit-packs section is actually in the DOM.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, sortedPacks.length]);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing"
        intro="Subscribe for ongoing access, or buy one-time credit packs for short bursts."
      />

      <div className="mx-auto max-w-[1200px] px-4 pb-24 md:px-8">
        <div className="flex justify-center">
          <CurrencyToggle />
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-rr-danger/40 bg-rr-danger/10 p-3 text-sm text-rr-danger">
            {error}
          </div>
        )}
        {checkoutError && (
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-rr-danger/40 bg-rr-danger/10 p-3 text-sm text-rr-danger">
            {checkoutError}
          </div>
        )}

        <div className="mt-10 md:mt-12">
          {loading ? (
            <PricingSkeleton />
          ) : sortedPlans.length === 0 ? (
            <p className="text-center text-sm text-rr-text-muted">
              No plans are currently available for {currency}. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sortedPlans.map((plan) => (
                <PricingCard
                  key={`${plan.plan_id}-${plan.region}`}
                  plan={plan}
                  action={{
                    onSelect: () => handleSubscribe(plan.plan_id),
                    label:
                      subscribingId === plan.plan_id
                        ? "Redirecting…"
                        : plan.amount === 0
                          ? "Get Started"
                          : `Choose ${plan.name ?? plan.plan_id}`,
                    loading: subscribingId === plan.plan_id,
                    disabled: subscribingId !== null,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {!loading && sortedPacks.length > 0 && (
          <div id="credit-packs" className="mt-16 border-t border-rr-border pt-12">
            <div className="mx-auto max-w-xl text-center">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-rr-text">
                Need extra credits?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-rr-text-secondary">
                Purchase one-time credit packs that never expire — no subscription required.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {sortedPacks.map((pack) => (
                <CreditPack
                  key={`${pack.pack_id}-${pack.region}`}
                  pack={pack}
                  action={{ onSelect: () => handleBuyPack(pack.pack_id), label: "Buy credits" }}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && sortedPlans.length > 0 && <PricingNotes />}

        <div className="mt-16 text-center">
          <h3 className="font-display text-xl font-bold text-rr-text">Need a custom plan?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-rr-text-secondary">
            Contact our sales team for custom enterprise solutions tailored to your
            organization&apos;s needs.
          </p>
          <a
            href="/contact-us"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-xl border border-rr-border px-5 text-sm font-semibold text-rr-text transition-colors hover:border-rr-accent/40 hover:bg-rr-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 focus-visible:ring-offset-rr-bg"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </>
  );
}
