const API_ENDPOINT = "http://10.20.191.12:8080";

export async function getProducts(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/categories`, {
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
