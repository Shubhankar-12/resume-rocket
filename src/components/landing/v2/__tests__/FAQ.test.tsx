import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQ } from "../sections/FAQ";

const captureEvent = vi.fn();
vi.mock("@/lib/analytics/posthog", () => ({
  captureEvent: (...a: unknown[]) => captureEvent(...a),
}));

describe("FAQ", () => {
  it("renders all twelve questions", () => {
    render(<FAQ />);
    expect(screen.getAllByRole("button", { expanded: false }).length).toBe(12);
  });

  it("filters questions by search", () => {
    render(<FAQ />);
    fireEvent.change(screen.getByRole("searchbox", { name: /search questions/i }), {
      target: { value: "file formats" },
    });
    expect(screen.getByText("What file formats are supported?")).toBeTruthy();
    expect(screen.queryByText("How is payment handled?")).toBeNull();
  });

  it("opens an answer and fires faq_opened", () => {
    captureEvent.mockClear();
    render(<FAQ />);
    fireEvent.click(screen.getByRole("button", { name: /how is payment handled/i }));
    expect(screen.getByText(/Razorpay for INR and Stripe for USD/i)).toBeTruthy();
    expect(captureEvent).toHaveBeenCalledWith("faq_opened", { question_id: "payment" });
  });
});
