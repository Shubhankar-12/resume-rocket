import { userService } from "../axios";
import { getCookie } from "cookies-next";

export class JobAPI {
  static async getJobStatus(jobId: string) {
    const token = getCookie("token");
    const response = await userService.get("/jobs/status", {
      params: { job_id: jobId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
}
