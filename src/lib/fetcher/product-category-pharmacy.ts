import { apiBaseUrl } from "@/config";
import toast from "react-hot-toast";

const API_ENDPOINT = apiBaseUrl;

export async function getProductsPharmacy(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies/categories`, {
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
