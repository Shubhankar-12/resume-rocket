import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

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
  // You can add your custom config here
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookie("token"),
  },
});
