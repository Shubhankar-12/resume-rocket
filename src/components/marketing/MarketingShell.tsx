import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";

export function MarketingShell({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="min-h-screen bg-rr-bg text-rr-text">{children}</main>
      <Footer />
    </>
  );
}
