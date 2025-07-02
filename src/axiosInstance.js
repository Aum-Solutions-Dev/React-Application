import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // Current time in seconds
    return decoded.exp < now; // Token is expired if exp is in the past
  } catch (e) {
    return true; // Assume expired if decoding fails
  }
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("Missing refresh token");
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/refresh",
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );
    const { accessToken } = response.data;
    console.log("New accessToken:", accessToken);
    localStorage.setItem("authToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
}

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("authToken");
    if (token && isTokenExpired(token)) {
      console.log("Access token expired, refreshing actively"); // Debug
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          token = newToken;
          onRefreshed(newToken);
        } catch (error) {
          console.warn("Proactive refresh failed, will redirect to login"); // Use warn
          throw error; // Let response interceptor or component handle redirect
        } finally {
          isRefreshing = false;
        }
      } else {
        // Wait for ongoing refresh
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          });
        });
      }
    }

    if (token) {
      console.log("Adding token to request:", token); // Debug
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No access token found for request"); // Use warn
    }
    return config;
  },
  (error) => {
    console.warn("Request interceptor error:", error); // Use warn
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          onRefreshed(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest); // Retry the original request
        } catch (refreshError) {
          // Redirect to login on refresh failure
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Queue the request until the token is refreshed
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);

export default api;
