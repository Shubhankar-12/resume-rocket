"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BillingAPI, type CreditPack } from "@/lib/api";
import { useCurrency } from "@/hooks/useCurrency";
import { useCreditBalance } from "@/hooks/useCreditBalance";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { openRazorpayCheckout } from "@/lib/payments/razorpay";

export default function CreditsPage() {
  const { currency } = useCurrency();
  const { balance } = useCreditBalance();
  const searchParams = useSearchParams();
  const requestedPack = searchParams.get("pack");
  const checkoutStatus = searchParams.get("checkout");

  const [packs, setPacks] = useState<CreditPack[]>([]);
  const [loading, setLoading] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [highlightedPack, setHighlightedPack] = useState<string | null>(null);
  const packRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const buyInFlightRef = useRef(false);

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

  // Handle ?checkout=success banner.
  useEffect(() => {
    if (checkoutStatus === "success") {
      setSuccess("Payment confirmed — credits will arrive within a minute.");
    } else if (checkoutStatus === "cancel") {
      setError("Payment cancelled. No charge was made.");
    }
  }, [checkoutStatus]);

  // Handle ?pack=PACK_X deep link — scroll to and highlight the card for 3s.
  useEffect(() => {
    if (!requestedPack || packs.length === 0) return;
    const match = packs.find((p) => p.pack_id === requestedPack);
    if (!match) return;
    const node = packRefs.current[requestedPack];
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedPack(requestedPack);
      const t = setTimeout(() => setHighlightedPack(null), 3000);
      return () => clearTimeout(t);
    }
  }, [requestedPack, packs]);

  async function handleBuy(packId: string) {
    if (buyInFlightRef.current) return;
    buyInFlightRef.current = true;
    setLoading(true);
    setPurchasingId(packId);
    setError(null);
    setSuccess(null);
    try {
      const r = await BillingAPI.purchaseCredits(packId, currency);
      const body = r.data.body;

      if (body.provider === "stripe") {
        if (!body.checkoutUrl) throw new Error("Checkout URL missing from Stripe response.");
        window.location.href = body.checkoutUrl;
        return;
      }

      if (body.provider === "razorpay") {
        if (!body.razorpayOrderId || !body.razorpayKeyId || body.amount == null) {
          throw new Error("Razorpay order details missing from response.");
        }
        const packMatch = packs.find((p) => p.pack_id === packId);
        const description = packMatch ? `${packMatch.credits} credits` : "Credit pack";
        await openRazorpayCheckout({
          key: body.razorpayKeyId,
          orderId: body.razorpayOrderId,
          amount: body.amount,
          currency: "INR",
          name: "ResumeRocket",
          description,
          onSuccess: async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
            try {
              await BillingAPI.verifyRazorpayPayment(
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
              );
              setSuccess("Payment verified — credits will arrive within a minute.");
            } catch {
              setError(
                "Payment verification failed. If you were charged, credits will arrive within a minute."
              );
            } finally {
              buyInFlightRef.current = false;
              setLoading(false);
              setPurchasingId(null);
            }
          },
          onDismiss: () => {
            buyInFlightRef.current = false;
            setLoading(false);
            setPurchasingId(null);
          },
        });
        return;
      }

      throw new Error(`Unknown payment provider: ${body.provider}`);
    } catch (e: unknown) {
      const response = (e as { response?: { data?: { error?: string } } })?.response;
      const msg = response?.data?.error ?? (e instanceof Error ? e.message : "Purchase failed.");
      setError(msg);
      buyInFlightRef.current = false;
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

      {success && (
        <div className="mb-6 rounded-md border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packs.map((p) => (
          <div
            key={`${p.pack_id}-${p.region}`}
            ref={(el) => {
              packRefs.current[p.pack_id] = el;
            }}
            className={`border rounded-lg p-6 flex flex-col transition-shadow ${
              highlightedPack === p.pack_id ? "ring-2 ring-primary shadow-lg" : ""
            }`}
          >
            <h3 className="text-xl font-semibold">{p.credits} credits</h3>
            <p className="text-3xl font-bold mt-2">
              {symbol}
              {(p.amount / 100).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Never expires</p>
            <Button className="mt-auto" disabled={loading} onClick={() => handleBuy(p.pack_id)}>
              {purchasingId === p.pack_id ? "Processing…" : "Buy"}
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
