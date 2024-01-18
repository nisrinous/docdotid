import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;

export async function getDoctors(token: string) {
  try {
    let url = `${API_ENDPOINT}/doctors`;

    const response = await fetch(url, {
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

export async function getDoctor(token: string, doctorId: number) {
  try {
    let url = `${API_ENDPOINT}/doctors/${doctorId}`;

    const response = await fetch(url, {
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
