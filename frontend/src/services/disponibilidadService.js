import api from './api';

const disponibilidadService = {
    /**
     * Obtener la disponibilidad semanal de un agente (para mostrar en calendario al usuario).
     * @param {string} docAgente
     */
    getByAgente: async (docAgente, fecha = null) => {
        try {
            const params = fecha ? { fecha } : {};
            const response = await api.get(`/user/agentes/${docAgente}/disponibilidad`, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * (Panel Agente) Listar la disponibilidad propia.
     */
    getMia: async () => {
        try {
            const response = await api.get('/agente/disponibilidades');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * (Panel Agente) Crear un bloque de disponibilidad.
     */
    create: async (data) => {
        try {
            const response = await api.post('/agente/disponibilidades', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * (Panel Agente) Eliminar un bloque de disponibilidad.
     */
    delete: async (id) => {
        try {
            const response = await api.delete(`/agente/disponibilidades/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};

export default disponibilidadService;
