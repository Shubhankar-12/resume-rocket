"use client";

import { useState, useEffect, useRef } from "react";
import { JobAPI } from "@/lib/api/job/job";

type JobStatus = "idle" | "pending" | "processing" | "completed" | "failed";

interface UseJobStatusResult {
  status: JobStatus;
  result: Record<string, unknown> | null;
  error: string | null;
}

const POLL_INTERVAL_MS = 3000;

export function useJobStatus(jobId: string | null): UseJobStatusResult {
  const [status, setStatus] = useState<JobStatus>("idle");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!jobId) {
      setStatus("idle");
      return;
    }

    setStatus("pending");

    const poll = async () => {
      try {
        const response = await JobAPI.getJobStatus(jobId);
        const body = response?.data?.body;
        if (!body) return;

        setStatus(body.status);

        if (body.status === "completed") {
          setResult(body.result);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        } else if (body.status === "failed") {
          setError(body.error || "Job failed");
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } catch {
        setError("Failed to check job status");
        setStatus("failed");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [jobId]);

  return { status, result, error };
}
