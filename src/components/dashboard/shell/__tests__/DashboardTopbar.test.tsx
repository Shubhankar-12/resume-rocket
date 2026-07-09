import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { DashboardTopbar } from "../DashboardTopbar";

vi.mock("@/hooks/useCreditBalance", () => ({
  useCreditBalance: () => ({ balance: 42, loading: false, refetch: vi.fn() }),
}));

function renderTopbar(pathname: string) {
  return render(
    <ThemeProvider attribute="class" enableSystem={false}>
      <DashboardTopbar
        pathname={pathname}
        user={{ name: "Ajay Kumar", email: "ajay@x.com" }}
        onLogout={vi.fn()}
      />
    </ThemeProvider>
  );
}

describe("DashboardTopbar", () => {
  it("shows the breadcrumb for the current route", () => {
    renderTopbar("/dashboard/cover-letters");
    expect(screen.getByText("Cover Letters")).toBeInTheDocument();
  });

  it("shows the live credit balance", () => {
    renderTopbar("/dashboard");
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
