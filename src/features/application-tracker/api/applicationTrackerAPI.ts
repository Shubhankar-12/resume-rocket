import { userService } from "@/lib/api/axios";
import { getCookie } from "cookies-next";
import { CreateApplicationData, Application } from "../types/application";

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getCookie("token")}` },
});

export interface UpdateApplicationData extends Partial<Application> {
  application_id: string;
  user_id: string;
}

export class ApplicationTrackerAPI {
  static async list(params: { user_id: string; search?: string; sort?: string }) {
    return userService.get("/application-tracker/list", { params, ...authHeaders() });
  }

  static async create(data: CreateApplicationData & { user_id: string }) {
    return userService.post("/application-tracker/create", data, authHeaders());
  }

  static async update(data: UpdateApplicationData) {
    return userService.patch("/application-tracker/update", data, authHeaders());
  }

  static async reorder(data: { application_id: string; new_status: string; new_position: number }) {
    return userService.patch("/application-tracker/reorder", data, authHeaders());
  }

  static async disable(data: { application_id: string; user_id: string }) {
    return userService.patch("/application-tracker/disable", data, authHeaders());
  }
}
