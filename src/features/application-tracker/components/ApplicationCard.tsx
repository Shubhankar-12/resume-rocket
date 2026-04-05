"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDistanceToNow } from "date-fns";
import { FileText, GripVertical, Mail, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Application } from "../types/application";

interface ApplicationCardProps {
  application: Application;
  onClick: (application: Application) => void;
  onDelete: (applicationId: string) => void;
}

export function ApplicationCard({ application, onClick, onDelete }: ApplicationCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: application.application_id,
    data: {
      application_id: application.application_id,
      status: application.status,
      position: application.position,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-id={application.application_id}
      data-status={application.status}
    >
      <Card
        className={cn(
          "relative p-3 cursor-pointer hover:border-primary/50 transition-colors select-none",
          isDragging && "opacity-50 shadow-lg ring-2 ring-primary/30"
        )}
        onClick={() => onClick(application)}
      >
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute left-1 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
          aria-label="Drag handle"
        >
          <GripVertical className="h-3 w-3" />
        </div>

        {/* Delete button */}
        <button
          className="absolute right-1.5 top-1.5 p-0.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(application.application_id);
          }}
          aria-label="Delete application"
        >
          <X className="h-3 w-3" />
        </button>

        {/* Content */}
        <div className="pl-4 pr-4">
          <p className="font-semibold text-sm leading-tight truncate">{application.company}</p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{application.role}</p>

          {application.applied_date && (
            <p className="text-xs text-muted-foreground mt-1.5">
              Applied {formatDistanceToNow(new Date(application.applied_date), { addSuffix: true })}
            </p>
          )}

          {/* Badges */}
          {(application.resume_id || application.cover_letter_id) && (
            <div className="flex items-center gap-1 mt-2">
              {application.resume_id && (
                <span className="inline-flex items-center gap-0.5 text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                  <FileText className="h-2.5 w-2.5" />
                  Resume
                </span>
              )}
              {application.cover_letter_id && (
                <span className="inline-flex items-center gap-0.5 text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                  <Mail className="h-2.5 w-2.5" />
                  Letter
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
