import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactContent } from "../ContactContent";

describe("ContactContent", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("shows the success panel after a simulated submit", async () => {
    render(<ContactContent />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "ada@x.com" },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Hi" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Hello there" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    await vi.advanceTimersByTimeAsync(2000);
    await waitFor(() => expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument());
  });
});
