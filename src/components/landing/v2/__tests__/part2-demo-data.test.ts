import { describe, it, expect } from "vitest";
import {
  PROBLEM_CARDS,
  HOW_STEPS,
  ECOSYSTEM,
  DEEP_DIVE,
  DEMO_TABS,
  WORKFLOW_STEPS,
} from "../part2-demo-data";

describe("part 2 demo data", () => {
  it("has the right counts per section", () => {
    expect(PROBLEM_CARDS).toHaveLength(4);
    expect(HOW_STEPS).toHaveLength(6);
    expect(ECOSYSTEM).toHaveLength(8);
    expect(DEEP_DIVE).toHaveLength(5);
    expect(DEMO_TABS).toHaveLength(6);
    expect(WORKFLOW_STEPS).toHaveLength(7);
  });

  it("uses verbatim spec titles", () => {
    expect(PROBLEM_CARDS.map((c) => c.title)).toContain("Missing Keywords");
    expect(HOW_STEPS.map((s) => s.title)).toContain("Track Applications");
    expect(ECOSYSTEM.map((e) => e.title)).toEqual(expect.arrayContaining(["Credits", "Billing"]));
    expect(DEMO_TABS.map((t) => t.label)).toEqual([
      "Dashboard",
      "Resume Analysis",
      "Tailored Resume",
      "Cover Letter",
      "GitHub",
      "Tracker",
    ]);
  });
});
