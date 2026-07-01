import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";

vi.mock("@/lib/analytics/posthog", () => ({ captureEvent: vi.fn() }));

describe("Hero", () => {
  it("renders the headline and the product preview together", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: /land more interviews/i })).toBeTruthy();
    // The browser preview renders the example dashboard home screen.
    expect(screen.getByText(/welcome back, alex/i)).toBeTruthy();
  });
});
