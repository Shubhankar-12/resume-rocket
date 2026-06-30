import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroStage } from "../hero/HeroStage";

// The stage renders each card twice (desktop layered + mobile swipe row),
// so assert with getAllByText to tolerate duplicate matches.
describe("HeroStage", () => {
  it("renders all six preview cards' signature content", () => {
    render(<HeroStage />);
    expect(screen.getAllByText("Senior_Frontend_Resume.pdf").length).toBeGreaterThan(0); // Upload
    expect(screen.getAllByText("A-").length).toBeGreaterThan(0); // Score
    expect(screen.getAllByText("Improve React keywords").length).toBeGreaterThan(0); // Suggestions
    expect(screen.getAllByText(/Dear Hiring Manager/).length).toBeGreaterThan(0); // CoverLetter
    expect(screen.getAllByText("resume-rocket").length).toBeGreaterThan(0); // GitHub
    expect(screen.getAllByText("Application Tracker").length).toBeGreaterThan(0); // Tracker
  });
});
