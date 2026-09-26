import axios from "axios";

export const TOKEN_KEY = "nextsteproad_token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unable to create a plan right now. Please try again.";

    return Promise.reject(new Error(message));
  },
);

export default api;
