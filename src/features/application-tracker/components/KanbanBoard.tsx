"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { APPLICATION_STATUSES } from "../types/application";
import type { Application, ApplicationStatus, KanbanColumns } from "../types/application";
import { ApplicationCard } from "./ApplicationCard";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanBoardProps {
  columns: KanbanColumns;
  onReorder: (applicationId: string, newStatus: ApplicationStatus, newPosition: number) => void;
  onCardClick: (application: Application) => void;
  onAddClick: (status: ApplicationStatus) => void;
  onDeleteCard: (applicationId: string) => void;
}

export function KanbanBoard({
  columns,
  onReorder,
  onCardClick,
  onAddClick,
  onDeleteCard,
}: KanbanBoardProps) {
  const [activeApplication, setActiveApplication] = useState<Application | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current as
      | { application_id: string; status: ApplicationStatus; position: number }
      | undefined;
    if (!data) return;

    // Find the application from columns
    const app = columns[data.status]?.find((a) => a.application_id === data.application_id);
    if (app) setActiveApplication(app);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveApplication(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current as
      | { application_id: string; status: ApplicationStatus; position: number }
      | undefined;
    if (!activeData) return;

    // Determine target status: over could be a column (id = status) or a card
    let targetStatus: ApplicationStatus;
    const overData = over.data.current as
      | { application_id?: string; status?: ApplicationStatus; sortable?: { containerId: string } }
      | undefined;

    if (overData?.status && APPLICATION_STATUSES.includes(overData.status)) {
      // Dropped on a column droppable
      targetStatus = overData.status;
    } else if (
      overData?.sortable?.containerId &&
      APPLICATION_STATUSES.includes(overData.sortable.containerId as ApplicationStatus)
    ) {
      // Dropped on a sortable card — use the card's container
      targetStatus = overData.sortable.containerId as ApplicationStatus;
    } else if (APPLICATION_STATUSES.includes(over.id as ApplicationStatus)) {
      // Fallback: over.id is a status string
      targetStatus = over.id as ApplicationStatus;
    } else {
      return;
    }

    // Calculate new position
    const targetColumn = columns[targetStatus] ?? [];
    let newPosition: number;

    if (overData?.application_id) {
      // Dropped on a card — insert at that card's current index
      const overIndex = targetColumn.findIndex((a) => a.application_id === over.id);
      newPosition = overIndex >= 0 ? overIndex : targetColumn.length;
    } else {
      // Dropped on column — append
      newPosition = targetColumn.length;
    }

    // If same column and same position, do nothing
    if (activeData.status === targetStatus && activeData.position === newPosition) return;

    onReorder(activeData.application_id, targetStatus, newPosition);
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {APPLICATION_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            applications={columns[status] ?? []}
            onCardClick={onCardClick}
            onAddClick={onAddClick}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>

      {/* Drag overlay for smooth visual feedback */}
      <DragOverlay>
        {activeApplication ? (
          <div className="opacity-90 rotate-1 shadow-xl">
            <ApplicationCard
              application={activeApplication}
              onClick={() => {}}
              onDelete={() => {}}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
