import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { Header } from "../Header/Header";

vi.mock("@/lib/analytics/posthog", () => ({ captureEvent: vi.fn() }));

function renderHeader(isLoggedIn = false) {
  return render(
    <ThemeProvider attribute="class">
      <Header isLoggedIn={isLoggedIn} />
    </ThemeProvider>
  );
}

describe("Header", () => {
  it("renders the nav links and the product sublabel", () => {
    renderHeader();
    ["Features", "How It Works", "Pricing", "FAQ"].forEach((l) =>
      expect(screen.getAllByRole("link", { name: l }).length).toBeGreaterThan(0)
    );
    expect(screen.getByText("AI Career Platform")).toBeTruthy();
  });

  it("shows Sign In + Upload Resume when logged out", () => {
    renderHeader(false);
    expect(screen.getAllByRole("link", { name: /sign in/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /upload resume/i }).length).toBeGreaterThan(0);
  });

  it("collapses to Dashboard when logged in", () => {
    renderHeader(true);
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeTruthy();
    expect(screen.queryByRole("link", { name: /upload resume/i })).toBeNull();
  });

  it("opens the mobile menu overlay", () => {
    renderHeader(false);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("navigation", { name: /mobile/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /close menu/i })).toBeTruthy();
  });

  it("exposes a theme radiogroup", () => {
    renderHeader();
    expect(screen.getAllByRole("radiogroup", { name: /color theme/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("radio", { name: /light/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("radio", { name: /dark/i }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("radio", { name: /system/i })).toBeNull();
  });
});
