import { convertToSearchParams } from "@/helpers/utils";
import { userService } from "../axios";
import { getCookie } from "cookies-next";

class TailoredResumeAPI {
  // /tailored-resume/create POST
  static async createResume(data: any) {
    return userService.post("/tailored-resume/create", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }

  // /tailored-resume/match POST
  static async matchResume(data: any) {
    return userService.post("/tailored-resume/match", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
  static async getTailoredResumeById(id: string) {
    return userService.get("/tailored-resume?tailored_resume_id=" + id, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
}

export default TailoredResumeAPI;
