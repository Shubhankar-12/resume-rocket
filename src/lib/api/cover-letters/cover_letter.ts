import { convertToSearchParams } from "@/helpers/utils";
import { userService } from "../axios";
import { getCookie } from "cookies-next";

class CoverLetterAPI {
  static async getAllResumes(data: any) {
    return userService.get(
      "/cover-letter/list?" + convertToSearchParams(data),
      {
        headers: {
          Authorization: `Bearer ` + getCookie("token"),
        },
      }
    );
  }

  // /cover-letter/create POST
  static async createResume(data: any) {
    return userService.post("/cover-letter/create", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
}

export default CoverLetterAPI;
