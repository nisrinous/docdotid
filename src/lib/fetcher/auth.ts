import router from "next/router";
import toast from "react-hot-toast";

const API_ENDPOINT = "http://10.20.191.12:8080";
const APP_ENDPOINT = "http://localhost:3000";

export async function registerEmail(email: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    if (data.data) {
      toast.success("E-mail registered successfully");
      router.push(`${APP_ENDPOINT}/auth/register/success`);
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    toast.error("" + error);
  }
}

export async function createUser(
  password: string,
  email: string,
  code: string
) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/auth/verify/?email=${email}&code=${code}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password,
        }),
      }
    );
    const data = await response.json();
    if (data.data) {
      toast.success("Account registered successfully");
      router.push(`${APP_ENDPOINT}/auth/login`);
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    toast.error("" + error);
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.data) {
      toast.success("Log in successfull!");
      router.push(`${APP_ENDPOINT}/`);
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    toast.error("" + error);
  }
}
