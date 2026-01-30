




// import { api, refreshApi } from "./refresh-api";


// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");

//   console.log(token , "access token ???");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   console.log(config, "config ??")

//   return config;
// });

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };




// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status !== 401 || originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({ resolve, reject });
//       }).then((token) => {
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return api(originalRequest);
//       });
//     }

//     isRefreshing = true;

//     try {
//       // USE refreshApi (NO access token attached)
//       const res = await refreshApi.post("/auth/refresh");


//       console.log(res, "fjdgkdjfkj");

//       const newAccessToken = res?.data?.accessToken;



//       console.log("NEW TOKEN:", newAccessToken);

//       localStorage.setItem("accessToken", newAccessToken);

//       api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

//       processQueue(null, newAccessToken);

//       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//       return api(originalRequest);

//     } catch (err) {
//       processQueue(err, null);
//       localStorage.removeItem("accessToken");
//       window.location.href = "/login";
//       return Promise.reject(err);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );






// src/api/apiClient.ts

import axios from "axios";

import { refreshToken } from "./refresh-api";


let isRefreshing = false;
let requestQueue: ((token: string) => void)[] = [];


const api = axios.create({
  baseURL: "https://api.swasthyapro.com/api",
  withCredentials: true, // IMPORTANT for refresh cookie
});

/* ---------------- ATTACH TOKEN (REQUEST) ---------------- */

api.interceptors.request.use(
  async config => {
    const token = await localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

/* ---------------- HANDLE REFRESH (RESPONSE) ---------------- */

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Only handle 401 once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // First request triggers refresh
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const data = await refreshToken();
          await localStorage.setItem("accessToken", data.accessToken);

          // Release all waiting requests
          requestQueue.forEach(cb => cb(data.accessToken));
          requestQueue = [];
        } catch (e) {
          requestQueue = [];
          throw new Error("SESSION_EXPIRED");
        } finally {
          isRefreshing = false;
        }
      }

      // Other requests wait here
      return new Promise(resolve => {
        requestQueue.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;


