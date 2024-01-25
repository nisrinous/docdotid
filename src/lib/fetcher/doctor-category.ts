import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;

export async function getDoctorCategories() {
  try {
    const response = await fetch(`${API_ENDPOINT}/specialists`, {
      method: "GET",
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
