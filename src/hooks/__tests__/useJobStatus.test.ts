import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("../../lib/api/job/job", () => ({
  JobAPI: {
    getJobStatus: vi.fn(),
  },
}));

import { useJobStatus } from "../useJobStatus";
import { JobAPI } from "../../lib/api/job/job";

describe("useJobStatus", () => {
  afterEach(() => {
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

    const { result } = renderHook(() => useJobStatus("job-123"));
    await waitFor(() => {
      expect(result.current.status).toBe("completed");
    });
    expect(result.current.result).toEqual({ report_id: "rpt-001" });
  });

  it("should poll and return failed status with error", async () => {
    vi.mocked(JobAPI.getJobStatus).mockResolvedValue({
      data: {
        isSuccess: true,
        body: { status: "failed", error: "OpenAI timeout" },
      },
    } as never);

    const { result } = renderHook(() => useJobStatus("job-123"));
    await waitFor(() => {
      expect(result.current.status).toBe("failed");
    });
    expect(result.current.error).toBe("OpenAI timeout");
  });

  it("should stop polling when status is completed", async () => {
    vi.mocked(JobAPI.getJobStatus).mockResolvedValue({
      data: {
        isSuccess: true,
        body: { status: "completed", result: { report_id: "rpt-001" } },
      },
    } as never);

    renderHook(() => useJobStatus("job-123"));
    await waitFor(() => {
      expect(JobAPI.getJobStatus).toHaveBeenCalledTimes(1);
    });

    // Wait longer than poll interval to confirm no more calls
    await new Promise((r) => setTimeout(r, 4000));
    expect(JobAPI.getJobStatus).toHaveBeenCalledTimes(1);
  }, 10000);

  it("should handle network errors gracefully", async () => {
    vi.mocked(JobAPI.getJobStatus).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useJobStatus("job-456"));
    await waitFor(() => {
      expect(result.current.status).toBe("failed");
    });
    expect(result.current.error).toBe("Failed to check job status");
  });
});
