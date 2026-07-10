import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrivacyContent } from "@/components/marketing/legal/PrivacyContent";

describe("Privacy page content", () => {
  it("renders the privacy policy in the rr LegalPage", () => {
    render(<PrivacyContent />);
    expect(screen.getByRole("heading", { name: "Privacy Policy", level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });
});
