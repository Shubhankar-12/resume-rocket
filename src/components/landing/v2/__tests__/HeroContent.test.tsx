import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroContent } from "../hero/HeroContent";

const captureEvent = vi.fn();
vi.mock("@/lib/analytics/posthog", () => ({
  captureEvent: (...a: unknown[]) => captureEvent(...a),
}));

describe("HeroContent", () => {
  it("renders the announcement pill and an h1", () => {
    render(<HeroContent />);
    expect(screen.getByText(/AI-Powered Resume Optimization Platform/i)).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  });

  it("renders the primary and secondary CTAs with correct targets", () => {
    render(<HeroContent />);
    const upload = screen.getByRole("link", { name: /upload resume/i });
    expect(upload.getAttribute("href")).toBe("/auth?next=/dashboard");
    const how = screen.getByRole("link", { name: /see how it works/i });
    expect(how.getAttribute("href")).toBe("#how");
  });

  it("renders all five feature chips and the trust note", () => {
    render(<HeroContent />);
    [
      "ATS Analysis",
      "Resume Tailoring",
      "Cover Letters",
      "GitHub Analysis",
      "Application Tracker",
    ].forEach((c) => expect(screen.getByText(c)).toBeTruthy());
    expect(screen.getByText(/Supports PDF & DOCX/)).toBeTruthy();
  });

  it("fires analytics on primary CTA click", () => {
    captureEvent.mockClear();
    render(<HeroContent />);
    fireEvent.click(screen.getByRole("link", { name: /upload resume/i }));
    expect(captureEvent).toHaveBeenCalledWith("hero_cta_clicked", {
      cta_label: "Upload Resume",
      cta_position: "hero",
    });
  });
});
