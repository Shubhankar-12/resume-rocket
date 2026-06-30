import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Eyebrow } from "../Eyebrow";
import { DisplayHeading } from "../DisplayHeading";
import { MeshBackground } from "../MeshBackground";
import { GlassPanel } from "../GlassPanel";
import { Reveal } from "../Reveal";

describe("Eyebrow", () => {
  it("renders brand tone by default", () => {
    render(<Eyebrow>Label</Eyebrow>);
    const el = screen.getByText("Label");
    expect(el.className).toContain("text-brand-600");
    expect(el.className).toContain("uppercase");
  });
  it("renders muted tone", () => {
    render(<Eyebrow tone="muted">Label</Eyebrow>);
    expect(screen.getByText("Label").className).toContain("text-muted-foreground");
  });
});

describe("DisplayHeading", () => {
  it("renders as h2 with gradient by default and a custom id", () => {
    render(<DisplayHeading id="h">Title</DisplayHeading>);
    const el = screen.getByText("Title");
    expect(el.tagName).toBe("H2");
    expect(el.id).toBe("h");
    expect(el.className).toContain("text-gradient-brand");
  });
  it("renders as a custom tag without gradient when gradient=false", () => {
    render(
      <DisplayHeading as="h1" gradient={false}>
        Plain
      </DisplayHeading>
    );
    const el = screen.getByText("Plain");
    expect(el.tagName).toBe("H1");
    expect(el.className).not.toContain("text-gradient-brand");
  });
});

describe("MeshBackground", () => {
  it("is decorative (aria-hidden) and non-interactive", () => {
    const { container } = render(<MeshBackground />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute("aria-hidden")).toBe("true");
    expect(root.className).toContain("pointer-events-none");
  });
});

describe("GlassPanel", () => {
  it("applies the glass utility and renders children", () => {
    render(<GlassPanel>Frosted</GlassPanel>);
    const el = screen.getByText("Frosted");
    expect(el.className).toContain("glass");
  });
});

describe("Reveal", () => {
  it("always renders its children", () => {
    render(<Reveal>Visible content</Reveal>);
    expect(screen.getByText("Visible content")).toBeTruthy();
  });
});
