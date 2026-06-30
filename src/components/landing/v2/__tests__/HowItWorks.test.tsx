import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowItWorks } from "../sections/HowItWorks";

describe("HowItWorks", () => {
  it("renders the heading and all six step titles", () => {
    render(<HowItWorks />);
    expect(
      screen.getByRole("heading", { level: 2, name: /one workspace for your entire job search/i })
    ).toBeTruthy();
    [
      "Upload Resume",
      "AI Resume Parsing",
      "Resume Analysis",
      "Tailor Resume",
      "Generate Cover Letter",
      "Track Applications",
    ].forEach((t) => expect(screen.getByText(t)).toBeTruthy());
    expect(screen.getByText("Senior_Frontend_Resume.pdf")).toBeTruthy();
  });
});
