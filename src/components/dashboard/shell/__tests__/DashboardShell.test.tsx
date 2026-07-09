import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({ push: vi.fn() }),
}));
vi.mock("react-redux", () => ({ useDispatch: () => vi.fn() }));
vi.mock("@/lib/store/slices/hooks", () => ({
  useAppSelector: (fn: (s: unknown) => unknown) =>
    fn({ auth: { user: { name: "Ajay Kumar", plan: "Free plan" } } }),
}));
vi.mock("@/hooks/useCreditBalance", () => ({
  useCreditBalance: () => ({ balance: 10, loading: false, refetch: vi.fn() }),
}));

import { DashboardShell } from "../DashboardShell";

describe("DashboardShell", () => {
  it("renders children and the real user identity", () => {
    render(
      <ThemeProvider attribute="class" enableSystem={false}>
        <DashboardShell>
          <div>page-content</div>
        </DashboardShell>
      </ThemeProvider>
    );
    expect(screen.getByText("page-content")).toBeInTheDocument();
    expect(screen.getAllByText("Ajay Kumar").length).toBeGreaterThan(0);
  });
});
