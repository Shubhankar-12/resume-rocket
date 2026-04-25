"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, Shield, Zap, Rocket, Crown, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { BillingAPI, type Plan, type CreditPack } from "@/lib/api";
import { useCurrency } from "@/hooks/useCurrency";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { useAppSelector } from "@/lib/store/slices/hooks";

const PLAN_META: Record<
  Plan["plan_id"],
  {
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
    popular?: boolean;
    order: number;
  }
> = {
  FREE: {
    name: "Free",
    description: "Basic resume analysis for job seekers",
    icon: Sparkles,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    order: 0,
  },
  STARTER: {
    name: "Starter",
    description: "Kickstart your job hunt with core tools",
    icon: Rocket,
    color: "bg-gradient-to-br from-sky-400 to-sky-600",
    order: 1,
  },
  BASIC: {
    name: "Basic",
    description: "Essential tools for serious job seekers",
    icon: Shield,
    color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    order: 2,
  },
  PRO: {
    name: "Pro",
    description: "Complete toolkit for career advancement",
    icon: Zap,
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
    popular: true,
    order: 3,
  },
  CAREER_PLUS: {
    name: "Career Plus",
    description: "Everything in Pro plus priority coaching",
    icon: Crown,
    color: "bg-gradient-to-br from-pink-400 to-pink-600",
    order: 4,
  },
};

function formatFeatureLabel(key: string, value: unknown): string {
  const nice = key.replace(/_/g, " ");
  if (typeof value === "boolean") return nice.charAt(0).toUpperCase() + nice.slice(1);
  if (typeof value === "number") {
    return `${value} ${nice}`;
  }
  if (typeof value === "string") {
    return `${nice.charAt(0).toUpperCase() + nice.slice(1)}: ${value}`;
  }
  return nice;
}

interface NormalizedFeature {
  name: string;
  included: boolean;
}

function normalizeFeatures(features: Record<string, unknown>): NormalizedFeature[] {
  return Object.entries(features).map(([key, value]) => {
    let included = true;
    if (typeof value === "boolean") included = value;
    else if (value === null || value === undefined || value === 0) included = false;
    return { name: formatFeatureLabel(key, value), included };
  });
}

