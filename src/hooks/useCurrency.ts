"use client";
import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "cookies-next";

export type Currency = "INR" | "USD";

export function useCurrency() {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const c = getCookie("preferredCurrency");
    if (c === "INR" || c === "USD") setCurrencyState(c);
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCookie("preferredCurrency", c, { maxAge: 60 * 60 * 24 * 365 });
    setCurrencyState(c);
  }, []);

  return { currency, setCurrency };
}
