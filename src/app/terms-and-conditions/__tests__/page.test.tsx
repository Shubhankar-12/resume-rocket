import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TermsContent } from "@/components/marketing/legal/TermsContent";

describe("Terms page content", () => {
  it("renders key sections in the rr LegalPage", () => {
    render(<TermsContent />);
    expect(
      screen.getByRole("heading", { name: "Terms & Conditions", level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "1. Acceptance of Terms" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "13. Contact Information" })).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });
});
