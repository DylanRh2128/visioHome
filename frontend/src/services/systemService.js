import api from './api';

const systemService = {
    getConfigurations: async () => {
        try {
            const response = await api.get('/admin/configurations');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getPublicConfig: async (key) => {
        try {
            const response = await api.get('/admin/configurations');
            const config = response.data.find(c => c.key === key);
            return config ? config.value : null;
        } catch (error) {
            return null;
        }
    },

    getSystemStatus: async () => {
        try {
            const response = await api.get('/system-status');
            return response.data;
        } catch (error) {
            return { payments_enabled: true, cita_precio_base: 50000 };
        }
    }
};

export default systemService;
