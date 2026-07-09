"use client";

import Link from "next/link";
import { WidgetCard, Counter } from "@/components/rr";
import { useCreditBalance } from "@/hooks/useCreditBalance";

export function CreditsWidget({ reduce }: { reduce: boolean }) {
  const { balance, loading } = useCreditBalance();
  const value = balance ?? 0;

  return (
    <WidgetCard title="Credits">
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold text-rr-text">
          {loading && balance === null ? "…" : <Counter to={value} reduce={reduce} />}
        </span>
        <span className="text-xs text-rr-text-muted">credits available</span>
      </div>
      <Link
        href="/dashboard/billing/credits"
        className="mt-3 inline-block text-[13px] font-medium text-rr-accent hover:text-rr-accent-hover"
      >
        Buy credits
      </Link>
    </WidgetCard>
  );
}
