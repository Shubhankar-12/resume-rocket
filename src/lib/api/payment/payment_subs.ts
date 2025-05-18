import { convertToSearchParams } from "@/helpers/utils";
import { userService } from "../axios";
import { getCookie } from "cookies-next";

class PaymentSubcriptionAPI {
  static async createSubscription(data: any) {
    return userService.post("/payment-subscription/create", data, {
      headers: {
        Authorization: `Bearer ` + getCookie("token"),
      },
    });
  }
}

export default PaymentSubcriptionAPI;
