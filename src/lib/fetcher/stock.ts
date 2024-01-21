import { apiBaseUrl } from "@/config";
import toast from "react-hot-toast";

const API_ENDPOINT = apiBaseUrl;

export async function getStockByPharmacy(token: string, pharmacy_id: number) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/pharmacies/${pharmacy_id}/products`,
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

export async function updateProductStock(
  token: string,
  stock: number,
  id: any
) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies/products/stock`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        stock: stock,
      }),
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
