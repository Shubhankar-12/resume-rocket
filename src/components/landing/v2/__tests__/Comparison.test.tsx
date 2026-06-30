import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Comparison } from "../sections/Comparison";

vi.mock("@/lib/analytics/posthog", () => ({ captureEvent: vi.fn() }));

describe("Comparison", () => {
  it("renders a desktop table, competitor labels, and a mobile ResumeRocket trigger", () => {
    render(<Comparison />);
    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getByText("ATS analysis")).toBeTruthy();
    // ResumeRocket appears in the table header and the mobile accordion trigger.
    expect(screen.getAllByText("ResumeRocket").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "ResumeRocket" })).toBeTruthy();
  });
});
