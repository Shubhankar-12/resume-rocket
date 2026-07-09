import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileNav } from "../MobileNav";

describe("MobileNav", () => {
  it("renders the first five nav items", () => {
    render(<MobileNav pathname="/dashboard" />);
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tracker/i })).toBeInTheDocument();
    // Billing (7th item) is not in the mobile bar
    expect(screen.queryByRole("link", { name: /billing/i })).not.toBeInTheDocument();
  });
});
