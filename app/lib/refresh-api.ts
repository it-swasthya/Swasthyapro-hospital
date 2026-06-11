


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




