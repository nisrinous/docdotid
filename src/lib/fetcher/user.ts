import { apiBaseUrl } from "@/config";
import { UserDetailResponse } from "@/types";

const API_ENDPOINT = apiBaseUrl;

export async function getUserDetail(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/users/detail`, {
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

export async function putUserDetail(
  token: string,
  changes: Partial<UserDetailResponse>
): Promise<UserDetailResponse | undefined> {
  try {
    const response = await fetch(`${API_ENDPOINT}/users/detail`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });

    if (response.ok) {
      const data: UserDetailResponse = await response.json();
      return data;
    } else {
      console.error(`Error updating user details. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("" + error);
  }
}
