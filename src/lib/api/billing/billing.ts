import { userService } from "../axios";
import { getCookie } from "cookies-next";
import type { Plan, CheckoutResult, CreditBalance, CreditPack } from "./types";

export class BillingAPI {
  static async listPlans(currency: "INR" | "USD") {
    return userService.get<{ body: Plan[] }>(`/plans`, {
      params: { currency },
    });
  }

  static async createCheckoutSession(planId: string, currency: "INR" | "USD") {
    const token = getCookie("token");
    return userService.post<{ body: CheckoutResult }>(
      "/billing/checkout",
      { planId, currency },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static async getCreditBalance() {
    return userService.get<{ body: CreditBalance }>("/billing/credits/balance", {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
  }

  static async listCreditPacks(currency: "INR" | "USD") {
    return userService.get<{ body: CreditPack[] }>(`/billing/credits/packs?currency=${currency}`);
  }

  static async purchaseCredits(packId: string, currency: "INR" | "USD") {
    return userService.post<{ body: CheckoutResult }>(
      "/billing/purchase-credits",
      { packId, currency },
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
  }
}
