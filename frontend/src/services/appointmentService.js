import api from "./api";

const appointmentService = {

    // =============================
    // OBTENER CITAS DEL USUARIO
    // =============================
    getMyAppointments: async () => {

        try {

            const response = await api.get("/user/appointments");

            console.log("Citas recibidas:", response.data);

            return response.data;

        } catch (error) {

            console.error("Error getMyAppointments:", error);

            throw error;

        }

    },


    // =============================
    // CREAR CITA
    // =============================
    create: async (data) => {

        try {

            console.log("Payload enviado a /user/appointments:", data);

            const response = await api.post("/user/appointments", data);

            console.log("Respuesta creación cita:", response.data);

            return response.data;

        } catch (error) {

            console.error("Error creando cita:");

            console.error("STATUS:", error.response?.status);

            console.error("DATA:", error.response?.data);

            console.error("FULL ERROR:", error);

            throw error;

        }

    },


    // =============================
    // CANCELAR CITA
    // =============================
   cancel: async (id) => {

        try {

            const response = await api.post(`/user/appointments/${id}/cancel`);

            return response.data;

        } catch (error) {

            console.error("Error cancelando cita:", error.response?.data);

            throw error;

        }

    },


    // =============================
    // LINK DE PAGO MERCADOPAGO
    // =============================
   getPaymentLink: async (id) => {

        try {

            console.log("Solicitando link de pago para cita:", id);

            const response = await api.get(`/user/appointments/${id}/payment-link`);

            if (!response.data?.init_point) {
                throw new Error("MercadoPago no devolvió init_point");
            }

            console.log("Link de pago recibido:", response.data);

            return response.data;

        } catch (error) {

            console.error("Error obteniendo link de pago:", error.response?.data);

            throw error;

        }

    },


};

export default appointmentService;