import api from './api';

const pagoService = {
    // Obtener todos los pagos/facturas
    getAll: async (search = '') => {
        try {
            const response = await api.get('/pagos', {
                params: { search }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Obtener un pago por ID
    getById: async (id) => {
        try {
            const response = await api.get(`/pagos/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Crear nuevo pago/factura
    create: async (data) => {
        try {
            const response = await api.post('/pagos', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Actualizar pago/factura
    update: async (id, data) => {
        try {
            const response = await api.put(`/pagos/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Eliminar pago/factura
    delete: async (id) => {
        try {
            const response = await api.delete(`/pagos/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};

export default pagoService;
