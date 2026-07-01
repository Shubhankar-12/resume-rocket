"use client";
import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "cookies-next";

export type Currency = "INR" | "USD";

/**
 * Best-effort region guess for a first-time visitor with no saved preference.
 * Uses only local signals (timezone, then locale) — no network call, no IP
 * lookup — so it's instant and privacy-friendly. The backend still returns the
 * authoritative regional price for whichever currency we ask for.
 */
function detectCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return "INR";
    const locale = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
    if (locale === "hi" || locale.endsWith("-in")) return "INR";
  } catch {
    /* SSR / unsupported — fall through to default */
  }
  return "USD";
}

export function useCurrency() {
  // SSR-safe default; refined on the client in the effect below.
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const saved = getCookie("preferredCurrency");
    if (saved === "INR" || saved === "USD") {
      setCurrencyState(saved);
      return;
    }
    // First visit — geo-detect a sensible default. Not persisted, so it stays
    // responsive to where the visitor actually is until they choose manually.
    setCurrencyState(detectCurrency());
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    // A manual choice is remembered for a year and always wins over detection.
    setCookie("preferredCurrency", c, { maxAge: 60 * 60 * 24 * 365 });
    setCurrencyState(c);
  }, []);

  return { currency, setCurrency };
}
