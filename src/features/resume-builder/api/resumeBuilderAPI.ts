import { userService } from "@/lib/api/axios";
import { getCookie } from "cookies-next";
import type { BuilderPatch, TemplateId } from "../types";

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getCookie("token")}` },
});

export interface CreateDraftInput {
  user_id: string;
  title: string;
  template_id: TemplateId;
  seed_from_resume_id?: string | null;
}

export class ResumeBuilderAPI {
  static async list(user_id: string) {
    return userService.get("/resume-builder/list", {
      params: { user_id },
      ...authHeaders(),
    });
  }

  static async create(data: CreateDraftInput) {
    return userService.post("/resume-builder/create", data, authHeaders());
  }

  static async get(resume_draft_id: string) {
    return userService.get("/resume-builder", {
      params: { resume_draft_id },
      ...authHeaders(),
    });
  }

  static async update(resume_draft_id: string, patch: BuilderPatch) {
    return userService.patch("/resume-builder", { resume_draft_id, patch }, authHeaders());
  }

  static async disable(resume_draft_id: string, user_id: string) {
    return userService.post("/resume-builder/disable", { resume_draft_id, user_id }, authHeaders());
  }
}
