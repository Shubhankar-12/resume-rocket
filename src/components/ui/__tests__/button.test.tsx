import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  it("renders the default brand button", () => {
    render(<Button>Go</Button>);
    const btn = screen.getByRole("button", { name: "Go" });
    expect(btn.className).toContain("bg-primary");
  });

  it("is disabled and shows a spinner when loading", () => {
    render(<Button loading>Saving</Button>);
    const btn = screen.getByRole("button", { name: /Saving/ });
    expect(btn).toBeDisabled();
    expect(btn.querySelector("[data-slot=spinner]")).not.toBeNull();
  });

  it("does not render a spinner when not loading", () => {
    render(<Button>Idle</Button>);
    const btn = screen.getByRole("button", { name: "Idle" });
    expect(btn.querySelector("[data-slot=spinner]")).toBeNull();
  });
});
