import { describe, it, expect } from "vitest";
import config from "../../../../../tailwind.config";

describe("tailwind design tokens", () => {
  const colors = (config.theme?.extend?.colors ?? {}) as Record<string, unknown>;
  const radius = (config.theme?.extend?.borderRadius ?? {}) as Record<string, unknown>;
  const shadow = (config.theme?.extend?.boxShadow ?? {}) as Record<string, unknown>;

  it("exposes the indigo brand ramp", () => {
    const brand = colors.brand as Record<string, string> | undefined;
    expect(brand).toBeTruthy();
    expect(brand?.["600"]).toBe("hsl(var(--brand-600))");
    expect(brand?.["50"]).toBe("hsl(var(--brand-50))");
    expect(brand?.["950"]).toBe("hsl(var(--brand-950))");
  });

  it("exposes layered surface + semantic colors", () => {
    expect(colors.surface).toBe("hsl(var(--surface))");
    expect((colors.success as Record<string, string>)?.DEFAULT).toBe("hsl(var(--success))");
    expect((colors.danger as Record<string, string>)?.soft).toBe("hsl(var(--danger-soft))");
  });

  it("exposes the full radius and shadow scales", () => {
    expect(radius.sm).toBeTruthy();
    expect(radius.xl).toBeTruthy();
    expect(radius["2xl"]).toBeTruthy();
    expect(shadow.glow).toContain("var(--brand-600)");
  });
});
