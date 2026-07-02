"use client";

import { ThemeSwitcher } from "../Theme/ThemeSwitcher";
import { BackToTop } from "./BackToTop";

function reopenConsent() {
  window.dispatchEvent(new CustomEvent("rr:open-consent"));
}

export function FooterBottom() {
  const year = new Date().getFullYear();
  return (
    <div className="border-t border-rr-border/60">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-6 py-6 md:flex-row md:justify-between md:px-8 lg:px-12">
        {/* left — copyright + version */}
        <div className="flex items-center gap-3 text-xs text-rr-text-muted">
          <span>© {year} ResumeRocket</span>
          <span aria-hidden className="h-3 w-px bg-rr-border" />
          <span>v1.0</span>
          <span aria-hidden className="h-3 w-px bg-rr-border" />
          <button
            type="button"
            onClick={reopenConsent}
            className="rounded transition-colors hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
          >
            Cookies
          </button>
        </div>

        {/* center — built with (subtle, desktop only) */}
        <p className="hidden text-xs text-rr-text-muted lg:block">
          Built with Next.js · Tailwind CSS · TypeScript
        </p>

        {/* right — theme + back to top */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <BackToTop />
        </div>
      </div>
    </div>
  );
}
