"use client";
import { useAnalytics } from "../hooks/useAnalytics";
import { DateRangeFilter } from "./DateRangeFilter";
import { CostOverview } from "./CostOverview";
import { CostTimeline } from "./CostTimeline";
import { ModelBreakdown } from "./ModelBreakdown";
import { TaskBreakdown } from "./TaskBreakdown";
import { ProviderBreakdown } from "./ProviderBreakdown";
import { CacheStats } from "./CacheStats";

export function AIAnalyticsPage() {
  const { data, loading, error, dateRange, setDateRange } = useAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-destructive">
        <p>Failed to load analytics: {error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">AI Analytics</h1>
        <DateRangeFilter dateRange={dateRange} onChange={setDateRange} />
      </div>
      <CostOverview data={data} />
      <CostTimeline timeline={data.timeline} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ModelBreakdown byModel={data.byModel} />
        <ProviderBreakdown byProvider={data.byProvider} />
        <CacheStats cacheStats={data.cacheStats} />
      </div>
      <TaskBreakdown byTask={data.byTask} />
    </div>
  );
}
