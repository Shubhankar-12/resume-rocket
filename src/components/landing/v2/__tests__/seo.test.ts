import { describe, it, expect } from "vitest";
import { buildSoftwareAppLd, buildFaqLd } from "../seo";
import { FAQ_ITEMS } from "../part3-faq-data";

describe("seo builders", () => {
  it("builds SoftwareApplication JSON-LD", () => {
    const ld = buildSoftwareAppLd();
    expect(ld["@type"]).toBe("SoftwareApplication");
    expect(ld.name).toBe("ResumeRocket");
    expect(ld.offers.price).toBe("0");
  });

  it("builds FAQPage JSON-LD with one entity per question", () => {
    const ld = buildFaqLd(FAQ_ITEMS);
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity).toHaveLength(FAQ_ITEMS.length);
    expect(ld.mainEntity[0]["@type"]).toBe("Question");
    expect(ld.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
  });
});
