import api from './api';

const propiedadService = {
    // Obtener todas las propiedades con filtros
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/propiedades', {
                params: params
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

    // Obtener URL del modelo 3D de una propiedad
    getModelo3D: async (id) => {
        try {
            const response = await api.get(`/propiedades/${id}/modelo3d`);
            return response.data; // { model_url: "..." | null }
        } catch (error) {
            return { model_url: null };
        }
    },
};

export default propiedadService;
