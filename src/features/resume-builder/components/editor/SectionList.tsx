"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { BuilderResume, BuilderPatch, SectionKey } from "../../types";
import { SECTION_KEYS } from "../../types";
import { SECTION_EDITORS } from "./sectionRegistry";
import { BasicsSection } from "./sections/BasicsSection";

function orderedKeys(resume: BuilderResume): SectionKey[] {
  const order = (resume.section_order ?? []).filter((k): k is SectionKey =>
    (SECTION_KEYS as readonly string[]).includes(k)
  );
  for (const k of SECTION_KEYS) if (!order.includes(k)) order.push(k);
  return order;
}

function SortableSection({
  id,
  draft,
  update,
}: {
  id: SectionKey;
  draft: BuilderResume;
  update: (patch: BuilderPatch) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const { label, Component } = SECTION_EDITORS[id];

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-lg border border-rr-border-muted bg-rr-card p-3 ${
        isDragging ? "opacity-60 shadow-lg" : ""
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <button
          type="button"
          aria-label={`Reorder ${label}`}
          className="cursor-grab touch-none text-rr-text-muted hover:text-rr-text active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
          {label}
        </p>
      </div>
      <Component draft={draft} update={update} />
    </div>
  );
}

export function SectionList({
  draft,
  update,
}: {
  draft: BuilderResume;
  update: (patch: BuilderPatch) => void;
}) {
  const keys = orderedKeys(draft);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = keys.indexOf(active.id as SectionKey);
    const newIndex = keys.indexOf(over.id as SectionKey);
    if (oldIndex < 0 || newIndex < 0) return;
    update({ section_order: arrayMove(keys, oldIndex, newIndex) });
  };

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-rr-border-muted bg-rr-card p-3">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
          Basics
        </p>
        <BasicsSection draft={draft} update={update} />
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={keys} strategy={verticalListSortingStrategy}>
          {keys.map((key) => (
            <SortableSection key={key} id={key} draft={draft} update={update} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
