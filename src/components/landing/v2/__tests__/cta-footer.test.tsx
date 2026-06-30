import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FinalCTA } from "../sections/FinalCTA";
import { Footer } from "../sections/Footer";

const captureEvent = vi.fn();
vi.mock("@/lib/analytics/posthog", () => ({
  captureEvent: (...a: unknown[]) => captureEvent(...a),
}));

describe("FinalCTA", () => {
  it("renders the headline, CTAs, chips, and fires final analytics", () => {
    captureEvent.mockClear();
    render(<FinalCTA />);
    expect(
      screen.getByRole("heading", { level: 2, name: /build stronger job applications with ai/i })
    ).toBeTruthy();
    const primary = screen.getByRole("link", { name: /upload your resume/i });
    expect(primary.getAttribute("href")).toBe("/auth?next=/dashboard");
    expect(screen.getByRole("link", { name: /explore pricing/i }).getAttribute("href")).toBe(
      "#pricing"
    );
    expect(screen.getByText("ATS Optimization")).toBeTruthy();
    fireEvent.click(primary);
    expect(captureEvent).toHaveBeenCalledWith("hero_cta_clicked", {
      cta_label: "Upload Your Resume",
      cta_position: "final",
    });
  });
});

describe("Footer", () => {
  it("renders five columns, version, coming-soon resources, and correct legal routes", () => {
    render(<Footer />);
    ["Product", "Company", "Resources", "Legal", "Social"].forEach((t) =>
      expect(screen.getByText(t)).toBeTruthy()
    );
    expect(screen.getByText("Version 1.0")).toBeTruthy();
    expect(screen.getAllByText("Coming Soon")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /privacy policy/i }).getAttribute("href")).toBe(
      "/privacy-policy"
    );
  });

  it("reopens the consent banner from the Cookies control", () => {
    const spy = vi.spyOn(window, "dispatchEvent");
    render(<Footer />);
    fireEvent.click(screen.getByRole("button", { name: /cookies/i }));
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: "rr:open-consent" }));
    spy.mockRestore();
  });
});
