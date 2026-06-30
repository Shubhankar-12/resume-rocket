import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "../Section";

describe("Section", () => {
  it("renders a labelled region containing its children", () => {
    render(
      <Section id="hero" labelledBy="hero-h">
        <h2 id="hero-h">Heading</h2>
        <p>body</p>
      </Section>
    );
    const region = screen.getByRole("region", { name: "Heading" });
    expect(region.tagName).toBe("SECTION");
    expect(region.id).toBe("hero");
  });

  it("applies dark variant surface classes", () => {
    render(
      <Section id="x" labelledBy="x-h" variant="dark">
        <h2 id="x-h">X</h2>
      </Section>
    );
    const region = screen.getByRole("region", { name: "X" });
    expect(region.className).toContain("bg-brand-950");
  });

  it("renders a mesh slot only when mesh is set", () => {
    const { rerender, container } = render(
      <Section id="a" labelledBy="a-h">
        <h2 id="a-h">A</h2>
      </Section>
    );
    expect(container.querySelector("[data-mesh-slot]")).toBeNull();
    rerender(
      <Section id="a" labelledBy="a-h" mesh>
        <h2 id="a-h">A</h2>
      </Section>
    );
    expect(container.querySelector("[data-mesh-slot]")).not.toBeNull();
  });
});
