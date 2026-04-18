"use client";
import { useEffect, useState, useCallback } from "react";
import { BillingAPI } from "@/lib/api";

export function useCreditBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const r = await BillingAPI.getCreditBalance();
      setBalance(r.data.body.balance);
    } catch {
      // silently keep stale balance on transient failure
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
    const iv = setInterval(refetch, 15_000);
    return () => clearInterval(iv);
  }, [refetch]);

  return { balance, loading, refetch };
}
