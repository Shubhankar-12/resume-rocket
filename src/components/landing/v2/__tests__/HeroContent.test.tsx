import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroContent } from "../hero/HeroContent";

const captureEvent = vi.fn();
vi.mock("@/lib/analytics/posthog", () => ({
  captureEvent: (...a: unknown[]) => captureEvent(...a),
}));

describe("HeroContent", () => {
  it("renders the announcement badge and an h1", () => {
    render(<HeroContent />);
    expect(screen.getByText(/github project analysis is live/i)).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  });

  it("renders the primary and secondary CTAs with correct targets", () => {
    render(<HeroContent />);
    const upload = screen.getByRole("link", { name: /upload resume/i });
    expect(upload.getAttribute("href")).toBe("/auth?next=/dashboard");
    const demo = screen.getByRole("link", { name: /watch interactive demo/i });
    expect(demo.getAttribute("href")).toBe("#demo");
  });

  it("renders all five feature chips", () => {
    render(<HeroContent />);
    [
      "ATS Analysis",
      "Resume Tailoring",
      "Cover Letters",
      "GitHub Analysis",
      "Application Tracker",
    ].forEach((c) => expect(screen.getByText(c)).toBeTruthy());
  });

  it("fires analytics on primary and secondary CTA clicks", () => {
    captureEvent.mockClear();
    render(<HeroContent />);
    fireEvent.click(screen.getByRole("link", { name: /upload resume/i }));
    expect(captureEvent).toHaveBeenCalledWith("hero_cta_clicked", {
      cta_label: "Upload Resume",
      cta_position: "hero",
    });
    fireEvent.click(screen.getByRole("link", { name: /watch interactive demo/i }));
    expect(captureEvent).toHaveBeenCalledWith("hero_cta_clicked", {
      cta_label: "Watch Interactive Demo",
      cta_position: "hero",
    });
  });
});
