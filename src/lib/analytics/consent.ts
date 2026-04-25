import { getCookie, setCookie } from "cookies-next";

export const CONSENT_COOKIE = "rr_consent";
export type ConsentState = "accepted" | "declined" | "unknown";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function getConsent(): ConsentState {
  const value = getCookie(CONSENT_COOKIE);
  if (value === "accepted" || value === "declined") return value;
  return "unknown";
}

export function setConsent(state: Exclude<ConsentState, "unknown">): void {
  setCookie(CONSENT_COOKIE, state, {
    maxAge: ONE_YEAR_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function hasDecidedConsent(): boolean {
  return getConsent() !== "unknown";
}
