import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PricingCard } from "../pricing/PricingCard";
import type { Plan } from "@/lib/api";

const plan: Plan = {
  plan_id: "PRO",
  region: "GLOBAL",
  provider: "stripe",
  provider_price_id: "price_x",
  amount: 1900,
  currency: "USD",
  monthly_credits: 200,
  features: { resume_analysis: true },
  active: true,
};

describe("PricingCard action mode", () => {
  it("renders a link teaser when no action is given", () => {
    render(<PricingCard plan={plan} />);
    expect(screen.getByRole("link", { name: /choose/i })).toBeInTheDocument();
  });

  it("renders a button that fires onSelect when action is given", () => {
    const onSelect = vi.fn();
    render(<PricingCard plan={plan} action={{ onSelect, label: "Subscribe" }} />);
    const btn = screen.getByRole("button", { name: "Subscribe" });
    fireEvent.click(btn);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("disables the button while loading", () => {
    render(
      <PricingCard
        plan={plan}
        action={{ onSelect: vi.fn(), label: "Redirecting…", loading: true }}
      />
    );
    expect(screen.getByRole("button", { name: "Redirecting…" })).toBeDisabled();
  });
});
