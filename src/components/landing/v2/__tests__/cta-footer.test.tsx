import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { FinalCTA } from "../sections/FinalCTA";
import { Footer } from "@/components/layout/Footer/Footer";

const captureEvent = vi.fn();
vi.mock("@/lib/analytics/posthog", () => ({
  captureEvent: (...a: unknown[]) => captureEvent(...a),
}));

describe("FinalCTA", () => {
  it("renders the headline, CTAs, trust notes, and fires final analytics", () => {
    captureEvent.mockClear();
    render(<FinalCTA />);
    expect(
      screen.getByRole("heading", { level: 2, name: /build better job applications/i })
    ).toBeTruthy();
    const primary = screen.getByRole("link", { name: /upload your resume/i });
    expect(primary.getAttribute("href")).toBe("/auth?next=/dashboard");
    expect(screen.getByRole("link", { name: /view pricing/i }).getAttribute("href")).toBe(
      "#pricing"
    );
    expect(screen.getByText(/supports pdf & docx/i)).toBeTruthy();
    fireEvent.click(primary);
    expect(captureEvent).toHaveBeenCalledWith("hero_cta_clicked", {
      cta_label: "Upload Your Resume",
      cta_position: "final",
    });
  });
});

const renderFooter = () =>
  render(
    <ThemeProvider attribute="class">
      <Footer />
    </ThemeProvider>
  );

describe("Footer", () => {
  it("renders the column headings, coming-soon items, and legal routes", () => {
    renderFooter();
    ["Product", "Resources", "Company", "Account"].forEach((t) =>
      expect(screen.getByText(t)).toBeTruthy()
    );
    // Roadmap + 4 resources + Language = 6 "Soon" tags.
    expect(screen.getAllByText("Soon").length).toBeGreaterThanOrEqual(5);
    expect(screen.getByRole("link", { name: /^privacy$/i }).getAttribute("href")).toBe(
      "/privacy-policy"
    );
  });

  // The FooterBottom row (© / v1.0 / Cookies control / theme / back-to-top) is
  // currently commented out in Footer.tsx, so its version + consent-reopen
  // assertions are omitted here until it's re-enabled.
});
