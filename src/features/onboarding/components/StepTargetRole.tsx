"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface StepTargetRoleProps {
  roles: string[];
  loading: boolean;
  selected: string | null;
  onSelect: (role: string) => void;
}

export function StepTargetRole({ roles, loading, selected, onSelect }: StepTargetRoleProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? roles.filter((r) => r.toLowerCase().includes(query.toLowerCase()))
    : roles;

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">What&apos;s your target role?</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ll tailor your resume suggestions to this role.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search roles..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="h-48 overflow-y-auto rounded-md border border-border">
        {loading ? (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            Loading roles...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            No roles found
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((role) => (
              <li key={role}>
                <button
                  type="button"
                  className={cn(
                    "w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted focus:outline-none focus:bg-muted",
                    selected === role ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                  )}
                  onClick={() => onSelect(role)}
                >
                  {role}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <p className="text-xs text-muted-foreground text-center">
          Selected: <span className="font-medium text-foreground">{selected}</span>
        </p>
      )}
    </div>
  );
}
