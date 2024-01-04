import router from "next/router";
import toast from "react-hot-toast";

const API_ENDPOINT = "http://localhost:8080";
const APP_ENDPOINT = "http://localhost:3000";

export async function registerEmail(email: string) {
  try {
    fetch(`${API_ENDPOINT}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code) {
          toast.success("E-mail registered successfully");
          router.push(`${APP_ENDPOINT}/auth/register/success`);
          console.log(data.code);
          return data.code;
        } else {
          throw new Error(data.message || "Unknown error");
        }
      });
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

    if (response.status === 200) {
      toast.success("Log in successfull!");
      router.push(`${APP_ENDPOINT}/`);
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unknown error");
    }
  } catch (error) {
    toast.error("Error logging in:" + error);
    throw error;
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

    if (response.status === 200) {
      toast.success("Log in successfull!");
      router.push(`${APP_ENDPOINT}/`);
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unknown error");
    }
  } catch (error) {
    toast.error("Error logging in:" + error);
    throw error;
  }
}
