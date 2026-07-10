import type { Metadata } from "next";
import { Suspense } from "react";
import { getIsLoggedIn } from "@/lib/auth/getIsLoggedIn";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { PlansContent } from "@/components/marketing/plans/PlansContent";

export const metadata: Metadata = {
  title: "Pricing & Plans — ResumeRocket",
  description: "Subscribe for ongoing access or buy one-time credit packs.",
  alternates: { canonical: "/plans" },
};

export default async function PlansPage() {
  const isLoggedIn = await getIsLoggedIn();
  return (
    <MarketingShell isLoggedIn={isLoggedIn}>
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center text-rr-text-muted">
            Loading…
          </div>
        }
      >
        <PlansContent />
      </Suspense>
    </MarketingShell>
  );
}
