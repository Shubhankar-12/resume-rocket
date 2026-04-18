export interface Plan {
  plan_id: "FREE" | "STARTER" | "BASIC" | "PRO" | "CAREER_PLUS";
  region: "IN" | "GLOBAL";
  provider: "razorpay" | "stripe";
  provider_price_id: string;
  amount: number;
  currency: "INR" | "USD";
  monthly_credits: number;
  features: Record<string, unknown>;
  active: boolean;
}

export interface CheckoutResult {
  checkoutUrl: string;
  sessionId: string;
  provider: "razorpay" | "stripe";
}

export interface CreditPack {
  pack_id: "PACK_10" | "PACK_25" | "PACK_60";
  credits: number;
  region: "IN" | "GLOBAL";
  provider: "razorpay" | "stripe";
  provider_price_id: string | null;
  amount: number; // smallest unit: cents or paise
  currency: "INR" | "USD";
  active: boolean;
}

export interface CreditBalance {
  balance: number;
}
