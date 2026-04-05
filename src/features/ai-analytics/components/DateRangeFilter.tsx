"use client";
import { cn } from "@/lib/utils";
import type { DateRange } from "../types/analytics";

interface DateRangeFilterProps {
  dateRange: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangeFilter({ dateRange, onChange }: DateRangeFilterProps) {
  const toDateInput = (iso: string) => iso.split("T")[0];

  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...dateRange, from: new Date(e.target.value).toISOString() });
  };

  const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...dateRange, to: new Date(e.target.value).toISOString() });
  };

  const handleGroupBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...dateRange, groupBy: e.target.value as DateRange["groupBy"] });
  };

  const inputClass = cn(
    "rounded-md border border-input bg-background px-3 py-1.5 text-sm",
    "text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring",
    "dark:bg-background dark:border-input"
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground whitespace-nowrap">From</label>
        <input
          type="date"
          value={toDateInput(dateRange.from)}
          onChange={handleFrom}
          className={inputClass}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground whitespace-nowrap">To</label>
        <input
          type="date"
          value={toDateInput(dateRange.to)}
          onChange={handleTo}
          className={inputClass}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground whitespace-nowrap">Group by</label>
        <select value={dateRange.groupBy} onChange={handleGroupBy} className={inputClass}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
    </div>
  );
}
