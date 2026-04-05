export interface AnalyticsResponse {
  totalCost: number;
  totalCalls: number;
  cacheHitRate: number;
  byModel: Record<string, { calls: number; cost: number; avgLatency: number }>;
  byTask: Record<string, { calls: number; cost: number; avgLatency: number }>;
  byProvider: Record<string, { calls: number; cost: number }>;
  timeline: TimelineEntry[];
  cacheStats: CacheStats;
}

export interface TimelineEntry {
  date: string;
  cost: number;
  calls: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  byTask: Record<string, { hits: number; misses: number }>;
}

export interface DateRange {
  from: string;
  to: string;
  groupBy: "day" | "week" | "month";
}
