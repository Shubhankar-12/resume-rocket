import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { DashboardTopbar } from "../DashboardTopbar";

vi.mock("@/hooks/useCreditBalance", () => ({
  useCreditBalance: () => ({ balance: 42, loading: false, refetch: vi.fn() }),
}));

function renderTopbar(pathname: string, onOpenDrawer: () => void = vi.fn()) {
  return render(
    <ThemeProvider attribute="class" enableSystem={false}>
      <DashboardTopbar
        pathname={pathname}
        user={{ name: "Ajay Kumar", email: "ajay@x.com" }}
        onLogout={vi.fn()}
        onOpenDrawer={onOpenDrawer}
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

  it("opens the drawer when the menu button is clicked", () => {
    const onOpenDrawer = vi.fn();
    renderTopbar("/dashboard", onOpenDrawer);
    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    expect(onOpenDrawer).toHaveBeenCalledTimes(1);
  });
});
