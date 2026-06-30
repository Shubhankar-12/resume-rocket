import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navigation } from "../Navigation";

vi.mock("@/lib/analytics/posthog", () => ({ captureEvent: vi.fn() }));

describe("Navigation", () => {
  it("renders the four nav links and the platform sublabel", () => {
    render(<Navigation isLoggedIn={false} />);
    ["Features", "How It Works", "Pricing", "FAQ"].forEach((l) =>
      expect(screen.getAllByRole("link", { name: l }).length).toBeGreaterThan(0)
    );
    expect(screen.getByText("AI Career Platform")).toBeTruthy();
  });

  it("shows Sign in + Get Started when logged out", () => {
    render(<Navigation isLoggedIn={false} />);
    expect(screen.getByRole("link", { name: /sign in/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /get started/i })).toBeTruthy();
  });

  it("collapses to Dashboard when logged in", () => {
    render(<Navigation isLoggedIn />);
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeTruthy();
    expect(screen.queryByRole("link", { name: /get started/i })).toBeNull();
  });

  it("toggles the mobile menu", () => {
    render(<Navigation isLoggedIn={false} />);
    const toggle = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(toggle);
    expect(screen.getByRole("navigation", { name: /mobile/i })).toBeTruthy();
  });
});
