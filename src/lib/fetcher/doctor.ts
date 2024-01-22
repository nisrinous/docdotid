import { apiBaseUrl } from "@/config";
import { DoctorResponse } from "@/types";
import toast from "react-hot-toast";

const API_ENDPOINT = apiBaseUrl;

export async function getDoctors(token: string) {
  try {
    let url = `${API_ENDPOINT}/doctors`;

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

export async function getDoctor(token: string, doctorId: string) {
  try {
    let url = `${API_ENDPOINT}/doctors/${doctorId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("" + error);
  }
}

export async function getDoctorDetail(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/doctors/detail`, {
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

export async function putDoctorDetail(
  token: string,
  changes: Partial<DoctorResponse>
): Promise<DoctorResponse | undefined> {
  try {
    const response = await fetch(`${API_ENDPOINT}/doctors`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });
    const data = await response.json();
    if (data.data) {
      toast.success("Profile updated successfully!");
      return data;
    } else {
      throw new Error(data.message || "Error unknown");
    }
  } catch (error) {
    toast.error("" + error);
  }
}

export async function patchDoctorStatus(token: string, status: boolean) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/doctors/detail/change-status`,
      {
        method: "PATCH",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_active: status,
        }),
      }
    );
    const data = await response.json();
    if (data.data) {
      console.log("masu");
      toast.success("Status updated successfully!");
      return data;
    } else {
      throw new Error(data.message || "Error unknown");
    }
  } catch (error) {
    toast.error("" + error);
  }
}

export async function patchDoctorImage(token: string, image: string) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/doctors/detail/change-image`,
      {
        method: "PATCH",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: image,
        }),
      }
    );
    const data = await response.json();
    if (data.data) {
      toast.success("Image updated successfully!");
      return data;
    } else {
      throw new Error(data.message || "Error unknown");
    }
  } catch (error) {
    toast.error("" + error);
  }
}

export async function patchDoctorFee(token: string, fee: number) {
  try {
    const response = await fetch(`${API_ENDPOINT}/doctors/detail/change-fee`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fee: fee,
      }),
    });
    const data = await response.json();
    if (data.data) {
      toast.success("Fee per session updated successfully!");
      return data;
    } else {
      throw new Error(data.message || "Error unknown");
    }
  } catch (error) {
    toast.error("" + error);
  }
}
