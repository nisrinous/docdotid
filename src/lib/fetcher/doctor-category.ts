import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;

export async function getDoctorCategories() {
  try {
    const response = await fetch(`${API_ENDPOINT}/specialists`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
