"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { captureEvent } from "@/lib/analytics/posthog";
import { CTAButton } from "./CTAButton";
import { ThemeMenu } from "../Theme/ThemeMenu";
import { NAV_ITEMS } from "./nav-items";

/**
 * Mobile hamburger + a full-screen overlay menu with large editorial type.
 * Backdrop fades, the panel slides down; body scroll locks while open, Escape
 * closes, and focus moves to the close button on open. Reduced motion opts out
 * of the slide.
 */
export function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-rr-text transition-colors hover:bg-rr-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-modal md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            <div className="absolute inset-0 bg-rr-bg/95 backdrop-blur-xl" aria-hidden />
            <motion.nav
              aria-label="Mobile"
              className="relative flex h-full flex-col px-6 pb-10 pt-5"
              initial={reduce ? { opacity: 1 } : { y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: [0.2, 0, 0, 1] }}
            >
              <div className="flex items-center justify-end">
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-rr-text transition-colors hover:bg-rr-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <ul className="mt-6 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl py-3 font-display text-3xl font-semibold tracking-[-0.02em] text-rr-text transition-colors hover:text-rr-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 pt-8">
                {isLoggedIn ? (
                  <CTAButton href="/dashboard" size="lg" onClick={() => setOpen(false)}>
                    Go to Dashboard
                  </CTAButton>
                ) : (
                  <>
                    <CTAButton
                      href="/auth?next=/dashboard"
                      size="lg"
                      onClick={() => {
                        captureEvent("hero_cta_clicked", {
                          cta_label: "Upload Resume",
                          cta_position: "header",
                        });
                        setOpen(false);
                      }}
                    >
                      Upload Resume
                    </CTAButton>
                    <CTAButton
                      href="/auth"
                      variant="ghost"
                      size="lg"
                      onClick={() => setOpen(false)}
                      className="border border-rr-border"
                    >
                      Sign In
                    </CTAButton>
                  </>
                )}
                <div className="pt-4">
                  <ThemeMenu />
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
