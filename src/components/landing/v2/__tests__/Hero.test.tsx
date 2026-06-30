import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";

vi.mock("@/lib/analytics/posthog", () => ({ captureEvent: vi.fn() }));

describe("Hero", () => {
  it("renders the h1 and the preview stage together", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: /land more interviews/i })).toBeTruthy();
    expect(screen.getByLabelText(/example product preview/i)).toBeTruthy();
  });
});
