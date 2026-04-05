"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModelBreakdownProps {
  byModel: Record<string, { calls: number; cost: number; avgLatency: number }>;
}

export function ModelBreakdown({ byModel }: ModelBreakdownProps) {
  const data = Object.entries(byModel).map(([model, stats]) => ({
    model: model.length > 16 ? model.slice(0, 14) + "…" : model,
    calls: stats.calls,
    cost: Number(stats.cost.toFixed(4)),
  }));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Model Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis
              type="category"
              dataKey="model"
              width={90}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                color: "hsl(var(--foreground))",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "hsl(var(--foreground))" }} />
            <Bar dataKey="calls" fill="#3b82f6" name="Calls" radius={[0, 3, 3, 0]} />
            <Bar dataKey="cost" fill="#f59e0b" name="Cost ($)" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
