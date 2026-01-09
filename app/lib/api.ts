import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.swasthyapro.com/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
