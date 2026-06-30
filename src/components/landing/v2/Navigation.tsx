"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { captureEvent } from "@/lib/analytics/posthog";
import { NAV_LINKS } from "./hero-demo-data";

export function Navigation({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onGetStarted = () =>
    captureEvent("hero_cta_clicked", { cta_label: "Get Started", cta_position: "hero" });

  const ctaClass =
    "inline-flex h-9 items-center rounded-lg bg-rr-accent px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rr-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2";

  return (
    <header
      className={cn(
        "sticky top-0 z-sticky w-full transition-all duration-200",
        scrolled
          ? "glass-rr border-b border-rr-border shadow-[0_1px_3px_hsl(240_24%_10%/0.06)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-4 md:px-8">
        <Link
          href="/"
          className="group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
        >
          <span className="block text-lg font-semibold leading-tight tracking-tight text-rr-text">
            ResumeRocket
          </span>
          <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-rr-text-muted">
            AI Career Platform
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-md px-3 py-2 text-sm font-medium text-rr-text-secondary transition-colors hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
            >
              {l.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-rr-accent transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <Link href="/dashboard" className={ctaClass}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth"
                className="hidden h-9 items-center rounded-lg px-4 text-sm font-medium text-rr-text-secondary transition-colors hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent md:inline-flex"
              >
                Sign in
              </Link>
              <Link href="/auth?next=/dashboard" onClick={onGetStarted} className={ctaClass}>
                Get Started
              </Link>
            </>
          )}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="glass-rr border-t border-rr-border md:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-rr-text-secondary hover:bg-rr-accent-light hover:text-rr-text"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
