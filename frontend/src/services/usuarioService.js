import api from './api';

const usuarioService = {
    // Obtener todos los usuarios
    getAll: async (search = '') => {
        try {
            const response = await api.get('/usuarios', {
                params: { search }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Obtener un usuario por ID
    getById: async (id) => {
        try {
            const response = await api.get(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Crear nuevo usuario
    create: async (data) => {
        try {
            const response = await api.post('/usuarios', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Actualizar usuario
    update: async (id, data) => {
        try {
            const response = await api.put(`/usuarios/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Eliminar usuario
    delete: async (id) => {
        try {
            const response = await api.delete(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};

export default usuarioService;
