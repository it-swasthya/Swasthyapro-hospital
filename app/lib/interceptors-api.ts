






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


