import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/features/ai-analytics", () => ({
  useAiUsageSummary: () => ({ calls: 124, cacheHitRate: 0.38, loading: false, error: false }),
}));

import { AiUsageWidget } from "../widgets/AiUsageWidget";

describe("AiUsageWidget", () => {
  it("shows calls this month and cache hit rate", () => {
    render(<AiUsageWidget reduce />);
    expect(screen.getByText("124")).toBeInTheDocument();
    expect(screen.getByText(/38%/)).toBeInTheDocument();
  });
});
