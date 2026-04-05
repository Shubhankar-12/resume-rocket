"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APPLICATION_STATUSES, STATUS_COLORS, STATUS_LABELS } from "../types/application";
import type { Application, ApplicationStatus } from "../types/application";
import { ApplicationCard } from "./ApplicationCard";

interface KanbanColumnProps {
  status: ApplicationStatus;
  applications: Application[];
  onCardClick: (application: Application) => void;
  onAddClick: (status: ApplicationStatus) => void;
  onDeleteCard: (applicationId: string) => void;
}

export function KanbanColumn({
  status,
  applications,
  onCardClick,
  onAddClick,
  onDeleteCard,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { status },
  });

  const sortedIds = applications.map((a) => a.application_id);

  // Status header accent colors
  const headerAccents: Record<ApplicationStatus, string> = {
    BOOKMARKED: "border-gray-400 dark:border-gray-500",
    APPLIED: "border-blue-400 dark:border-blue-500",
    PHONE_SCREEN: "border-yellow-400 dark:border-yellow-500",
    INTERVIEW: "border-purple-400 dark:border-purple-500",
    OFFER: "border-green-400 dark:border-green-500",
    REJECTED: "border-red-400 dark:border-red-500",
  };

  // Type assertion to ensure status is valid
  const validStatus = APPLICATION_STATUSES.includes(status)
    ? status
    : ("BOOKMARKED" as ApplicationStatus);

  return (
    <div className="flex flex-col min-w-[280px] w-72 flex-shrink-0">
      {/* Column header */}
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 rounded-t-lg border-b-2 bg-card border",
          headerAccents[validStatus]
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{STATUS_LABELS[validStatus]}</span>
          <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            {applications.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => onAddClick(status)}
          aria-label={`Add to ${STATUS_LABELS[validStatus]}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Drop area */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 rounded-b-lg p-2 space-y-2 min-h-[120px] border border-t-0 transition-colors",
          STATUS_COLORS[validStatus],
          isOver && "ring-2 ring-primary/40 ring-inset"
        )}
      >
        <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
          {applications.map((app) => (
            <ApplicationCard
              key={app.application_id}
              application={app}
              onClick={onCardClick}
              onDelete={onDeleteCard}
            />
          ))}
        </SortableContext>

        {applications.length === 0 && (
          <div className="flex items-center justify-center h-16 text-xs text-muted-foreground">
            No applications
          </div>
        )}
      </div>
    </div>
  );
}
