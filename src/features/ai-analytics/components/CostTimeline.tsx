"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimelineEntry } from "../types/analytics";

interface CostTimelineProps {
  timeline: TimelineEntry[];
}

export function CostTimeline({ timeline }: CostTimelineProps) {
  const formatted = timeline.map((entry) => ({
    ...entry,
    date: new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    cost: Number(entry.cost.toFixed(4)),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Cost &amp; Usage Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={formatted} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis
              yAxisId="cost"
              orientation="left"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              yAxisId="calls"
              orientation="right"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                color: "hsl(var(--foreground))",
                fontSize: "12px",
              }}
              formatter={(value, name) =>
                name === "cost" ? [`$${value}`, "Cost"] : [value, "Calls"]
              }
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "hsl(var(--foreground))" }} />
            <Line
              yAxisId="cost"
              type="monotone"
              dataKey="cost"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="cost"
            />
            <Line
              yAxisId="calls"
              type="monotone"
              dataKey="calls"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              name="calls"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
