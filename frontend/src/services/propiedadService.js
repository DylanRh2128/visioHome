import api from './api';

const propiedadService = {
    // Obtener todas las propiedades
    getAll: async (search = '') => {
        try {
            const response = await api.get('/propiedades', {
                params: { search }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Obtener una propiedad por ID
    getById: async (id) => {
        try {
            const response = await api.get(`/propiedades/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Crear nueva propiedad
    create: async (data) => {
        try {
            const response = await api.post('/propiedades', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Actualizar propiedad
    update: async (id, data) => {
        try {
            const response = await api.put(`/propiedades/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Eliminar propiedad
    delete: async (id) => {
        try {
            const response = await api.delete(`/propiedades/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};

export default propiedadService;
