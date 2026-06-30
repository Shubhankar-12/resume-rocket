"use client";

import { useEffect, useState } from "react";
import { BillingAPI, type Plan, type CreditPack } from "@/lib/api";
import type { Currency } from "@/hooks/useCurrency";

export interface BillingData {
  plans: Plan[];
  packs: CreditPack[];
  loading: boolean;
  error: string | null;
}

export function useBillingData(currency: Currency): BillingData {
  const [state, setState] = useState<BillingData>({
    plans: [],
    packs: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    (async () => {
      try {
        const [plansRes, packsRes] = await Promise.all([
          BillingAPI.listPlans(currency),
          BillingAPI.listCreditPacks(currency),
        ]);
        if (cancelled) return;
        setState({
          plans: plansRes?.data?.body ?? [],
          packs: packsRes?.data?.body ?? [],
          loading: false,
          error: null,
        });
      } catch {
        if (cancelled) return;
        setState({
          plans: [],
          packs: [],
          loading: false,
          error: "Unable to load pricing. Please refresh or try again in a few moments.",
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currency]);

  return state;
}
