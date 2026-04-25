import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConsentBanner } from "../ConsentBanner";

vi.mock("@/lib/analytics/consent", () => {
  let state: "unknown" | "accepted" | "declined" = "unknown";
  return {
    getConsent: () => state,
    setConsent: (next: "accepted" | "declined") => {
      state = next;
    },
    hasDecidedConsent: () => state !== "unknown",
    __reset: () => {
      state = "unknown";
    },
  };
});

vi.mock("@/lib/analytics/posthog", () => ({
  initAnalytics: vi.fn(),
  captureEvent: vi.fn(),
}));

describe("ConsentBanner", () => {
  beforeEach(async () => {
    const consent = (await import("@/lib/analytics/consent")) as unknown as {
      __reset: () => void;
    };
    consent.__reset();
  });

  it("renders Accept and Decline buttons when no consent decided", () => {
    render(<ConsentBanner />);
    expect(screen.getByRole("button", { name: /accept/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /decline/i })).toBeTruthy();
  });

  it("hides itself after Accept click", () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: /accept/i }));
    expect(screen.queryByRole("button", { name: /accept/i })).toBeNull();
  });

  it("hides itself after Decline click", () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: /decline/i }));
    expect(screen.queryByRole("button", { name: /decline/i })).toBeNull();
  });
});
