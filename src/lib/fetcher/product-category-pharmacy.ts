import { apiBaseUrl } from "@/config";
import toast from "react-hot-toast";

const API_ENDPOINT = apiBaseUrl;

export async function getProductsPharmacy(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies/categories`, {
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

export async function addCategoryPharmacy(
  token: string,
  name: string,
  pharmacy_id?: number
) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies/categories/`, {
      method: "POST",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        pharmacy_id: pharmacy_id,
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

export async function editPharmacyCategory(
  token: string,
  name: string,
  id: any,
  pharmacy_id?: number
) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies/categories`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        pharmacy_id: pharmacy_id,
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

export async function deletePharmacyCategory(token: string, id: any) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/pharmacies/categories/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    toast.success("Delete Success!");
    return data;
  } catch (error) {
    console.error("" + error);
  }
}
