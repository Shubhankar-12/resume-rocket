"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApplications } from "../hooks/useApplications";
import type { Application, ApplicationStatus, CreateApplicationData } from "../types/application";
import { ApplicationDialog } from "./ApplicationDialog";
import { KanbanBoard } from "./KanbanBoard";

export function ApplicationTrackerPage() {
  const {
    columns,
    loading,
    error,
    search,
    setSearch,
    sort,
    setSort,
    createApplication,
    updateApplication,
    reorderApplication,
    deleteApplication,
  } = useApplications();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<ApplicationStatus>("BOOKMARKED");

  function openCreateDialog(status: ApplicationStatus = "BOOKMARKED") {
    setEditingApplication(null);
    setDefaultStatus(status);
    setDialogOpen(true);
  }

  function openEditDialog(application: Application) {
    setEditingApplication(application);
    setDefaultStatus(application.status);
    setDialogOpen(true);
  }

  async function handleSave(data: CreateApplicationData) {
    if (editingApplication) {
      await updateApplication(editingApplication.application_id, data);
    } else {
      await createApplication(data);
    }
  }

  function toggleSort() {
    setSort(sort === "created_on_desc" ? "created_on_asc" : "created_on_desc");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive bg-destructive/10 px-4 py-3 rounded-lg inline-block">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold flex-shrink-0">Application Tracker</h1>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              className="pl-8"
              placeholder="Search company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button variant="outline" size="sm" onClick={toggleSort}>
            {sort === "created_on_desc" ? "Newest" : "Oldest"}
          </Button>
        </div>

        <Button size="sm" onClick={() => openCreateDialog()} className="flex-shrink-0">
          <Plus className="h-4 w-4 mr-1.5" />
          New Application
        </Button>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard
          columns={columns}
          onReorder={reorderApplication}
          onCardClick={openEditDialog}
          onAddClick={openCreateDialog}
          onDeleteCard={deleteApplication}
        />
      </div>

      {/* Dialog */}
      <ApplicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        application={editingApplication}
        onSave={handleSave}
        defaultStatus={defaultStatus}
      />
    </div>
  );
}
