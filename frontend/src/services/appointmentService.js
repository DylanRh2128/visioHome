import api from './api';

const appointmentService = {
    // Obtener citas del usuario actual
    getMyAppointments: async () => {
        try {
            const response = await api.get('/user/appointments');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Crear una nueva cita
    create: async (data) => {
        try {
            const response = await api.post('/user/appointments', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Cancelar cita
    cancel: async (id) => {
        try {
            const response = await api.delete(`/user/appointments/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default appointmentService;
