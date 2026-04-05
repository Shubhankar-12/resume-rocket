import { userService } from "@/lib/api/axios";
import { getCookie } from "cookies-next";

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getCookie("token")}` },
});

export class OnboardingAPI {
  static async updateProfile(data: {
    user_id: string;
    career_goal?: string;
    target_role?: string;
    onboarding_completed?: boolean;
  }) {
    return userService.patch("/user/profile", data, authHeaders());
  }

  static async getRoles() {
    return userService.get("/user/roles");
  }
}
