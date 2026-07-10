import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "../PageHero";

describe("PageHero", () => {
  it("renders eyebrow, title, intro, and meta", () => {
    render(
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="Please read carefully."
        meta={<span>Last updated: January 15, 2024</span>}
      />
    );
    expect(screen.getByRole("heading", { name: "Terms & Conditions" })).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
    expect(screen.getByText("Please read carefully.")).toBeInTheDocument();
    expect(screen.getByText("Last updated: January 15, 2024")).toBeInTheDocument();
  });
});
