import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ChangeEvent } from "react";

interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  languageColor: string;
  topics: string[];
  updated_at: string;
  additional_comments?: string;
}

interface RepositoryCardProps {
  repository: Repository;
  isSelected: boolean;
  onToggleSelect: () => void;
  onCommentChange?: (id: number, value: string) => void;
  disabled: boolean;
}

export function RepositoryCard({
  repository,
  isSelected,
  onToggleSelect,
  onCommentChange,
  disabled,
}: RepositoryCardProps) {
  const {
    id,
    name,
    description,
    stars,
    language,
    languageColor,
    topics,
    updated_at,
    additional_comments,
  } = repository;

  return (
    <Card
      className={`transition-all ${
        isSelected ? "border-primary ring-1 ring-primary" : ""
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {description}
            </CardDescription>
          </div>
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleSelect}
            disabled={disabled && !isSelected}
            className="h-5 w-5"
            aria-label={
              isSelected ? "Unselect repository" : "Select repository"
            }
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {topics.slice(0, 4).map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
          {topics.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{topics.length - 4} more
            </Badge>
          )}
        </div>

        {isSelected && (
          <Input
            placeholder="Add a comment..."
            value={additional_comments || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onCommentChange?.(id, e.target.value)
            }
            className="text-sm"
          />
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
        <div className="text-xs text-muted-foreground">
          Updated{" "}
          {formatDistanceToNow(new Date(updated_at), { addSuffix: true })}
        </div>
      </CardFooter>
    </Card>
  );
}
