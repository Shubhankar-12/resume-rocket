import { describe, it, expect } from "vitest";
import {
  NAV_LINKS,
  FEATURE_CHIPS,
  TRUST_NOTES,
  SCORE_DEMO,
  COVER_LETTER_DEMO,
  GITHUB_DEMO,
  TRACKER_DEMO,
} from "../hero-demo-data";

describe("hero demo data", () => {
  it("nav has the four spec links", () => {
    expect(NAV_LINKS.map((l) => l.label)).toEqual(["Features", "How It Works", "Pricing", "FAQ"]);
  });
  it("has five feature chips and four trust notes", () => {
    expect(FEATURE_CHIPS).toHaveLength(5);
    expect(TRUST_NOTES).toHaveLength(4);
  });
  it("labels preview cards as demo, never real", () => {
    expect(SCORE_DEMO.label).toBe("Example Analysis");
    expect(COVER_LETTER_DEMO.label).toBe("Generated Example");
    expect(GITHUB_DEMO.label).toBe("Generated Example");
  });
  it("tracker has the four pipeline columns", () => {
    expect(TRACKER_DEMO.map((t) => t.column)).toEqual([
      "Applied",
      "Interview",
      "Offer",
      "Rejected",
    ]);
  });
});
