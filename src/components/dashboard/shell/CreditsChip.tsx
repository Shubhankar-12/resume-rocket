"use client";

import Link from "next/link";
import { Coins } from "lucide-react";
import { useCreditBalance } from "@/hooks/useCreditBalance";

export function CreditsChip() {
  const { balance, loading } = useCreditBalance();
  return (
    <Link
      href="/dashboard/billing/credits"
      aria-label="Credit balance"
      className="inline-flex items-center gap-1.5 rounded-full bg-rr-accent-light px-2.5 py-1 text-sm font-medium text-rr-accent transition-colors hover:bg-rr-accent-light/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
    >
      <Coins className="h-3.5 w-3.5" aria-hidden />
      <span>{loading && balance === null ? "…" : (balance ?? 0)}</span>
      <span className="hidden text-rr-accent/70 sm:inline">credits</span>
    </Link>
  );
}
