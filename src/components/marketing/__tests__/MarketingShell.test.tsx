import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MarketingShell } from "../MarketingShell";

describe("MarketingShell", () => {
  it("renders the shared header, footer, and its children", () => {
    render(
      <MarketingShell isLoggedIn={false}>
        <p>Page body</p>
      </MarketingShell>
    );
    expect(screen.getByText("Page body")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument(); // <header>
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // <footer>
  });
});
