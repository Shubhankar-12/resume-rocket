import { convertToSearchParams } from "@/helpers/utils";
import { userService } from "../axios";
import { getCookie } from "cookies-next";

class ResumeAPI {
  static async getAllResumes(data: any) {
    return userService.get("/resume/list?" + convertToSearchParams(data), {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }

  static async getResume(id: any) {
    return userService.get("/resume?resume_id=" + id, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }

  static async createResume(data: any) {
    return userService.post("/resume/create", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
  static async createReport(data: any) {
    return userService.post("/resume/report/create", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
  static async getResumeReport(id: any) {
    return userService.get("/resume/report?resume_id=" + id, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }

  // /disble patch
  static async updateResume(data: any) {
    return userService.patch("/resume/disable", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
}

export default ResumeAPI;
