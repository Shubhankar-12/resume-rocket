"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Application, ApplicationStatus, CreateApplicationData } from "../types/application";

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: Application | null;
  onSave: (data: CreateApplicationData) => Promise<void>;
  defaultStatus?: ApplicationStatus;
}

interface FormState {
  company: string;
  role: string;
  job_url: string;
  notes: string;
  applied_date: string;
  resume_id: string;
  cover_letter_id: string;
}

function buildInitialForm(application?: Application | null): FormState {
  if (application) {
    return {
      company: application.company ?? "",
      role: application.role ?? "",
      job_url: application.job_url ?? "",
      notes: application.notes ?? "",
      applied_date: application.applied_date ? application.applied_date.slice(0, 10) : "",
      resume_id: application.resume_id ?? "",
      cover_letter_id: application.cover_letter_id ?? "",
    };
  }
  return {
    company: "",
    role: "",
    job_url: "",
    notes: "",
    applied_date: "",
    resume_id: "",
    cover_letter_id: "",
  };
}

export function ApplicationDialog({
  open,
  onOpenChange,
  application,
  onSave,
  defaultStatus,
}: ApplicationDialogProps) {
  const isEditMode = Boolean(application);
  const [form, setForm] = useState<FormState>(() => buildInitialForm(application));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync form when dialog opens or application changes
  useEffect(() => {
    if (open) {
      setForm(buildInitialForm(application));
      setError(null);
    }
  }, [open, application, defaultStatus]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and role are required.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload: CreateApplicationData = {
        company: form.company.trim(),
        role: form.role.trim(),
        job_url: form.job_url.trim() || undefined,
        notes: form.notes.trim() || undefined,
        applied_date: form.applied_date || null,
        resume_id: form.resume_id.trim() || null,
        cover_letter_id: form.cover_letter_id.trim() || null,
      };
      if (defaultStatus && !isEditMode) {
        payload.status = defaultStatus;
      }
      await onSave(payload);
      onOpenChange(false);
    } catch {
      setError("Failed to save application. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Application" : "New Application"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded">{error}</p>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="company">
              Company <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="role">
              Role <span className="text-destructive">*</span>
            </Label>
            <Input
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="job_url">Job URL</Label>
            <Input
              id="job_url"
              name="job_url"
              type="url"
              value={form.job_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="applied_date">Applied Date</Label>
            <Input
              id="applied_date"
              name="applied_date"
              type="date"
              value={form.applied_date}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="resume_id">Resume ID</Label>
            <Input
              id="resume_id"
              name="resume_id"
              value={form.resume_id}
              onChange={handleChange}
              placeholder="Paste resume ID (optional)"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cover_letter_id">Cover Letter ID</Label>
            <Input
              id="cover_letter_id"
              name="cover_letter_id"
              value={form.cover_letter_id}
              onChange={handleChange}
              placeholder="Paste cover letter ID (optional)"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any notes about this application..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
