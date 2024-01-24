import router from "next/router";
import toast from "react-hot-toast";
import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;
const APP_ENDPOINT = "http://localhost:3000";

export async function registerEmailDoctor(email: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/register/doctor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.data) {
      toast.success("E-mail registered successfully");
      router.push(`${APP_ENDPOINT}/doctor/auth/register/success`);
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    toast.error("" + error);
  }
}

export async function createDoctor(
  password: string,
  email: string,
  code: string,
  certificate: string
) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/auth/verify/doctor?email=${email}&code=${code}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password,
          certificate: certificate,
        }),
      }
    );
    const data = await response.json();
    if (data.data) {
      toast.success("Account registered successfully");
      router.push(`${APP_ENDPOINT}/doctor/auth/login`);
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    toast.error("" + error);
  }
}
