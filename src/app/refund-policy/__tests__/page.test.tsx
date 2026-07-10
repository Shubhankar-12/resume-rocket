import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RefundContent } from "@/components/marketing/legal/RefundContent";

describe("Refund page content", () => {
  it("renders the refund policy in the rr LegalPage", () => {
    render(<RefundContent />);
    expect(screen.getByRole("heading", { name: "Refund Policy", level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });
});
