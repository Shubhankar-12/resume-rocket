"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, X } from "lucide-react";

export interface SelectedProject {
  topics: string[];
  _id: string;
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  languageColor: string;
  additional_comments: string;
  ai_score: number;
  relevance: string;
  reason: string;
  key_points: string[];
}

interface SelectedProjectCardProps {
  repository: SelectedProject;

  onRemove: () => void;
}

export function SelectedProjectCard({
  repository,

  onRemove,
}: SelectedProjectCardProps) {
  const {
    name,
    description,
    stars,
    language,
    languageColor,
    topics,
    ai_score,
    reason,
    relevance,
  } = repository;

  // Determine badge color based on relevance
  const relevanceBadgeVariant =
    relevance === "High"
      ? "default"
      : relevance === "Medium"
      ? "secondary"
      : "outline";

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove project</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {topics.slice(0, 4).map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Relevance Score</div>
            <div className="flex items-center gap-2">
              <Badge variant={relevanceBadgeVariant}>{relevance}</Badge>
              <span className="font-bold">{ai_score}/100</span>
            </div>
          </div>
          <Progress value={ai_score} className="h-2" />
        </div>

        <div className="rounded-md bg-muted p-3">
          <p className="text-sm">{reason || "No reason provided"}</p>
        </div>
        {repository.key_points?.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Key Points</div>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
              {repository.key_points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: languageColor }}
              aria-hidden="true"
            ></div>
            <span>{language}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
