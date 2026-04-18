import axios, { AxiosInstance } from "axios";
import { emitOutOfCredits } from "@/lib/events/outOfCredits";

// Define your base URLs
const SERVICE_URL = {
  USER:
    process.env.NEXT_PUBLIC_MODE == "PRODUCTION"
      ? process.env.NEXT_PUBLIC_SERVICE_BASE_URL + "/user"
      : process.env.NEXT_PUBLIC_USER_API + "",
};

// Create axios instances
export const userService: AxiosInstance = axios.create({
  baseURL: SERVICE_URL.USER + "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept 402 INSUFFICIENT_CREDITS responses and raise the OutOfCredits modal.
userService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 402 &&
      error?.response?.data?.error === "INSUFFICIENT_CREDITS"
    ) {
      const needed = Number(error.response.data.creditsNeeded) || 1;
      emitOutOfCredits(needed);
    }
    return Promise.reject(error);
  }
);
