"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TaskBreakdownProps {
  byTask: Record<string, { calls: number; cost: number; avgLatency: number }>;
}

export function TaskBreakdown({ byTask }: TaskBreakdownProps) {
  const rows = Object.entries(byTask)
    .map(([task, stats]) => ({ task, ...stats }))
    .sort((a, b) => b.cost - a.cost);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Task Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Task</th>
              <th className="text-right py-2 px-3 text-muted-foreground font-medium">Calls</th>
              <th className="text-right py-2 px-3 text-muted-foreground font-medium">Cost ($)</th>
              <th className="text-right py-2 px-3 text-muted-foreground font-medium">
                Avg Latency (ms)
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.task}
                className={cn(
                  "border-b border-border last:border-0 transition-colors",
                  i % 2 === 0 ? "bg-transparent" : "bg-muted/30 dark:bg-muted/10"
                )}
              >
                <td className="py-2 px-3 font-medium text-foreground capitalize">
                  {row.task.replace(/_/g, " ")}
                </td>
                <td className="py-2 px-3 text-right text-foreground">
                  {row.calls.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right text-foreground">{row.cost.toFixed(4)}</td>
                <td className="py-2 px-3 text-right text-foreground">
                  {row.avgLatency.toFixed(0)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-muted-foreground">
                  No task data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
