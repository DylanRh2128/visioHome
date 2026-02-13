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

    // Actualizar usuario (soporta FormData para imágenes)
    update: async (id, data) => {
        try {
            const headers = data instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' };

            const response = await api.post(`/usuarios/${id}`, data, {
                headers,
                params: { _method: 'PUT' } // Laravel spoofing for PUT with FormData
            });
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
