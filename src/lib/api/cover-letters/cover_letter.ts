import { convertToSearchParams } from "@/helpers/utils";
import { userService } from "../axios";
import { getCookie } from "cookies-next";

class CoverLetterAPI {
  static async getAllCoverLetters(data: any) {
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
  static async createCoverLetter(data: any) {
    return userService.post("/cover-letter/create", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }

  // /cover-letter/update PATCH
  static async updateCoverLetter(data: any) {
    return userService.patch("/cover-letter/update", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }

  static async getCoverLetterById(id: any) {
    return userService.get("/cover-letter?cover_letter_id=" + id, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
}

export default CoverLetterAPI;
