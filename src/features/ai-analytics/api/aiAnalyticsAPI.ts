import { userService } from "@/lib/api/axios";
import type { DateRange } from "../types/analytics";

export class AIAnalyticsAPI {
  static getAnalytics(params: DateRange) {
    return userService.get("/ai/analytics", { params });
  }
}
