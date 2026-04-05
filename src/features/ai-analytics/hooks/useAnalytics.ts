"use client";
import { useState, useEffect, useCallback } from "react";
import { AIAnalyticsAPI } from "../api/aiAnalyticsAPI";
import type { AnalyticsResponse, DateRange } from "../types/analytics";

const defaultRange: DateRange = {
  from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  to: new Date().toISOString(),
  groupBy: "day",
};

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>(defaultRange);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AIAnalyticsAPI.getAnalytics(dateRange);
      setData(response.data.body);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message || "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, error, dateRange, setDateRange, refetch: fetchAnalytics };
}
