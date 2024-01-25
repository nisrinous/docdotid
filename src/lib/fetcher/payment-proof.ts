import router from "next/router";
import toast from "react-hot-toast";
import { apiBaseUrl, appBaseUrl } from "@/config";
const API_ENDPOINT = apiBaseUrl;
const APP_ENDPOINT = appBaseUrl;

export async function uploadProof(token: string, id: string, image: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/orders/image`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        image: image,
      }),
    });
    const data = await response.json();
    if (data.data) {
      toast.success("Payment proof uploaded successfully");
      router.push(`${APP_ENDPOINT}/user/purchasehistory`);
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    toast.error("" + error);
  }
}
