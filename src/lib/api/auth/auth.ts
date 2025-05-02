import axios from "axios";
import { userService } from "../axios";
import { getCookie } from "cookies-next";
import { convertToSearchParams } from "@/helpers/utils";

interface GuestTokenGenerationData {
  device_id: string;
  device_os_type: string;
  device_one_signal_id: string;
}

let employeeBaseUrl = process.env.EMPLOYEE_BASE_URL;

interface LoginData {
  email: string;
  password: string;
}

class AuthAPI {
  static async logout() {
    return userService.post("/logout");
  }

  static async githubAuth(data: any) {
    try {
      let response = await userService.post("/auth/github", data, {
        headers: {
          Authorization: `Bearer ` + getCookie("token"),
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async loginWithEmailPassword(data: any) {
    return userService.post("/auth/login", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("guest_token"),
      },
    });
  }
  static async registerWithEmail(data: any) {
    return userService.post("/auth/register", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("guest_token"),
      },
    });
  }
}

export default AuthAPI;
