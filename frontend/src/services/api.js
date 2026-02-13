import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Interceptor para agregar el token a cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expirado o inválido, o intento de acceso sin token
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Evitar redirección infinita si ya estamos en login o registro
      const path = window.location.pathname;
      if (path !== "/login" && path !== "/registro") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


export default api;
