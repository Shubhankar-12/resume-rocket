import type { Plan, CreditPack } from "@/lib/api";
import type { Currency } from "@/hooks/useCurrency";

/**
 * DEMONSTRATION pricing shown ONLY when the live billing API can't be reached.
 * These are illustrative example figures — never treated as authoritative. The
 * section renders a clear "example pricing" notice alongside them, and real,
 * current prices are always loaded from the API on the /plans checkout page.
 *
 * amounts are in the currency's smallest unit (cents / paise), matching the API.
 */

type FallbackPlan = Omit<
  Plan,
  "amount" | "currency" | "region" | "provider" | "provider_price_id"
> & {
  usd: number;
  inr: number;
};
type FallbackPack = Omit<
  CreditPack,
  "amount" | "currency" | "region" | "provider" | "provider_price_id"
> & { usd: number; inr: number };

const FALLBACK_PLANS: FallbackPlan[] = [
  {
    plan_id: "FREE",
    usd: 0,
    inr: 0,
    monthly_credits: 10,
    active: true,
    features: {
      resume_analysis: true,
      resume_tailoring: false,
      cover_letters: false,
      github_analysis: false,
      application_tracker: true,
      support: "community",
    },
  },
  {
    plan_id: "STARTER",
    usd: 500,
    inr: 39900,
    monthly_credits: 50,
    active: true,
    features: {
      resume_analysis: true,
      resume_tailoring: true,
      cover_letters: 5,
      github_analysis: false,
      application_tracker: true,
      support: "email",
    },
  },
  {
    plan_id: "PRO",
    usd: 1200,
    inr: 99900,
    monthly_credits: 150,
    active: true,
    features: {
      resume_analysis: true,
      resume_tailoring: true,
      cover_letters: true,
      github_analysis: true,
      application_tracker: true,
      support: "priority",
    },
  },
  {
    plan_id: "CAREER_PLUS",
    usd: 2500,
    inr: 199900,
    monthly_credits: 400,
    active: true,
    features: {
      resume_analysis: true,
      resume_tailoring: true,
      cover_letters: true,
      github_analysis: true,
      application_tracker: true,
      support: "priority",
    },
  },
];

const FALLBACK_PACKS: FallbackPack[] = [
  { pack_id: "PACK_10", credits: 10, usd: 300, inr: 19900, active: true },
  { pack_id: "PACK_25", credits: 25, usd: 600, inr: 44900, active: true },
  { pack_id: "PACK_60", credits: 60, usd: 1200, inr: 99900, active: true },
];

export function getFallbackBilling(currency: Currency): { plans: Plan[]; packs: CreditPack[] } {
  const region = currency === "INR" ? "IN" : "GLOBAL";
  const provider = currency === "INR" ? "razorpay" : "stripe";

  const plans: Plan[] = FALLBACK_PLANS.map((p) => ({
    plan_id: p.plan_id,
    region,
    provider,
    provider_price_id: `demo_${p.plan_id.toLowerCase()}`,
    amount: currency === "INR" ? p.inr : p.usd,
    currency,
    monthly_credits: p.monthly_credits,
    features: p.features,
    active: p.active,
  }));

  const packs: CreditPack[] = FALLBACK_PACKS.map((p) => ({
    pack_id: p.pack_id,
    credits: p.credits,
    region,
    provider,
    provider_price_id: `demo_${p.pack_id.toLowerCase()}`,
    amount: currency === "INR" ? p.inr : p.usd,
    currency,
    active: p.active,
  }));

  return { plans, packs };
}
