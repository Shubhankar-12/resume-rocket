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
