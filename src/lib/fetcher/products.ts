const API_ENDPOINT = "http://10.20.191.163:8080";

export async function getProducts() {
  try {
    const response = await fetch(`${API_ENDPOINT}/products`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
