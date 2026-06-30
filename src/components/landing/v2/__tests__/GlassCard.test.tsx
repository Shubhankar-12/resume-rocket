import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GlassCard } from "../hero/GlassCard";

describe("GlassCard", () => {
  it("applies the glass-rr surface and renders children", () => {
    const { container } = render(<GlassCard>Frosted</GlassCard>);
    expect(screen.getByText("Frosted")).toBeTruthy();
    expect(container.querySelector(".glass-rr")).toBeTruthy();
  });
});
