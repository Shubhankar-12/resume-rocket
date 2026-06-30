import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UploadCard } from "../hero/cards/UploadCard";
import { ScoreCard } from "../hero/cards/ScoreCard";

describe("UploadCard", () => {
  it("shows the demo file name", () => {
    render(<UploadCard />);
    expect(screen.getByText("Senior_Frontend_Resume.pdf")).toBeTruthy();
  });
});

describe("ScoreCard", () => {
  it("shows grade, scores, and the Example Analysis label", () => {
    render(<ScoreCard />);
    expect(screen.getByText("A-")).toBeTruthy();
    expect(screen.getByText(/87%/)).toBeTruthy();
    expect(screen.getByText(/82%/)).toBeTruthy();
    expect(screen.getByText("Example Analysis")).toBeTruthy();
    expect(screen.getByRole("button", { name: /view report/i })).toBeTruthy();
  });
});
