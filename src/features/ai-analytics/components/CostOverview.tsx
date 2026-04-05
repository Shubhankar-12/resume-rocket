"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AnalyticsResponse } from "../types/analytics";

interface CostOverviewProps {
  data: AnalyticsResponse;
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

export function CostOverview({ data }: CostOverviewProps) {
  const avgLatency = (() => {
    const tasks = Object.values(data.byTask);
    if (tasks.length === 0) return 0;
    const totalWeightedLatency = tasks.reduce((sum, t) => sum + t.avgLatency * t.calls, 0);
    const totalCalls = tasks.reduce((sum, t) => sum + t.calls, 0);
    return totalCalls > 0 ? totalWeightedLatency / totalCalls : 0;
  })();

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4")}>
      <StatCard
        title="Total Cost"
        value={`$${data.totalCost.toFixed(4)}`}
        subtitle="All AI API calls"
      />
      <StatCard
        title="Total API Calls"
        value={data.totalCalls.toLocaleString()}
        subtitle="Across all providers"
      />
      <StatCard
        title="Cache Hit Rate"
        value={`${(data.cacheHitRate * 100).toFixed(1)}%`}
        subtitle="Requests served from cache"
      />
      <StatCard
        title="Avg Latency"
        value={`${avgLatency.toFixed(0)} ms`}
        subtitle="Weighted across tasks"
      />
    </div>
  );
}
