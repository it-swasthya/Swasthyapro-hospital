



// import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://api.swasthyapro.com/api",
//   withCredentials: true,
// });

// export const refreshApi = axios.create({
//   baseURL: "https://api.swasthyapro.com/api",
//   withCredentials: true,
// });

// /* =====================
//    REQUEST INTERCEPTOR
// ===================== */
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");

//   console.log(token , "token get from local");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });


// api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.swasthyapro.com/api",
  withCredentials: true,
});

// export const refreshApi = axios.create({
//   baseURL: "https://api.swasthyapro.com/api",
//   withCredentials: true,
// });




    export const refreshToken = async () => {
  const res = await fetch(
    "https://api.swasthyapro.com/api/auth/refresh",
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("REFRESH_FAILED");
  return res.json();
};




