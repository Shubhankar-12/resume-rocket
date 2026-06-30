import { Sparkles, Rocket, Shield, Zap, Crown, type LucideIcon } from "lucide-react";
import type { Plan } from "@/lib/api";

// Display metadata ONLY — never prices, credits, or limits (those come from the API).
export const PLAN_META: Record<
  Plan["plan_id"],
  { name: string; order: number; popular?: boolean; icon: LucideIcon }
> = {
  FREE: { name: "Free", order: 0, icon: Sparkles },
  STARTER: { name: "Starter", order: 1, icon: Rocket },
  BASIC: { name: "Basic", order: 2, icon: Shield },
  PRO: { name: "Pro", order: 3, popular: true, icon: Zap },
  CAREER_PLUS: { name: "Career Plus", order: 4, icon: Crown },
};
