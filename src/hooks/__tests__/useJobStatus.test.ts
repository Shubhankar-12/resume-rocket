import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../../lib/api/job/job", () => ({
  JobAPI: {
    getJobStatus: vi.fn(),
  },
}));

import { useJobStatus } from "../useJobStatus";
import { JobAPI } from "../../lib/api/job/job";

describe("useJobStatus", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("should return idle state when no jobId provided", () => {
    const { result } = renderHook(() => useJobStatus(null));
    expect(result.current.status).toBe("idle");
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should poll and return completed status", async () => {
    vi.mocked(JobAPI.getJobStatus).mockResolvedValue({
      data: {
        isSuccess: true,
        body: { status: "completed", result: { report_id: "rpt-001" } },
      },
    } as never);

    let hookResult: ReturnType<typeof renderHook<ReturnType<typeof useJobStatus>, string | null>>;

    await act(async () => {
      hookResult = renderHook(() => useJobStatus("job-123"));
    });

    expect(hookResult!.result.current.status).toBe("completed");
    expect(hookResult!.result.current.result).toEqual({ report_id: "rpt-001" });
    expect(JobAPI.getJobStatus).toHaveBeenCalledWith("job-123");
  });

  it("should poll and return failed status with error", async () => {
    vi.mocked(JobAPI.getJobStatus).mockResolvedValue({
      data: {
        isSuccess: true,
        body: { status: "failed", error: "OpenAI timeout" },
      },
    } as never);

    let hookResult: ReturnType<typeof renderHook<ReturnType<typeof useJobStatus>, string | null>>;

    await act(async () => {
      hookResult = renderHook(() => useJobStatus("job-123"));
    });

    expect(hookResult!.result.current.status).toBe("failed");
    expect(hookResult!.result.current.error).toBe("OpenAI timeout");
  });

  it("should stop polling when status is completed", async () => {
    vi.mocked(JobAPI.getJobStatus).mockResolvedValue({
      data: {
        isSuccess: true,
        body: { status: "completed", result: { report_id: "rpt-001" } },
      },
    } as never);

    await act(async () => {
      renderHook(() => useJobStatus("job-123"));
    });

    // First poll already happened, should have been called once
    expect(JobAPI.getJobStatus).toHaveBeenCalledTimes(1);

    // Advance past multiple poll intervals — should NOT call again
    await act(async () => {
      vi.advanceTimersByTime(10000);
    });

    expect(JobAPI.getJobStatus).toHaveBeenCalledTimes(1);
  });

  it("should handle network errors gracefully", async () => {
    vi.mocked(JobAPI.getJobStatus).mockRejectedValue(new Error("Network error"));

    let hookResult: ReturnType<typeof renderHook<ReturnType<typeof useJobStatus>, string | null>>;

    await act(async () => {
      hookResult = renderHook(() => useJobStatus("job-456"));
    });

    expect(hookResult!.result.current.status).toBe("failed");
    expect(hookResult!.result.current.error).toBe("Failed to check job status");
  });
});
