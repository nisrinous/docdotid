import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;

export async function getPharmacyList(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies`, {
      method: "GET",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
