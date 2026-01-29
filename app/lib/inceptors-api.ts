




// import { api, refreshApi } from "./api";


// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");

//   console.log(token , "access token ???");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

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

//       const newAccessToken = res?.data.accessToken;



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



import { api, refreshApi } from "./api";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  console.log("🔁 processQueue called | error:", !!error);

  failedQueue.forEach((prom, index) => {
    console.log(`   ↪ resolving queued request #${index + 1}`);
    if (error) prom.reject(error);
    else prom.resolve(null);
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE SUCCESS:", response.config.url);
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    console.log("🚨 RESPONSE ERROR:", {
      url: originalRequest?.url,
      status: error.response?.status,
      retry: originalRequest?._retry,
      isRefreshing,
    });

    // not auth error OR already retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      console.log("❌ Not eligible for refresh → rejecting");
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // if refresh already running → queue request
    if (isRefreshing) {
      console.log("⏳ Refresh in progress → queuing request:", originalRequest.url);

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        console.log("🔄 Retrying queued request:", originalRequest.url);
        return api(originalRequest);
      });
    }

    isRefreshing = true;
    console.log("🔐 Starting token refresh…");

    try {
      console.log("➡️ Calling /auth/refresh");
      await refreshApi.post("/auth/refresh");

      console.log("✅ Refresh success (new cookie set)");

      processQueue(null);

      console.log("🔄 Retrying original request:", originalRequest.url);
      return api(originalRequest);

    } catch (err) {
      console.error("❌ Refresh FAILED → logout", err);
      processQueue(err);
      window.location.href = "/login";
      return Promise.reject(err);

    } finally {
      isRefreshing = false;
      console.log("🔓 Refresh lock released");
    }
  }
);
