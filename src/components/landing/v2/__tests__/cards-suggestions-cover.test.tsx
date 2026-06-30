import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SuggestionsCard } from "../hero/cards/SuggestionsCard";
import { CoverLetterCard } from "../hero/cards/CoverLetterCard";

describe("SuggestionsCard", () => {
  it("lists all four AI suggestions", () => {
    render(<SuggestionsCard />);
    [
      "Improve React keywords",
      "Quantify achievements",
      "Reduce passive voice",
      "Tailor summary",
    ].forEach((s) => expect(screen.getByText(s)).toBeTruthy());
  });
});

describe("CoverLetterCard", () => {
  it("renders the Generated Example label and the full demo text", () => {
    render(<CoverLetterCard />);
    expect(screen.getByText("Generated Example")).toBeTruthy();
    expect(screen.getByText(/Dear Hiring Manager/)).toBeTruthy();
  });
});
