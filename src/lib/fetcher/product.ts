import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;

export async function getProducts(
  token: string,
  categoryId?: string,
  page?: number
) {
  try {
    let url = `${API_ENDPOINT}/products?limit=8&`;

    if (categoryId) {
      url += `?category_id=${categoryId}`;
    }

    if (page) {
      url += `page=${page}`;
    }

    const response = await fetch(url, {
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

export async function getProduct(token: string, productId: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/products/${productId}`, {
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

export async function getProductsByPharmacy(token: string, pharmacyId: any) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/pharmacies/${pharmacyId}/products`,
      {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}

export async function deleteProduct(token: string, productId: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/products/${productId}`, {
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
