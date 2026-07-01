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
  // Optional, backend-provided presentation hints. When present they OVERRIDE
  // client display metadata. `popular`/`badge` are the only source for a "Most
  // Popular"-style claim — the UI never invents one.
  name?: string;
  description?: string;
  popular?: boolean;
  badge?: string | null;
}

export interface CheckoutResult {
  checkoutUrl?: string; // Stripe hosted URL; Razorpay payment mode omits it
  sessionId: string;
  provider: "razorpay" | "stripe";
  // Populated only when provider === "razorpay" AND mode === "payment":
  razorpayOrderId?: string;
  razorpayKeyId?: string;
  amount?: number; // paise
  currency?: "INR" | "USD";
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
