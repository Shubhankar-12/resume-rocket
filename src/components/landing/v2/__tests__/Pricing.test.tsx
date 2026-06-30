import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BillingAPI } from "@/lib/api";
import { Pricing } from "../sections/Pricing";

vi.mock("@/lib/analytics/posthog", () => ({ captureEvent: vi.fn() }));
vi.mock("@/lib/api", () => ({
  BillingAPI: { listPlans: vi.fn(), listCreditPacks: vi.fn() },
}));

const api = vi.mocked(BillingAPI);

const PLANS = [
  {
    plan_id: "FREE",
    region: "GLOBAL",
    provider: "stripe",
    provider_price_id: "free",
    amount: 0,
    currency: "USD",
    monthly_credits: 10,
    features: { resume_analysis: true },
    active: true,
  },
  {
    plan_id: "PRO",
    region: "GLOBAL",
    provider: "stripe",
    provider_price_id: "pro",
    amount: 600,
    currency: "USD",
    monthly_credits: 120,
    features: { resume_analysis: true, priority_support: true },
    active: true,
  },
];

const PACKS = [
  {
    pack_id: "PACK_10",
    credits: 10,
    region: "GLOBAL",
    provider: "stripe",
    provider_price_id: "p10",
    amount: 500,
    currency: "USD",
    active: true,
  },
];

beforeEach(() => {
  api.listPlans.mockReset();
  api.listCreditPacks.mockReset();
});

describe("Pricing", () => {
  it("renders fetched plans, packs, and the pricing notes", async () => {
    // @ts-expect-error minimal axios-shaped mock
    api.listPlans.mockResolvedValue({ data: { body: PLANS } });
    // @ts-expect-error minimal axios-shaped mock
    api.listCreditPacks.mockResolvedValue({ data: { body: PACKS } });

    render(<Pricing />);

    expect(await screen.findByText("Pro")).toBeTruthy();
    expect(screen.getByText("Free")).toBeTruthy();
    expect(screen.getByText("Most Popular")).toBeTruthy();
    expect(screen.getByText("120 credits / month")).toBeTruthy();
    expect(screen.getAllByText("Resume analysis").length).toBeGreaterThan(0);
    expect(screen.getByText("10 credits")).toBeTruthy(); // pack
    expect(screen.getByText(/Purchased credit packs never expire/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /get started/i }).getAttribute("href")).toBe(
      "/auth?next=/dashboard"
    );
  });

  it("shows an error state when the fetch fails", async () => {
    api.listPlans.mockRejectedValue(new Error("network"));
    api.listCreditPacks.mockRejectedValue(new Error("network"));

    render(<Pricing />);

    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.getByText(/Unable to load pricing/i)).toBeTruthy();
  });
});
