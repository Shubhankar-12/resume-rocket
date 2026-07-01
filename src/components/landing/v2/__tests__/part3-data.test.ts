import { describe, it, expect } from "vitest";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "../part3-faq-data";
import { PLAN_META } from "../pricing/plan-meta";

describe("part 3 data", () => {
  it("has FAQ items across the six categories with non-empty answers", () => {
    const categoryIds = FAQ_CATEGORIES.map((c) => c.id);
    expect(FAQ_CATEGORIES).toHaveLength(6);
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(15);
    FAQ_ITEMS.forEach((f) => {
      expect(categoryIds).toContain(f.category);
      expect(f.answer.length).toBeGreaterThan(0);
    });
  });

  it("gives PRO a visual emphasis (design accent only, not a popularity claim)", () => {
    expect(PLAN_META.PRO.emphasis).toBe(true);
    expect(PLAN_META.FREE.emphasis).toBeUndefined();
  });
});
