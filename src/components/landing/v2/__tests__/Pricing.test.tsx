import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BillingAPI } from "@/lib/api";
import { Pricing } from "../sections/Pricing";

vi.mock("@/lib/analytics/posthog", () => ({ captureEvent: vi.fn() }));
vi.mock("@/lib/api", () => ({
  BillingAPI: { listPlans: vi.fn(), listCreditPacks: vi.fn() },
}));

// framer-motion's whileInView needs no real IntersectionObserver in jsdom when
// we render statically; the cards still mount, which is all we assert on.
const api = vi.mocked(BillingAPI);

const authReducer = (state = { user: null, token: null, isLoggedIn: false }) => state;
function renderPricing() {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(
    <Provider store={store}>
      <Pricing />
    </Provider>
  );
}

const FREE = {
  plan_id: "FREE",
  region: "GLOBAL",
  provider: "stripe",
  provider_price_id: "free",
  amount: 0,
  currency: "USD",
  monthly_credits: 10,
  features: { resume_analysis: true },
  active: true,
};
const PRO = {
  plan_id: "PRO",
  region: "GLOBAL",
  provider: "stripe",
  provider_price_id: "pro",
  amount: 600,
  currency: "USD",
  monthly_credits: 120,
  features: { resume_analysis: true, priority_support: true },
  active: true,
};

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
    api.listPlans.mockResolvedValue({ data: { body: [FREE, PRO] } });
    // @ts-expect-error minimal axios-shaped mock
    api.listCreditPacks.mockResolvedValue({ data: { body: PACKS } });

    renderPricing();

    expect(await screen.findByText("Pro")).toBeTruthy();
    // "Free" appears as both the plan name and its price, hence getAllByText.
    expect(screen.getAllByText("Free").length).toBeGreaterThan(0);
    expect(screen.getByText("120 credits / month")).toBeTruthy();
    expect(screen.getAllByText("Resume analysis").length).toBeGreaterThan(0);
    expect(screen.getByText("10 credits")).toBeTruthy(); // pack
    expect(screen.getAllByText(/never expire/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /get started/i }).getAttribute("href")).toBe(
      "/auth?next=/dashboard"
    );
  });

  it("does NOT show a Most Popular badge unless the backend provides one", async () => {
    // @ts-expect-error minimal axios-shaped mock
    api.listPlans.mockResolvedValue({ data: { body: [FREE, PRO] } });
    // @ts-expect-error minimal axios-shaped mock
    api.listCreditPacks.mockResolvedValue({ data: { body: [] } });

    renderPricing();

    await screen.findByText("Pro");
    expect(screen.queryByText(/most popular/i)).toBeNull();
  });

  it("shows a backend-provided badge when present", async () => {
    // @ts-expect-error minimal axios-shaped mock
    api.listPlans.mockResolvedValue({ data: { body: [FREE, { ...PRO, popular: true }] } });
    // @ts-expect-error minimal axios-shaped mock
    api.listCreditPacks.mockResolvedValue({ data: { body: [] } });

    renderPricing();

    expect(await screen.findByText(/most popular/i)).toBeTruthy();
  });

  it("falls back to labelled example pricing when the fetch fails", async () => {
    api.listPlans.mockRejectedValue(new Error("network"));
    api.listCreditPacks.mockRejectedValue(new Error("network"));

    renderPricing();

    // A clear "example pricing" notice, plus the demo plan cards — not an empty
    // error state — so the section is still useful when billing is unreachable.
    expect(await screen.findByText(/showing example pricing/i)).toBeTruthy();
    expect(screen.getByText("Career Plus")).toBeTruthy();
    expect(screen.getByRole("status")).toBeTruthy();
  });
});
