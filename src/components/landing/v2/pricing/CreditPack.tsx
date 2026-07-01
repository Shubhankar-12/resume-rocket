"use client";

import Link from "next/link";
import { Coins } from "lucide-react";
import { captureEvent } from "@/lib/analytics/posthog";
import type { CreditPack as CreditPackType } from "@/lib/api";
import { formatPrice } from "./pricing-utils";

/**
 * A one-time credit pack. Deliberately carries NO "Best Value" / "Most Popular"
 * label — packs are shown as equals unless the backend ever returns a badge.
 */
export function CreditPack({ pack }: { pack: CreditPackType }) {
  return (
    <div className="flex snap-center flex-col rounded-2xl border border-rr-border bg-rr-card p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-rr-accent/30 hover:shadow-[0_16px_40px_-20px_hsl(240_24%_10%/0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rr-accent-light text-rr-accent">
          <Coins className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="font-display text-lg font-semibold text-rr-text">
          {pack.credits.toLocaleString()} credits
        </h3>
      </div>

      <div className="mt-5 font-display text-[2rem] font-bold leading-none text-rr-text">
        {formatPrice(pack.amount, pack.currency)}
      </div>
      <p className="mt-2 flex-1 text-xs text-rr-text-muted">One-time purchase · never expires</p>

      <Link
        href="/plans?tab=credits"
        onClick={() => captureEvent("pricing_teaser_clicked", { plan_id: pack.pack_id })}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-rr-border px-5 text-sm font-semibold text-rr-text transition-colors hover:border-rr-accent/40 hover:bg-rr-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 focus-visible:ring-offset-rr-bg"
      >
        Buy credits
      </Link>
    </div>
  );
}
