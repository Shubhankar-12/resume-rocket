"use client";

import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Suggestion {
  title: string;
  description: string;
}

interface StepScoreProps {
  score: number;
  suggestions: Suggestion[];
  onComplete: () => void;
}

function getScoreColor(score: number) {
  if (score > 75) return "text-green-600 dark:text-green-400";
  if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function getScoreIcon(score: number) {
  if (score > 75) return <CheckCircle className="h-6 w-6 text-green-500" />;
  if (score >= 50) return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
  return <XCircle className="h-6 w-6 text-red-500" />;
}

function getScoreLabel(score: number) {
  if (score > 75) return "Great resume!";
  if (score >= 50) return "Needs improvement";
  return "Needs significant work";
}

export function StepScore({ score, suggestions, onComplete }: StepScoreProps) {
  const topSuggestions = suggestions.slice(0, 3);

  return (
    <div className="space-y-5">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">Your resume score</h2>
        <p className="text-sm text-muted-foreground">Here&apos;s how your resume performed.</p>
      </div>

      {/* Score display */}
      <div className="flex flex-col items-center gap-2 py-4">
        <span className={cn("text-6xl font-bold tabular-nums", getScoreColor(score))}>{score}</span>
        <span className="text-sm text-muted-foreground font-medium">out of 100</span>
        <div className="flex items-center gap-1.5 mt-1">
          {getScoreIcon(score)}
          <span className="text-sm font-medium">{getScoreLabel(score)}</span>
        </div>
      </div>

      {/* Top suggestions */}
      {topSuggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Top improvements</p>
          <ul className="space-y-2">
            {topSuggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 rounded-md bg-muted/50 px-3 py-2">
                <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <span className="text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                    !
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug">{s.title}</p>
                  {s.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {s.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button className="w-full" onClick={onComplete}>
        Go to Dashboard
      </Button>
    </div>
  );
}
