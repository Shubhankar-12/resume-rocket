import { convertToSearchParams } from "@/helpers/utils";
import { userService } from "../axios";
import { getCookie } from "cookies-next";

class ProjectAnalysisAPI {
  // /cover-letter/create POST
  static async createProjectAnalysis(data: any) {
    return userService.post("/user/project-analysis/create", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
}

export default ProjectAnalysisAPI;
