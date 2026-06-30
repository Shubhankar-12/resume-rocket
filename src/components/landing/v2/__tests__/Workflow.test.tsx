import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Workflow } from "../sections/Workflow";

const captureEvent = vi.fn();
vi.mock("@/lib/analytics/posthog", () => ({
  captureEvent: (...a: unknown[]) => captureEvent(...a),
}));

describe("Workflow", () => {
  it("renders the heading and all seven workflow steps", () => {
    render(<Workflow />);
    expect(
      screen.getByRole("heading", { level: 2, name: /from resume upload to interview tracking/i })
    ).toBeTruthy();
    [
      "Upload Resume",
      "Analyze Resume",
      "Improve Resume",
      "Tailor Resume",
      "Generate Cover Letter",
      "Apply",
      "Track Progress",
    ].forEach((t) => expect(screen.getByRole("heading", { level: 3, name: t })).toBeTruthy());
  });

  it("wires the CTAs and fires final-position analytics", () => {
    captureEvent.mockClear();
    render(<Workflow />);
    const primary = screen.getByRole("link", { name: /start your first resume analysis/i });
    expect(primary.getAttribute("href")).toBe("/auth?next=/dashboard");
    expect(screen.getByRole("link", { name: /explore features/i }).getAttribute("href")).toBe(
      "#features"
    );
    fireEvent.click(primary);
    expect(captureEvent).toHaveBeenCalledWith("hero_cta_clicked", {
      cta_label: "Start Your First Resume Analysis",
      cta_position: "final",
    });
  });
});
