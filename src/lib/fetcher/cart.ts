import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;

export async function addToCart(token: string, productId: number, qty: number) {
  try {
    const response = await fetch(`${API_ENDPOINT}/products/${productId}/buy`, {
      method: "POST",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: qty,
      }),
    });
    const data = await response.json();
    if (data.data) {
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("" + error);
  }
}

export async function getCartItems(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/carts`, {
      method: "GET",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.data) {
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("" + error);
  }
}
