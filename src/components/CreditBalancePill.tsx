"use client";
import Link from "next/link";
import { Coins } from "lucide-react";
import { useCreditBalance } from "@/hooks/useCreditBalance";

export function CreditBalancePill() {
  const { balance, loading } = useCreditBalance();
  return (
    <Link
      href="/dashboard/billing/credits"
      className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm hover:bg-accent transition-colors"
      aria-label="Credit balance"
    >
      <Coins className="h-4 w-4" />
      <span className="font-medium">{loading && balance === null ? "…" : (balance ?? 0)}</span>
      <span className="text-muted-foreground">credits</span>
    </Link>
  );
}
