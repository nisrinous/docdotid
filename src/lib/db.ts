import router from "next/router";
import toast from "react-hot-toast";

const API_ENDPOINT = "http://localhost:5432";
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

    if (response.status === 201) {
      toast.success("E-mail registered successfully");
      router.push(`${APP_ENDPOINT}/auth/register/success`);
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unknown error");
    }
  } catch (error) {
    toast.error("Error registering user:" + error);
    throw error;
  }
}

export async function createUser(link: string, password: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/verify/${link}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
      }),
    });

    if (response.status === 201) {
      toast.success("Account registered successfully");
      router.push(`${APP_ENDPOINT}/auth/login`);
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unknown error");
    }
  } catch (error) {
    toast.error("Error creating account:" + error);
    throw error;
  }
}
