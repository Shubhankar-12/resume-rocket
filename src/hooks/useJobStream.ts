"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getCookie } from "cookies-next";

type StreamStatus = "idle" | "connecting" | "streaming" | "completed" | "failed";

interface UseJobStreamResult {
  status: StreamStatus;
  text: string;
  coverId: string | null;
  error: string | null;
}

export function useJobStream(jobId: string | null): UseJobStreamResult {
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [text, setText] = useState("");
  const [coverId, setCoverId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!jobId) {
      setStatus("idle");
      setText("");
      setCoverId(null);
      setError(null);
      return;
    }

    setStatus("connecting");
    setText("");
    setCoverId(null);
    setError(null);

    const token = getCookie("token") as string;
    if (!token) {
      setStatus("failed");
      setError("Not authenticated");
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_USER_API || "http://localhost:8010";
    const url = `${baseUrl}/api/v1/jobs/stream?job_id=${encodeURIComponent(jobId)}&token=${encodeURIComponent(token)}`;

    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "token") {
          setStatus("streaming");
          setText((prev) => prev + data.content);
        } else if (data.type === "done") {
          setStatus("completed");
          if (data.coverId) {
            setCoverId(data.coverId);
          }
          cleanup();
        } else if (data.type === "error") {
          setStatus("failed");
          setError(data.content || "Stream error");
          cleanup();
        }
      } catch {
        // Ignore parse errors (heartbeat comments, etc.)
      }
    };

    es.onerror = () => {
      if (es.readyState === EventSource.CLOSED) {
        setStatus("failed");
        setError("Connection lost");
        cleanup();
      }
    };

    return cleanup;
  }, [jobId, cleanup]);

  return { status, text, coverId, error };
}
