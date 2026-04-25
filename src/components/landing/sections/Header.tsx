"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { captureEvent } from "@/lib/analytics/posthog";

const NAV_LINKS = [
  { href: "#demo", label: "Demo" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onPrimaryClick = () => {
    captureEvent("hero_cta_clicked", { cta_label: "Start free", cta_position: "hero" });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        scrolled ? "bg-background/85 backdrop-blur" : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          ResumeRocket
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <Button asChild size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
                <Link href="/auth">Sign in</Link>
              </Button>
              <Button size="sm" asChild onClick={onPrimaryClick}>
                <Link href="/auth?next=/dashboard">Start free</Link>
              </Button>
            </>
          )}
          <button
            type="button"
            aria-label="Toggle menu"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="block h-0.5 w-5 bg-current" />
            <span aria-hidden className="mt-1 block h-0.5 w-5 bg-current" />
            <span aria-hidden className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
