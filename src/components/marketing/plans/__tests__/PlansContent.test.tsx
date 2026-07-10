import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { Plan } from "@/lib/api";

const plans: Plan[] = [
  {
    plan_id: "PRO",
    region: "GLOBAL",
    provider: "stripe",
    provider_price_id: "price_pro",
    amount: 1900,
    currency: "USD",
    monthly_credits: 200,
    features: { resume_analysis: true },
    active: true,
    name: "Pro",
  },
];

vi.mock("@/components/landing/v2/pricing/useBillingData", () => ({
  useBillingData: () => ({ plans, packs: [], loading: false, error: null }),
}));
vi.mock("@/hooks/useCurrency", () => ({
  useCurrency: () => ({ currency: "USD", setCurrency: vi.fn() }),
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(""),
}));
// vi.hoisted lifts this above the (hoisted) `import` statement further down
// this file — plain top-level `const`s are NOT hoisted above imports, only
// `vi.mock`/`vi.hoisted` are, so referencing an un-hoisted const from inside
// a factory below would TDZ-error.
const { mockCreateCheckoutSession } = vi.hoisted(() => ({
  mockCreateCheckoutSession: vi
    .fn()
    .mockResolvedValue({ data: { body: { checkoutUrl: "https://pay" } } }),
}));
vi.mock("@/lib/api", async (orig) => {
  const actual = await (orig as () => Promise<Record<string, unknown>>)();
  return { ...actual, BillingAPI: { createCheckoutSession: mockCreateCheckoutSession } };
});
vi.mock("@/lib/store/slices/hooks", () => ({ useAppSelector: () => null }));

describe("PlansContent", () => {
  beforeEach(() => mockCreateCheckoutSession.mockClear());

  it("renders plan cards and starts checkout on click", async () => {
    render(<PlansContentWrapper />);
    expect(screen.getByRole("heading", { name: /pricing/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /choose pro|subscribe/i }));
    await waitFor(() => expect(mockCreateCheckoutSession).toHaveBeenCalledWith("PRO", "USD"));
  });
});

// Imported after mocks are registered.
import { PlansContent as PlansContentWrapper } from "../PlansContent";
