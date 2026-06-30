import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Problem } from "../sections/Problem";

describe("Problem", () => {
  it("renders the heading, all pipeline nodes, and the four problem cards", () => {
    render(<Problem />);
    expect(
      screen.getByRole("heading", { level: 2, name: /why great candidates still get rejected/i })
    ).toBeTruthy();
    ["Resume", "ATS Screening", "Recruiter Review", "Interview", "Offer"].forEach((n) =>
      expect(screen.getByText(n)).toBeTruthy()
    );
    [
      "Generic Resume",
      "Missing Keywords",
      "Weak Project Descriptions",
      "Application Chaos",
    ].forEach((t) => expect(screen.getByText(t)).toBeTruthy());
  });
});
