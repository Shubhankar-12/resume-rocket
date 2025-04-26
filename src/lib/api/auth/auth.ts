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
  static async login(data: LoginData) {
    return userService.post("/employee/login/email", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("guest_token"),
      },
    });
  }

  static async logout() {
    return userService.post("/logout");
  }

  static async generateGuestToken(data: GuestTokenGenerationData) {
    try {
      let response = await userService.post("/token/generate", data);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateToken(data: any) {
    try {
      let response = await userService.post("/token/update", data, {
        headers: {
          Authorization: `Bearer ` + getCookie("token"),
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getEmployeePermissions() {
    try {
      let response = await userService.get("/employee/permissions", {
        headers: {
          Authorization: `Bearer ` + getCookie("token"),
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
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
}

export default AuthAPI;
