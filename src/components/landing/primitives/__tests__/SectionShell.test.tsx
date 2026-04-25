import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionShell } from "../SectionShell";

describe("SectionShell", () => {
  it("renders children inside a section element with aria-labelledby", () => {
    render(
      <SectionShell id="hero" labelledBy="hero-h">
        <h2 id="hero-h">Heading</h2>
        <p>body</p>
      </SectionShell>
    );
    const section = screen.getByRole("region", { name: "Heading" });
    expect(section).toBeTruthy();
    expect(section.tagName).toBe("SECTION");
  });

  it("applies dark band styles when variant=dark", () => {
    render(
      <SectionShell id="x" labelledBy="x-h" variant="dark">
        <h2 id="x-h">X</h2>
      </SectionShell>
    );
    const section = screen.getByRole("region", { name: "X" });
    expect(section.className).toContain("bg-[hsl(var(--ink-950))]");
  });
});
