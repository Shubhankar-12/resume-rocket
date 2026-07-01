import { describe, it, expect } from "vitest";
import { DEMO_TABS } from "../part2-demo-data";

describe("part 2 demo data", () => {
  it("has the six product-tour tabs with verbatim labels", () => {
    expect(DEMO_TABS).toHaveLength(6);
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
