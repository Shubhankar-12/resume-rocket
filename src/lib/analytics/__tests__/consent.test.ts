import { describe, it, expect, beforeEach, vi } from "vitest";
import { getConsent, setConsent, hasDecidedConsent, CONSENT_COOKIE } from "../consent";

vi.mock("cookies-next", () => {
  const store = new Map<string, string>();
  return {
    getCookie: (name: string) => store.get(name),
    setCookie: (name: string, value: string) => store.set(name, value),
    deleteCookie: (name: string) => store.delete(name),
    __store: store,
  };
});

describe("consent", () => {
  beforeEach(async () => {
    const mod = (await import("cookies-next")) as unknown as { __store: Map<string, string> };
    mod.__store.clear();
  });

  it("returns 'unknown' when no cookie set", () => {
    expect(getConsent()).toBe("unknown");
    expect(hasDecidedConsent()).toBe(false);
  });

  it("persists 'accepted' choice", () => {
    setConsent("accepted");
    expect(getConsent()).toBe("accepted");
    expect(hasDecidedConsent()).toBe(true);
  });

  it("persists 'declined' choice", () => {
    setConsent("declined");
    expect(getConsent()).toBe("declined");
    expect(hasDecidedConsent()).toBe(true);
  });

  it("uses the canonical cookie name", () => {
    expect(CONSENT_COOKIE).toBe("rr_consent");
  });
});
