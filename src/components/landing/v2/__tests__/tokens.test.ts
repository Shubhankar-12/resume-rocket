import { describe, it, expect } from "vitest";
import config from "../../../../../tailwind.config";

describe("rr palette tokens", () => {
  const colors = (config.theme?.extend?.colors ?? {}) as Record<string, unknown>;
  const rr = colors.rr as Record<string, unknown> | undefined;

  it("exposes the additive rr namespace", () => {
    expect(rr).toBeTruthy();
    expect(rr?.bg).toBe("hsl(var(--rr-bg))");
    expect(rr?.card).toBe("hsl(var(--rr-card))");
    expect(rr?.accent).toEqual(expect.objectContaining({ DEFAULT: "hsl(var(--rr-accent))" }));
    expect((rr?.text as Record<string, string>)?.DEFAULT).toBe("hsl(var(--rr-text))");
    expect((rr?.text as Record<string, string>)?.secondary).toBe("hsl(var(--rr-text-secondary))");
  });

  it("does NOT disturb the existing indigo brand ramp", () => {
    const brand = colors.brand as Record<string, string> | undefined;
    expect(brand?.["600"]).toBe("hsl(var(--brand-600))");
  });
});