export default function PlansPage() {
  const { currency } = useCurrency();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.auth.user);

  const initialTab = searchParams.get("tab") === "credits" ? "credits" : "subscriptions";
  const [tab, setTab] = useState<"subscriptions" | "credits">(initialTab);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [packs, setPacks] = useState<CreditPack[]>([]);
  const [fetching, setFetching] = useState(true);
  const [subscribingId, setSubscribingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setFetching(true);
    setError(null);
    (async () => {
      try {
        const [plansRes, packsRes] = await Promise.all([
          BillingAPI.listPlans(currency),
          BillingAPI.listCreditPacks(currency),
        ]);
        if (!cancelled) {
          setPlans(plansRes?.data?.body ?? []);
          setPacks(packsRes?.data?.body ?? []);
        }
      } catch (e) {
        console.error("Failed to load pricing data", e);
        if (!cancelled) setError("Unable to load pricing. Please try again.");
      } finally {
        if (!cancelled) setFetching(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currency]);

  useEffect(() => {
    const fromUrl = searchParams.get("tab") === "credits" ? "credits" : "subscriptions";
    setTab(fromUrl);
  }, [searchParams]);

  function handleTabChange(value: string) {
    const next = value === "credits" ? "credits" : "subscriptions";
    setTab(next);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", next);
    router.replace(`/plans?${params.toString()}`, { scroll: false });
  }

  async function handleSubscribe(planId: string) {
    setSubscribingId(planId);
    setError(null);
    try {
      const r = await BillingAPI.createCheckoutSession(planId, currency);
      const checkoutUrl = r?.data?.body?.checkoutUrl;
      if (!checkoutUrl) {
        throw new Error("Checkout URL missing from response.");
      }
      window.location.href = checkoutUrl;
    } catch (e: unknown) {
      console.error("Checkout failed", e);
      const msg = e instanceof Error ? e.message : "Checkout failed. Please try again.";
      setError(msg);
      setSubscribingId(null);
    }
  }

  function handleBuyPack(packId: string) {
    const destination = `/dashboard/billing/credits?pack=${packId}`;
    if (!user) {
      router.push(`/auth?next=${encodeURIComponent(destination)}`);
      return;
    }
    router.push(destination);
  }

  const symbol = currency === "USD" ? "$" : "₹";

  const sortedPlans = [...plans].sort((a, b) => {
    const ao = PLAN_META[a.plan_id]?.order ?? 999;
    const bo = PLAN_META[b.plan_id]?.order ?? 999;
    return ao - bo;
  });

  const sortedPacks = [...packs].sort((a, b) => a.credits - b.credits);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
          Pricing
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Subscribe for ongoing access, or buy one-time credit packs for short bursts.
        </p>

        <div className="flex items-center justify-center mt-8">
          <CurrencyToggle />
        </div>
      </motion.div>

      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="credits">Credit packs</TabsTrigger>
          </TabsList>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <TabsContent value="subscriptions">
          {fetching && plans.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-card h-96 animate-pulse"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : sortedPlans.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">
              No plans are currently available for {currency}. Please check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <AnimatePresence>
                {sortedPlans.map((plan, index) => {
                  const meta = PLAN_META[plan.plan_id] ?? {
                    name: plan.plan_id.replace(/_/g, " "),
                    description: "",
                    icon: Sparkles,
                    color: "bg-gradient-to-br from-slate-400 to-slate-600",
                    order: 999,
                  };
                  const PlanIcon = meta.icon;
                  const displayPrice = (plan.amount / 100).toFixed(0);
                  const normalizedFeatures = normalizeFeatures(plan.features);
                  const isFree = plan.amount === 0;
                  const isSubscribing = subscribingId === plan.plan_id;

                  return (
                    <motion.div
                      key={`${plan.plan_id}-${plan.region}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={cn(
                        "relative rounded-2xl overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 bg-card hover:ring-2 hover:ring-offset-2",
                        meta.popular && "ring-purple-500"
                      )}
                    >
                      {meta.popular && (
                        <div className="absolute top-0 right-0">
                          <div className="text-xs font-bold uppercase tracking-wider bg-purple-600 text-white px-4 py-1 rounded-bl-lg shadow-md">
                            Popular
                          </div>
                        </div>
                      )}

                      <div
                        className={cn(
                          "p-1",
                          meta.popular && "bg-gradient-to-r from-purple-500 to-pink-500"
                        )}
                      >
                        <div className="bg-card rounded-t-xl p-6">
                          <div className="flex items-center justify-between">
                            <div className={cn("p-2 rounded-lg", meta.color)}>
                              <PlanIcon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold">{meta.name}</h3>
                          </div>

                          <p className="text-sm text-muted-foreground mt-2">{meta.description}</p>

                          <div className="mt-4 flex items-baseline">
                            <span className="text-3xl font-extrabold">
                              {symbol}
                              {displayPrice}
                            </span>
                            <span className="ml-1 text-muted-foreground">
                              {isFree ? "" : "/month"}
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground mt-1">
                            {plan.monthly_credits} credits / month
                          </p>

                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-6"
                          >
                            <Button
                              onClick={() => handleSubscribe(plan.plan_id)}
                              disabled={isSubscribing || subscribingId !== null}
                              className={cn(
                                "w-full",
                                meta.popular
                                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                  : ""
                              )}
                              variant={meta.popular ? "default" : "outline"}
                              size="lg"
                            >
                              {isSubscribing
                                ? "Redirecting..."
                                : isFree
                                  ? "Get Started"
                                  : "Subscribe"}
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      {normalizedFeatures.length > 0 && (
                        <div className="p-6 pt-4 space-y-4">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Plan includes:
                          </h4>
                          <ul className="space-y-3">
                            {normalizedFeatures.map((feature, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.05 }}
                                className="flex items-start"
                              >
                                {feature.included ? (
                                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                                )}
                                <span
                                  className={cn(
                                    "text-sm",
                                    !feature.included && "text-muted-foreground"
                                  )}
                                >
                                  {feature.name}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        <TabsContent value="credits">
          {fetching && packs.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-card h-64 animate-pulse"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : sortedPacks.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">
              No credit packs are available for {currency}. Please check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {sortedPacks.map((p, i) => (
                <motion.div
                  key={`${p.pack_id}-${p.region}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-2xl overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 bg-card"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600">
                        <Coins className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">{p.credits} credits</h3>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">
                      One-time purchase. Never expires.
                    </p>

                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-extrabold">
                        {symbol}
                        {(p.amount / 100).toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-1">No recurring billing</p>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6"
                    >
                      <Button
                        onClick={() => handleBuyPack(p.pack_id)}
                        className="w-full"
                        variant="outline"
                        size="lg"
                      >
                        Buy
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <h3 className="text-xl font-bold">Need a custom plan?</h3>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Contact our sales team for custom enterprise solutions tailored to your
          organization&apos;s needs.
        </p>
        <Button variant="outline" className="mt-4">
          Contact Sales
        </Button>
      </motion.div>
    </div>
  );
}
