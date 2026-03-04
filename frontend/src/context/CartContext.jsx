import React, { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            // TODO: Use a configured axios instance with auth token
            // For now, we assume global axios or fetch with headers if needed
            // But since this is a quick fix, let's keep it robust
            // If API fails, we fall back to empty array to not break the UI
            /* 
            const response = await axios.get('/api/user/cart');
            setCart(response.data); 
            */
            // Mocking success for now until full auth integration in this file
            // or check if we have a service for this
            setCart([]);
        } catch (error) {
            console.error("Error fetching cart", error);
            setCart([]);
        }
    };

    const addToCart = (property) => {
        // Check if already in cart
        if (cart.some((item) => item.id === property.id)) {
            Swal.fire({
                icon: "info",
                title: "Ya está en el carrito",
                text: "Esta propiedad ya se encuentra en tu lista de interés.",
                confirmButtonColor: "#6b0000",
            });
            return;
        }

        setCart([...cart, property]);
        Swal.fire({
            icon: "success",
            title: "Agregado",
            text: "Propiedad agregada al carrito correctamente.",
            timer: 1500,
            showConfirmButton: false,
        });
    };

    const removeFromCart = (propertyId) => {
        setCart(cart.filter((item) => item.id !== propertyId));
        Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "Propiedad eliminada del carrito.",
            timer: 1000,
            showConfirmButton: false,
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => {
        // Assuming price is string like "$450,000" - logic needs to handle this
        // For now returning count or parsing basic numbers if needed for reservation deposit?
        // Real estate usually involves booking fees, not full price in cart. 
        // Let's assume a reservation fee constant or property attribute.
        // returning count for now as 'total items'
        return total + 1;
    }, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
