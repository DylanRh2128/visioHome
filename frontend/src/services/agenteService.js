import api from './api';

const agenteService = {
    // Obtener todos los agentes
    getAll: async (search = '') => {
        try {
            const response = await api.get('/agentes', {
                params: { search }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Obtener un agente por ID
    getById: async (id) => {
        try {
            const response = await api.get(`/agentes/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Crear nuevo agente
    create: async (data) => {
        try {
            const response = await api.post('/agentes', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Actualizar agente
    update: async (id, data) => {
        try {
            // Si es FormData, Laravel prefiere POST con _method=PUT para capturar archivos
            if (data instanceof FormData) {
                data.append('_method', 'PUT');
                const response = await api.post(`/agentes/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                return response.data;
            }
            const response = await api.put(`/agentes/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Eliminar agente
    delete: async (id) => {
        try {
            const response = await api.delete(`/agentes/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};

export default agenteService;
