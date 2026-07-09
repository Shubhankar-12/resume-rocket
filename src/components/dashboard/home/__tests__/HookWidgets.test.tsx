import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/hooks/useCreditBalance", () => ({
  useCreditBalance: () => ({ balance: 42, loading: false, refetch: vi.fn() }),
}));

const emptyColumns = {
  BOOKMARKED: [],
  APPLIED: [],
  PHONE_SCREEN: [],
  INTERVIEW: [],
  OFFER: [],
  REJECTED: [],
};
const mockColumns = { ...emptyColumns };
vi.mock("@/features/application-tracker/hooks/useApplications", () => ({
  useApplications: () => ({ columns: mockColumns, loading: false, error: null }),
}));

import { CreditsWidget } from "../widgets/CreditsWidget";
import { PipelineWidget } from "../widgets/PipelineWidget";

describe("CreditsWidget", () => {
  it("shows the live balance", () => {
    render(<CreditsWidget reduce />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});

describe("PipelineWidget", () => {
  it("shows an empty state when there are no applications", () => {
    render(<PipelineWidget reduce />);
    expect(screen.getByText(/start tracking/i)).toBeInTheDocument();
  });
});
