import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQ } from "../sections/FAQ";

const captureEvent = vi.fn();
vi.mock("@/lib/analytics/posthog", () => ({
  captureEvent: (...a: unknown[]) => captureEvent(...a),
}));

describe("FAQ", () => {
  it("shows the first category's questions by default", () => {
    render(<FAQ />);
    // Only the active category (General → 3) renders as accordion buttons.
    // Category tabs use aria-selected, not aria-expanded, so they're excluded.
    expect(screen.getAllByRole("button", { expanded: false }).length).toBe(3);
    expect(screen.getByText("What file formats are supported?")).toBeTruthy();
  });

  it("switches the visible questions when a category is selected", () => {
    render(<FAQ />);
    fireEvent.click(screen.getByRole("tab", { name: /privacy & security/i }));
    expect(screen.getByText("Who can access my resume?")).toBeTruthy();
    expect(screen.queryByText("What file formats are supported?")).toBeNull();
  });

  it("filters questions across categories by search", () => {
    render(<FAQ />);
    fireEvent.change(screen.getByRole("searchbox", { name: /search questions/i }), {
      target: { value: "generated cover" },
    });
    // In search mode the match is wrapped in <mark>, so query by the button's
    // accessible name rather than a single text node.
    expect(
      screen.getByRole("button", { name: /can i edit generated cover letters/i })
    ).toBeTruthy();
    expect(screen.queryByText("What file formats are supported?")).toBeNull();
  });

  it("shows an empty state when nothing matches", () => {
    render(<FAQ />);
    fireEvent.change(screen.getByRole("searchbox", { name: /search questions/i }), {
      target: { value: "zzzznomatch" },
    });
    expect(screen.getByText(/no matching questions/i)).toBeTruthy();
  });

  it("opens an answer and fires faq_opened", () => {
    captureEvent.mockClear();
    render(<FAQ />);
    // 'payment' lives in Credits & Billing — reach it via search, then open it.
    fireEvent.change(screen.getByRole("searchbox", { name: /search questions/i }), {
      target: { value: "payment" },
    });
    fireEvent.click(screen.getByRole("button", { name: /how is payment handled/i }));
    expect(screen.getByText(/Razorpay for INR and Stripe for USD/i)).toBeTruthy();
    expect(captureEvent).toHaveBeenCalledWith("faq_opened", { question_id: "payment" });
  });
});
