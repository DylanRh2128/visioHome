import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // DEBUG REQUEST
    console.log("API REQUEST:");
    console.log("URL:", config.baseURL + config.url);
    console.log("METHOD:", config.method);
    console.log("DATA:", config.data);
    console.log("PARAMS:", config.params);

    return config;
  },
  (error) => {
    console.error("REQUEST ERROR:", error);
    return Promise.reject(error);
  }
);

// ==============================
// RESPONSE INTERCEPTOR
// ==============================
api.interceptors.response.use(
  (response) => {

    // DEBUG RESPONSE
    console.log("API RESPONSE:");
    console.log("URL:", response.config.url);
    console.log("STATUS:", response.status);
    console.log("DATA:", response.data);

    return response;
  },

  (error) => {

    const status = error.response?.status;

    console.error("API ERROR:");
    console.error("STATUS:", status);
    console.error("URL:", error.config?.url);
    console.error("DATA:", error.response?.data);

    // Manejo sesión expirada
    if (status === 401) {

      const token = localStorage.getItem("token");
      const path = window.location.pathname;

      if (token && path !== "/login" && path !== "/registro") {

        console.warn("Sesión expirada. Redirigiendo a login...");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;