"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProviderBreakdownProps {
  byProvider: Record<string, { calls: number; cost: number }>;
}

const PROVIDER_COLORS: Record<string, string> = {
  openai: "#10b981",
  anthropic: "#8b5cf6",
  gemini: "#f59e0b",
  default0: "#3b82f6",
  default1: "#ef4444",
  default2: "#06b6d4",
};

export function ProviderBreakdown({ byProvider }: ProviderBreakdownProps) {
  const data = Object.entries(byProvider).map(([provider, stats]) => ({
    name: provider.charAt(0).toUpperCase() + provider.slice(1),
    key: provider.toLowerCase(),
    cost: Number(stats.cost.toFixed(4)),
    calls: stats.calls,
  }));

  const getColor = (key: string, index: number) =>
    PROVIDER_COLORS[key] ?? PROVIDER_COLORS[`default${index % 3}`] ?? "#6b7280";

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Provider Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="cost"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={80}
              strokeWidth={2}
              stroke="hsl(var(--background))"
            >
              {data.map((entry, index) => (
                <Cell key={entry.key} fill={getColor(entry.key, index)} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                color: "hsl(var(--foreground))",
                fontSize: "12px",
              }}
              formatter={(value, name) => [`$${value}`, name]}
            />
            <Legend
              wrapperStyle={{
                fontSize: "12px",
                color: "hsl(var(--foreground))",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
