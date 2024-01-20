import { apiBaseUrl } from "@/config";
import toast from "react-hot-toast";

const API_ENDPOINT = apiBaseUrl;

export async function getPharmacyList(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies`, {
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

export async function getPharmacyOwnedList(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies/owned`, {
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

export async function addPharmacy(
  token: string,
  id: number,
  name: string,
  address: string,
  postalcode: string,
  latitude: number,
  longitude: number,
  city_code: string,
  operational_hour: string,
  operational_day: string
) {
  try {
    const response = await fetch(`${API_ENDPOINT}/categories/`, {
      method: "POST",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
        postalcode: postalcode,
        latitude: latitude,
        longitude: longitude,
        city_code: city_code,
        operational_hour: operational_hour,
        operational_day: operational_day,
        is_active: true,
        pharmacist_id: id,
      }),
    });

    if (response.status === 400) {
      const errorData = await response.json();
      toast.error(`${errorData.message}`);
    } else {
      const data = await response.json();
      toast.success("Data added to database sucessfully!");
      return data;
    }
  } catch (error) {
    console.error("" + error);
  }
}

export async function getPharmacyListOwned(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies/owned`, {
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

export async function getPharmacyDetail(token: string, id: number) {
  try {
    const response = await fetch(`${API_ENDPOINT}/pharmacies/${id}`, {
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
