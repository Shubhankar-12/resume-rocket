import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { InteractiveDemo } from "../sections/InteractiveDemo";

describe("InteractiveDemo", () => {
  it("renders the heading, Preview Workspace label, and six tabs", () => {
    render(<InteractiveDemo />);
    expect(
      screen.getByRole("heading", { level: 2, name: /interactive product tour/i })
    ).toBeTruthy();
    expect(screen.getAllByText("Preview Workspace").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("tab")).toHaveLength(6);
  });

  it("defaults to the Dashboard panel", () => {
    render(<InteractiveDemo />);
    const dashTab = screen.getByRole("tab", { name: "Dashboard" });
    expect(dashTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("Resume Score")).toBeTruthy();
  });

  it("switches to the Tracker tab and shows all four kanban columns", () => {
    render(<InteractiveDemo />);
    fireEvent.click(screen.getByRole("tab", { name: "Tracker" }));
    const panel = screen.getByRole("tabpanel");
    ["Applied", "Interview", "Offer", "Rejected"].forEach((c) =>
      expect(within(panel).getAllByText(c).length).toBeGreaterThan(0)
    );
  });
});
