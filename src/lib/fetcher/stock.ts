import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;

export async function getStockByPharmacy(token: string, pharmacy_id: number) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/pharmacies/${pharmacy_id}/products`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
