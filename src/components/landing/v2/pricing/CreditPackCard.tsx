"use client";

import Link from "next/link";
import { Coins } from "lucide-react";
import { captureEvent } from "@/lib/analytics/posthog";
import type { CreditPack } from "@/lib/api";

export function CreditPackCard({ pack }: { pack: CreditPack }) {
  const symbol = pack.currency === "USD" ? "$" : "₹";
  return (
    <div className="flex flex-col rounded-2xl border border-rr-border bg-rr-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_hsl(240_24%_10%/0.18)]">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rr-accent-light text-rr-accent">
          <Coins className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="text-lg font-semibold text-rr-text">{pack.credits} credits</h3>
      </div>
      <div className="mt-4 text-3xl font-bold text-rr-text">
        {symbol}
        {(pack.amount / 100).toFixed(2)}
      </div>
      <p className="mt-1 flex-1 text-xs text-rr-text-muted">One-time purchase. Never expires.</p>
      <Link
        href="/plans?tab=credits"
        onClick={() => captureEvent("pricing_teaser_clicked", { plan_id: pack.pack_id })}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-rr-border px-5 text-sm font-semibold text-rr-text transition-colors hover:bg-rr-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
      >
        Buy
      </Link>
    </div>
  );
}
