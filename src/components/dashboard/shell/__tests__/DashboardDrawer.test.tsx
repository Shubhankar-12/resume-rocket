import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardDrawer } from "../DashboardDrawer";

describe("DashboardDrawer", () => {
  it("renders all ten nav items when open, including ones the old bottom bar omitted", () => {
    render(
      <DashboardDrawer
        pathname="/dashboard"
        user={{ name: "Ada Lovelace", plan: "Pro plan" }}
        open
        onOpenChange={() => {}}
      />
    );
    // First five (were in the old bottom bar)
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tracker/i })).toBeInTheDocument();
    // Previously stranded destinations
    expect(screen.getByRole("link", { name: /billing/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ai analytics/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /upload/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
  });

  it("marks the active route with aria-current", () => {
    render(
      <DashboardDrawer
        pathname="/dashboard/billing/credits"
        user={null}
        open
        onOpenChange={() => {}}
      />
    );
    expect(screen.getByRole("link", { name: /billing/i })).toHaveAttribute("aria-current", "page");
  });
});
