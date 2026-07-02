"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { captureEvent } from "@/lib/analytics/posthog";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { CTAButton } from "./CTAButton";
import { ThemeSwitcher } from "../Theme/ThemeSwitcher";

/**
 * Site header. Effectively invisible over the hero — transparent, borderless —
 * then settles into a frosted, bordered bar once the user scrolls (300ms, no
 * layout shift because height never changes). Three columns: brand, centered
 * nav, actions.
 */
export function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpload = () =>
    captureEvent("hero_cta_clicked", { cta_label: "Upload Resume", cta_position: "header" });

  return (
    <header
      className={cn(
        "sticky top-0 z-sticky w-full transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "glass-rr border-b border-rr-border shadow-[0_1px_2px_hsl(240_24%_10%/0.05)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-4 px-6 md:h-20 md:px-8 lg:px-12">
        <Logo />
        <DesktopNav />

        <div className="flex items-center justify-end gap-2">
          {/* desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            {isLoggedIn ? (
              <CTAButton href="/dashboard">Dashboard</CTAButton>
            ) : (
              <>
                <CTAButton href="/auth" variant="ghost">
                  Sign In
                </CTAButton>
                <CTAButton href="/auth?next=/dashboard" onClick={onUpload}>
                  Upload Resume
                </CTAButton>
              </>
            )}
            <span className="mx-1 h-5 w-px bg-rr-border" aria-hidden />
            <ThemeSwitcher />
          </div>

          {/* mobile actions */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeSwitcher />
            <MobileNav isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </header>
  );
}
