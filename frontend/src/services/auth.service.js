import api from "./api";

const authService = {
    login: async (correo, password) => {
        try {
            const response = await api.post("/login", { correo, password });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post("/register", userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    logout: async () => {
        try {
            await api.post("/logout");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } catch (error) {
            console.error("Logout error", error);
        }
    }
};

export default authService;
