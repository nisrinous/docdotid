import { apiBaseUrl } from "@/config";
import { UserDetailResponse } from "@/types";
import toast from "react-hot-toast";

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
    const data = await response.json();
    if (data.data) {
      toast.success("Profile updated successfully!");
      return data;
    } else {
      throw new Error(data.message || "Error unknown");
    }
  } catch (error) {
    toast.error("" + error);
  }
}

export async function getUsers(token: string, roleId: number) {
  try {
    if (roleId == 0) {
      roleId = 1;
    }

    const response = await fetch(
      `${API_ENDPOINT}/users?RoleID=${roleId}&Limit=10&Page=1`,
      {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
