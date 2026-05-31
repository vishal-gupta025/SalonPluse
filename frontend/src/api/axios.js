import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// If backend returns 401, clear token and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem("token");
      } catch (_) {}
      // force reload to login page
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);

export default api;