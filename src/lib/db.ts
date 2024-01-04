import router, { useRouter } from "next/router";
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

export async function createUser(
  password: string,
  email: string,
  code: string
) {
  try {
    fetch(`${API_ENDPOINT}/auth/verify/?email=${email}&code=${code}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.id) {
          toast.success("Account registered successfully");
          router.push(`${APP_ENDPOINT}/auth/login`);
          console.log(data.data.id);
          return data.data.id;
        } else {
          throw new Error(data.message || "Unknown error");
        }
      });
  } catch (error) {
    toast.error("Error creating account:" + error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    fetch(`${API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.access_token);
        if (data.access_token) {
          toast.success("Log in successfull!");
          router.push(`${APP_ENDPOINT}/`);
          console.log(data.access_token);
          return data.access_token;
        } else {
          throw new Error(data.message || "Unknown error");
        }
      });
  } catch (error) {
    toast.error("Error logging in:" + error);
    throw error;
  }
}
