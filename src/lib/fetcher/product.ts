import { apiBaseUrl } from "@/config";

const API_ENDPOINT = apiBaseUrl;

export async function getProducts(limit: number, categoryId?: string) {
  try {
    let url = `${API_ENDPOINT}/products?limit=${limit * 30}`;

    if (categoryId) {
      url += `&categoryID=${categoryId}`;
    }
    const response = await fetch(url, {
      method: "GET",
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
export async function filterProducts(query: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/products?name=${query}`, {
      method: "GET",
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

export async function getProductss(categoryId?: number, page?: number) {
  try {
    let url = `${API_ENDPOINT}/products?limit=8`;

    if (categoryId) {
      url += `&categoryID=${categoryId}`;
    }

    if (page) {
      url += `&page=${page}`;
    }

    const response = await fetch(url, {
      method: "GET",
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

export async function getProduct(productId: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/products/${productId}`, {
      method: "GET",
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
    if (data.data) {
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
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
    if (data.data) {
      return data;
    } else if (data.message) {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("" + error);
  }
}
