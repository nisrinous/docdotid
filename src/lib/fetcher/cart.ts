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
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
