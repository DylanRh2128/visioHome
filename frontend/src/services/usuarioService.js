import api from './api';

const usuarioService = {
    // Obtener todos los usuarios
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/usuarios', {
                params
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

    // Actualizar usuario (soporta FormData e imágenes)
    update: async (id, data) => {
        try {
            // Si es FormData, Laravel prefiere POST + _method=PUT para capturar archivos
            if (data instanceof FormData) {
                if (!data.has('_method')) data.append('_method', 'PUT');
                const response = await api.post(`/usuarios/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                return response.data;
            }

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

    // ─── Perfil del usuario autenticado ───────────────────────────────────────

    // Obtener perfil propio
    getProfile: async () => {
        try {
            const response = await api.get('/user/profile');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Actualizar datos del perfil (nombre, teléfono, dirección, contraseña)
    updateProfile: async (data) => {
        try {
            const response = await api.put('/user/profile', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Subir avatar — usa multipart/form-data
    uploadAvatar: async (file) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await api.post('/user/profile/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Obtener estadísticas globales de usuarios
    getStats: async () => {
        try {
            const response = await api.get('/usuarios/stats/global');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};

export default usuarioService;
