import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowItWorks } from "../sections/HowItWorks";

vi.mock("@/lib/analytics/posthog", () => ({ captureEvent: vi.fn() }));

describe("HowItWorks", () => {
  it("renders the headline and all six stage panels", () => {
    render(<HowItWorks />);
    expect(
      screen.getByRole("heading", { level: 2, name: /from upload to interview/i })
    ).toBeTruthy();
    [
      "Upload resume",
      "AI parsing",
      "Resume analysis",
      "Tailored resume",
      "Cover letter",
      "Application tracker",
    ].forEach((name) => expect(screen.getByRole("heading", { level: 3, name })).toBeTruthy());
  });

  it("renders real product previews, not icons", () => {
    render(<HowItWorks />);
    // Statically-rendered preview content (animation-independent).
    expect(screen.getByText("Senior_Frontend_Resume.pdf")).toBeTruthy();
    expect(screen.getByText(/tailoring for: senior frontend engineer/i)).toBeTruthy();
  });

  it("exposes the stage tracker as keyboard-reachable links", () => {
    render(<HowItWorks />);
    const link = screen.getByRole("link", { name: /1\s*upload resume/i });
    expect(link.getAttribute("href")).toBe("#how-upload");
  });
});
