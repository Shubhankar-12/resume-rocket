import { userService } from "../axios";
import { getCookie } from "cookies-next";
import type { Plan, CheckoutResult } from "./types";

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
}
