"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CacheStats as CacheStatsType } from "../types/analytics";

interface CacheStatsProps {
  cacheStats: CacheStatsType;
}

export function CacheStats({ cacheStats }: CacheStatsProps) {
  const hitPercent = Math.round(cacheStats.hitRate * 100);
  const taskRows = Object.entries(cacheStats.byTask).map(([task, stats]) => {
    const total = stats.hits + stats.misses;
    const rate = total > 0 ? ((stats.hits / total) * 100).toFixed(1) : "0.0";
    return { task, ...stats, total, rate };
  });

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Cache Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall hit rate visual */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Hit Rate</span>
            <span className="font-semibold text-foreground">{hitPercent}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                hitPercent >= 70
                  ? "bg-green-500"
                  : hitPercent >= 40
                    ? "bg-yellow-500"
                    : "bg-red-500"
              )}
              style={{ width: `${hitPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{cacheStats.hits} hits</span>
            <span>{cacheStats.misses} misses</span>
          </div>
        </div>

        {/* Per-task table */}
        {taskRows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-1.5 text-muted-foreground font-medium">Task</th>
                  <th className="text-right py-1.5 text-muted-foreground font-medium">Hits</th>
                  <th className="text-right py-1.5 text-muted-foreground font-medium">Misses</th>
                  <th className="text-right py-1.5 text-muted-foreground font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                {taskRows.map((row) => (
                  <tr key={row.task} className="border-b border-border last:border-0">
                    <td className="py-1.5 text-foreground capitalize">
                      {row.task.replace(/_/g, " ")}
                    </td>
                    <td className="py-1.5 text-right text-green-600 dark:text-green-400">
                      {row.hits}
                    </td>
                    <td className="py-1.5 text-right text-red-500 dark:text-red-400">
                      {row.misses}
                    </td>
                    <td className="py-1.5 text-right text-foreground">{row.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
