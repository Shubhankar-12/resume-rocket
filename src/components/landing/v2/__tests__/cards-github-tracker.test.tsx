import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GitHubCard } from "../hero/cards/GitHubCard";
import { TrackerCard } from "../hero/cards/TrackerCard";

describe("GitHubCard", () => {
  it("shows repo, relevance, suggested bullet and the Generated Example label", () => {
    render(<GitHubCard />);
    expect(screen.getByText("resume-rocket")).toBeTruthy();
    expect(screen.getByText("High")).toBeTruthy();
    expect(screen.getByText(/Built an AI-powered resume optimization platform/)).toBeTruthy();
    expect(screen.getByText("Generated Example")).toBeTruthy();
  });
});

describe("TrackerCard", () => {
  it("renders all four pipeline columns", () => {
    render(<TrackerCard />);
    ["Applied", "Interview", "Offer", "Rejected"].forEach((c) =>
      expect(screen.getByText(c)).toBeTruthy()
    );
  });
});
