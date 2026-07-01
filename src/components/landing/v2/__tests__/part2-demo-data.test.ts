import { describe, it, expect } from "vitest";
import { ECOSYSTEM, DEEP_DIVE, DEMO_TABS } from "../part2-demo-data";

describe("part 2 demo data", () => {
  it("has the right counts per section", () => {
    expect(ECOSYSTEM).toHaveLength(8);
    expect(DEEP_DIVE).toHaveLength(5);
    expect(DEMO_TABS).toHaveLength(6);
  });

  it("uses verbatim spec titles", () => {
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
