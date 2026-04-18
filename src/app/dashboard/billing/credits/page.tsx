"use client";
import { useEffect, useState } from "react";
import { BillingAPI, type CreditPack } from "@/lib/api";
import { useCurrency } from "@/hooks/useCurrency";
import { useCreditBalance } from "@/hooks/useCreditBalance";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export default function CreditsPage() {
  const { currency } = useCurrency();
  const { balance } = useCreditBalance();
  const [packs, setPacks] = useState<CreditPack[]>([]);
  const [loading, setLoading] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await BillingAPI.listCreditPacks(currency);
        if (!cancelled) setPacks(r.data.body);
      } catch {
        if (!cancelled) setError("Unable to load packs. Please try again.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currency]);

  async function handleBuy(packId: string) {
    setLoading(true);
    setPurchasingId(packId);
    setError(null);
    try {
      const r = await BillingAPI.purchaseCredits(packId, currency);
      window.location.href = r.data.body.checkoutUrl;
    } catch (e: unknown) {
      const response = (e as { response?: { data?: { error?: string } } })?.response;
      const msg = response?.data?.error ?? (e instanceof Error ? e.message : "Purchase failed.");
      if (msg === "SUBSCRIPTION_REQUIRED") {
        setError(
          "A subscription is required to purchase credit packs. Please subscribe to a plan first."
        );
      } else {
        setError(msg);
      }
      setLoading(false);
      setPurchasingId(null);
    }
  }

  const symbol = currency === "USD" ? "$" : "₹";

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Top up credits</h1>
          <p className="text-muted-foreground mt-2">
            Packs never expire. One-time purchase — no recurring billing.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Coins className="h-4 w-4" />
            Current balance:{" "}
            <span className="font-medium text-foreground">{balance ?? 0} credits</span>
          </div>
        </div>
        <CurrencyToggle />
      </div>

      {error && (
        <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packs.map((p) => (
          <div key={`${p.pack_id}-${p.region}`} className="border rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-semibold">{p.credits} credits</h3>
            <p className="text-3xl font-bold mt-2">
              {symbol}
              {(p.amount / 100).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Never expires</p>
            <Button className="mt-auto" disabled={loading} onClick={() => handleBuy(p.pack_id)}>
              {purchasingId === p.pack_id ? "Redirecting…" : "Buy"}
            </Button>
          </div>
        ))}
      </div>

      {packs.length === 0 && !error && (
        <div className="py-12 text-center text-muted-foreground">Loading packs…</div>
      )}
    </div>
  );
}
