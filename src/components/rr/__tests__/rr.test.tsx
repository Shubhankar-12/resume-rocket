import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Counter, StatMeter, WidgetCard } from "../index";

describe("rr primitives", () => {
  it("Counter renders its final value immediately under reduced motion", () => {
    render(<Counter to={87} suffix="%" reduce />);
    expect(screen.getByText("87%")).toBeInTheDocument();
  });

  it("StatMeter exposes an accessible progressbar with the clamped value", () => {
    render(<StatMeter value={0.42} reduce />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "42");
  });

  it("StatMeter clamps out-of-range values", () => {
    render(<StatMeter value={1.5} reduce />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });

  it("WidgetCard renders its title and children", () => {
    render(
      <WidgetCard title="Resume Score">
        <span>inner</span>
      </WidgetCard>
    );
    expect(screen.getByText("Resume Score")).toBeInTheDocument();
    expect(screen.getByText("inner")).toBeInTheDocument();
  });
});
