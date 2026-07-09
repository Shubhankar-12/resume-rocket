import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const emptyColumns = {
  BOOKMARKED: [],
  APPLIED: [],
  PHONE_SCREEN: [],
  INTERVIEW: [],
  OFFER: [],
  REJECTED: [],
};

let mockCreditState: { balance: number | null; loading: boolean } = { balance: 42, loading: false };
let mockColumns: Record<string, unknown[]> = { ...emptyColumns };

vi.mock("@/hooks/useCreditBalance", () => ({
  useCreditBalance: () => ({ ...mockCreditState, refetch: vi.fn() }),
}));

vi.mock("@/features/application-tracker/hooks/useApplications", () => ({
  useApplications: () => ({ columns: mockColumns, loading: false, error: null }),
}));

import { CreditsWidget } from "../widgets/CreditsWidget";
import { PipelineWidget } from "../widgets/PipelineWidget";

beforeEach(() => {
  mockCreditState = { balance: 42, loading: false };
  mockColumns = { ...emptyColumns };
});

describe("CreditsWidget", () => {
  it("shows the live balance", () => {
    render(<CreditsWidget reduce />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("shows a placeholder, not a fabricated 0, before the balance loads", () => {
    mockCreditState = { balance: null, loading: false };
    render(<CreditsWidget reduce />);
    expect(screen.getByText("…")).toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});

describe("PipelineWidget", () => {
  it("shows an empty state when there are no applications", () => {
    render(<PipelineWidget reduce />);
    expect(screen.getByText(/start tracking/i)).toBeInTheDocument();
  });

  it("renders per-stage counts when applications exist", () => {
    mockColumns = { ...emptyColumns, APPLIED: [{}, {}], INTERVIEW: [{}] };
    render(<PipelineWidget reduce />);
    expect(screen.queryByText(/start tracking/i)).not.toBeInTheDocument();
    expect(screen.getByText("Applied")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
