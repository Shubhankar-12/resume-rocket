import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Force reduced-motion so animated values render their static end-states (deterministic in jsdom).
vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => true };
});

import { ScoreRing } from "../shared/ScoreRing";
import { Typewriter } from "../shared/Typewriter";
import { CountUp } from "../shared/CountUp";
import { MiniKanban } from "../shared/MiniKanban";
import { ConnectorLine } from "../shared/ConnectorLine";

describe("ScoreRing", () => {
  it("renders centerText and an svg ring", () => {
    const { container } = render(<ScoreRing value={87} centerText="A-" />);
    expect(screen.getByText("A-")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });
});

describe("Typewriter", () => {
  it("exposes the full text for a11y regardless of motion", () => {
    render(<Typewriter text="Dear Hiring Manager, hello." />);
    expect(screen.getAllByText("Dear Hiring Manager, hello.").length).toBeGreaterThan(0);
  });
});

describe("CountUp", () => {
  it("renders the final value with suffix immediately under reduced motion", () => {
    render(<CountUp to={22} suffix=" detected" />);
    expect(screen.getByText(/22 detected/)).toBeTruthy();
  });
});

describe("MiniKanban", () => {
  it("renders all column names", () => {
    render(
      <MiniKanban
        columns={[
          { column: "Applied", cards: ["a"] },
          { column: "Interview", cards: ["b"] },
          { column: "Offer", cards: ["c"] },
          { column: "Rejected", cards: ["d"] },
        ]}
      />
    );
    ["Applied", "Interview", "Offer", "Rejected"].forEach((c) =>
      expect(screen.getByText(c)).toBeTruthy()
    );
  });
});

describe("ConnectorLine", () => {
  it("is decorative (aria-hidden)", () => {
    const { container } = render(<ConnectorLine />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });
});
