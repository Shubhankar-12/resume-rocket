import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LegalPage, LegalSection } from "../LegalPage";

describe("LegalPage", () => {
  it("renders the hero, last-updated line, and section headings", () => {
    render(
      <LegalPage
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="Please read carefully."
        lastUpdated="January 15, 2024"
      >
        <LegalSection heading="1. Acceptance of Terms">
          <p>Body text.</p>
        </LegalSection>
      </LegalPage>
    );
    expect(screen.getByRole("heading", { name: "Terms & Conditions" })).toBeInTheDocument();
    expect(screen.getByText(/Last updated: January 15, 2024/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "1. Acceptance of Terms" })).toBeInTheDocument();
  });
});
