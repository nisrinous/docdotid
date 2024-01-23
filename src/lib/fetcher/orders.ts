import { apiBaseUrl } from "@/config";
import toast from "react-hot-toast";
const API_ENDPOINT = apiBaseUrl;

export async function getOrdersReports(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/reports/sales/pharmacies`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}

export async function getOrdersList(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/reports?status=4`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}

export async function getOrdersListPharmacy(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/reports`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
export async function getOrdersMonthly(
  token: string,
  productID?: number,
  categoryID?: number
) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/reports/sales?productID=${productID}&productCategoryID=${categoryID}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}

export async function getCategoryList(token: string) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/reports/sales/product_categories`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}

export async function getProductList(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/reports/sales/products`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("" + error);
  }
}

export async function updateOrderStatus(token: string, id: any) {
  try {
    const response = await fetch(`${API_ENDPOINT}/orders/${id}/confirm-image`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 400) {
      const errorData = await response.json();
      toast.error(`${errorData.message}`);
    } else {
      const data = await response.json();
      toast.success("Data added to databse sucessfully!");
      return data;
    }
  } catch (error) {
    console.error("" + error);
  }
}
