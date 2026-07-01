import { Sparkles, Rocket, Shield, Zap, Crown, type LucideIcon } from "lucide-react";
import type { Plan } from "@/lib/api";

/**
 * Display metadata ONLY — icon, fallback name, sort order, and a purely visual
 * `emphasis` flag. Never prices, credits, or limits (those come from the API),
 * and never a "Most Popular" claim (that comes from the backend `popular`/
 * `badge` fields). `emphasis` is a design accent the brief explicitly allows on
 * Pro; it makes no promotional claim.
 */
export const PLAN_META: Record<
  Plan["plan_id"],
  { name: string; order: number; emphasis?: boolean; icon: LucideIcon }
> = {
  FREE: { name: "Free", order: 0, icon: Sparkles },
  STARTER: { name: "Starter", order: 1, icon: Rocket },
  BASIC: { name: "Basic", order: 2, icon: Shield },
  PRO: { name: "Pro", order: 3, emphasis: true, icon: Zap },
  CAREER_PLUS: { name: "Career Plus", order: 4, icon: Crown },
};
