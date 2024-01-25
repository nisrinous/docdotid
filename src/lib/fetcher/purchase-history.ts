import { apiBaseUrl } from "@/config";
import toast from "react-hot-toast";

const API_ENDPOINT = apiBaseUrl;

export async function getMedicineOrders(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/orders/histories`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.data) {
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("" + error);
  }
}
