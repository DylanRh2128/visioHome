import api from './api';

const cartService = {
    // Obtener items del carrito (favoritos/por apartar)
    getItems: async () => {
        try {
            const response = await api.get('/user/cart');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Agregar a carrito
    add: async (idPropiedad) => {
        try {
            const response = await api.post('/user/cart', { idPropiedad });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Eliminar de carrito
    remove: async (id) => {
        try {
            const response = await api.delete(`/user/cart/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default cartService;
