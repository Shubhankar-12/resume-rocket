import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhyResumesFail } from "../why/WhyResumesFail";

describe("WhyResumesFail", () => {
  it("renders the headline and every pipeline stage", () => {
    render(<WhyResumesFail />);
    expect(
      screen.getByRole("heading", { level: 2, name: /why great candidates never hear back/i })
    ).toBeTruthy();
    ["Resume submitted", "ATS screening", "Recruiter review", "Interview", "Offer"].forEach((s) =>
      expect(screen.getByText(s)).toBeTruthy()
    );
  });

  it("renders the four insight blocks", () => {
    render(<WhyResumesFail />);
    [
      "Generic resume",
      "Missing keywords",
      "Weak project descriptions",
      "Application tracking",
    ].forEach((t) => expect(screen.getByRole("heading", { level: 3, name: t })).toBeTruthy());
  });

  it("labels drop-off reasons with text, not colour alone", () => {
    render(<WhyResumesFail />);
    // Strings unique to the pipeline drop-off markers (not the insight blocks).
    expect(screen.getByText(/formatting the parser can't read/i)).toBeTruthy();
    expect(screen.getByText(/no measurable impact/i)).toBeTruthy();
  });
});
