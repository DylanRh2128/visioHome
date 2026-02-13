import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Ajusta según tu configuración de backend
    withCredentials: true,
});

// Interceptor para añadir el token si es necesario
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const statsService = {
    getStats: async (period = 'year') => {
        try {
            const response = await api.get(`/stats?period=${period}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    },
    getUserStats: async (period = 'year') => {
        try {
            const response = await api.get(`/stats/users?period=${period}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user stats:', error);
            throw error;
        }
    },
    getGlobalStats: async () => {
        try {
            const response = await api.get('/stats/global');
            return response.data;
        } catch (error) {
            console.error('Error fetching global stats:', error);
            throw error;
        }
    }
};

export default statsService;
