import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardSidebar } from "../DashboardSidebar";

describe("DashboardSidebar", () => {
  it("renders nav labels and the real user name (not a placeholder)", () => {
    render(
      <DashboardSidebar
        pathname="/dashboard"
        user={{ name: "Ajay Kumar", plan: "Free plan" }}
        collapsed={false}
        onToggle={vi.fn()}
      />
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Ajay Kumar")).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("marks the active route with aria-current", () => {
    render(
      <DashboardSidebar
        pathname="/dashboard/tracker"
        user={null}
        collapsed={false}
        onToggle={vi.fn()}
      />
    );
    const active = screen.getByRole("link", { name: /tracker/i });
    expect(active).toHaveAttribute("aria-current", "page");
  });
});
