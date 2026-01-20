import axios from "axios";
import { fetchProtectedData } from "../wrapper/authentication";

const BASE_URL = "https://api.swasthyapro.com/api";

// const refreshToken = async () => {
//   const res = await fetch(`${BASE_URL}/auth/refresh`, {
//     method: "POST",

//     headers: {
//       "content-type": "application/json",
//     },
//     credentials: "include",
//   });
//   return await res.json();
// };

// const fetchProtectedData = async (url: string, options: RequestInit = {}) => {
//   const accessToken = localStorage.getItem("accessToken");

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       ...(options.headers || {}),
//       Authorization: accessToken ? `Bearer ${accessToken}` : "",
//     },
//     credentials: "include",
//   });

//   if (res.status === 401) {
//     const refreshed = await refreshToken();

//     if (refreshed?.accessToken) {
//       localStorage.setItem("accessToken", refreshed.accessToken);

//       return fetchProtectedData(url, options);
//     }

//     throw new Error("Unauthorized");
//   }

//   if (res.status === 404) {
//     return "Not found";
//   }

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(text || "Request failed");
//   }

//   return await res.json;
// };

export const getAllAllottedDoctorAppointments = async (doctorName: string) => {
  const res = await fetch(
    `${BASE_URL}/appointment/consult/list-appointment/${doctorName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return await res.json();
};

export const getDoctorAppointments = async (doctorName: string) => {
  const res = await fetch(
    `${BASE_URL}/appointment/consult/list-appointment/${doctorName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return await res.json();
};

export const getAllAllottedAppointments = async ({
  hospital_name,
}: {
  hospital_name: string;
}) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Access token missing");
  }

  const query = new URLSearchParams({ hospital_name }).toString();

  const url = `${BASE_URL}/appointment/consult/doctor/allotted/appointment?${query}`;

  const res = await fetchProtectedData(url);

  console.log(res , "rss sssss");

  return res;
};

// export const getDoctorAllAppointments = async () => {
//   const accessToken = localStorage.getItem("accessToken");

//   if (!accessToken) {
//     throw new Error("Access token missing");
//   }

//   const url = `${BASE_URL}/appointment/consult/doctor/all/appointment`;
//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     credentials: "include",
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     console.error("API Error:", res.status, errorText);
//     throw new Error("Failed to fetch all appointments");
//   }

//   const response = await res.json();
//   console.log("ALLOTTED APPOINTMENTS:", response);
//   return response;
// };

export const getAllAppointmentDoctorLists = async () => {
  const res = await fetch(`${BASE_URL}/appointment/consult/all-appointment`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return res.json();
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  action: "accept" | "reject",
  doctor_allotted: string,
) => {
  const apiAction = action === "accept" ? "schedule" : "cancel";

  const res = await axios.put(
    `https://api.swasthyapro.com/api/appointment/consult/user/update-status-appointment/${appointmentId}`,
    { action: apiAction, doctor_allotted },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};

export const assignDoctor = async (
  appointmentId: string,
  doctorName: string,
) => {
  const res = await axios.put(
    `${"https://api.swasthyapro.com/api/appointment/consult/hospital/assign-doctor"}/${appointmentId}`,
    {
      doctor_name: doctorName,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};

const BASE =
  "https://api.swasthyapro.com/api/appointment/consult/doctor/consultation/report";

export const submitConsultationReport = async (payload: {
  appointmentId: string;
  diagnosis: string;
  advice: string;
  file: File;
}) => {
  const formData = new FormData();

  // DO NOT send appointment_id in body anymore
  formData.append("diagnosis", payload.diagnosis);
  formData.append("advice", payload.advice);
  formData.append("file", payload.file);

  const res = await axios.post(`${BASE}/${payload.appointmentId}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
