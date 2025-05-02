import { convertToSearchParams } from "@/helpers/utils";
import { userService } from "../axios";
import { getCookie } from "cookies-next";

class UserAPI {
  static async getAllUsers(data: any) {
    return userService.get("/user/list?" + convertToSearchParams(data), {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }

  static async getUser(id: any) {
    return userService.get("/user?user_id=" + id, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }

  static async uploadDoc(data: any, folderPath?: any) {
    if (folderPath !== undefined) data.append("folder", folderPath);
    return userService.post("/media/upload-doc", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
  static async connectWithGithub(data: any) {
    return userService.patch("/user/connect-github", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
}

export default UserAPI;
