import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Ecosystem } from "../sections/Ecosystem";

describe("Ecosystem", () => {
  it("renders the heading and all eight feature cards", () => {
    render(<Ecosystem />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /designed around the complete job application journey/i,
      })
    ).toBeTruthy();
    [
      "Resume Upload",
      "Resume Analysis",
      "Resume Tailoring",
      "Cover Letters",
      "GitHub Analysis",
      "Application Tracker",
      "Credits",
      "Billing",
    ].forEach((t) => expect(screen.getByText(t)).toBeTruthy());
  });
});
