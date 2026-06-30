import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureDeepDive } from "../sections/FeatureDeepDive";

describe("FeatureDeepDive", () => {
  it("renders five features each with a Learn More link", () => {
    render(<FeatureDeepDive />);
    [
      "Resume Analysis",
      "Resume Tailoring",
      "Cover Letter Generator",
      "GitHub Project Analysis",
      "Application Tracker",
    ].forEach((t) => expect(screen.getByRole("heading", { level: 3, name: t })).toBeTruthy());
    expect(screen.getAllByRole("link", { name: /learn more/i })).toHaveLength(5);
    expect(screen.getByText(/Transform technical repositories/i)).toBeTruthy();
  });
});
