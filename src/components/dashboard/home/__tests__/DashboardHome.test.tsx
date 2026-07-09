import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/hooks/useCreditBalance", () => ({
  useCreditBalance: () => ({ balance: 5, loading: false, refetch: vi.fn() }),
}));
vi.mock("@/features/application-tracker/hooks/useApplications", () => ({
  useApplications: () => ({
    columns: {
      BOOKMARKED: [],
      APPLIED: [],
      PHONE_SCREEN: [],
      INTERVIEW: [],
      OFFER: [],
      REJECTED: [],
    },
    loading: false,
    error: null,
  }),
}));
vi.mock("@/features/ai-analytics", () => ({
  useAiUsageSummary: () => ({ calls: 0, cacheHitRate: 0, loading: false, error: false }),
}));

import { DashboardHome } from "../DashboardHome";

describe("DashboardHome", () => {
  it("greets the user by name and renders widget titles", () => {
    render(<DashboardHome stats={{ name: "Ajay", user_id: "u1" }} />);
    expect(screen.getByText(/welcome back, ajay/i)).toBeInTheDocument();
    expect(screen.getByText("Resume Score")).toBeInTheDocument();
    expect(screen.getByText("Quick Actions")).toBeInTheDocument();
  });
});
