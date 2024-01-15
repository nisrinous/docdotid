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

export async function deleteCategory(token: string, id: any) {
  try {
    const response = await fetch(`${API_ENDPOINT}/categories/${id}`, {
      method: "DELETE",
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

export async function addCategory(token: string, name: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/categories/`, {
      method: "POST",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
