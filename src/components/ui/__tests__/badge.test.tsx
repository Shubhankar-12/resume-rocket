import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders the success variant with soft bg", () => {
    render(<Badge variant="success">Passed</Badge>);
    expect(screen.getByText("Passed").className).toContain("bg-success-soft");
  });
  it("renders the brand variant", () => {
    render(<Badge variant="brand">New</Badge>);
    expect(screen.getByText("New").className).toContain("bg-brand-50");
  });
});
