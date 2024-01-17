import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;

export async function getOrders(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/orders/reports`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
