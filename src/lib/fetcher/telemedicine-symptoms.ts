import { apiBaseUrl } from "@/config";
import toast from "react-hot-toast";

const API_ENDPOINT = apiBaseUrl;

export async function startChat(token: string, symptoms: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/chat/new-room`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: symptoms,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.data) {
      toast.success("Message post successfully!");
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("" + error);
  }
}
