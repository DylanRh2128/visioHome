import api from "../services/api";
import Swal from "sweetalert2";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const useFavorites = () => {
    return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
    const { user } = useAuth();   // 🔥 IMPORTANTE
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFavorites = async () => {
        if (!user) return;   // 🔥 No hacer request si no hay usuario

        setLoading(true);

        try {
            const response = await api.get("/user/favorites");
            setFavorites(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                console.warn("Token inválido o expirado.");
                return; // 🚫 NO redirigir aquí
            }
            console.error("Error fetching favorites", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Solo ejecutar cuando exista user
    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            setFavorites([]); // limpiar si hace logout
        }
    }, [user]);

    const toggleFavorite = async (property) => {
        if (!user) {
            Swal.fire("Debes iniciar sesión", "", "info");
            return;
        }

        const id = property.idPropiedad;
        const isFav = favorites.some(f => f.idPropiedad === id);

        // Optimistic UI
        if (isFav) {
            setFavorites(prev => prev.filter(f => f.idPropiedad !== id));
        } else {
            setFavorites(prev => [
                ...prev,
                { id: Date.now(), idPropiedad: id, propiedad: property }
            ]);
        }

        try {
            const response = await api.post(`/user/favorites/toggle/${id}`);

            Swal.fire({
                icon: "success",
                title: response.data.is_favorite ? "Agregado" : "Eliminado",
                text: response.data.message,
                timer: 1000,
                showConfirmButton: false,
                toast: true,
                position: "top-end"
            });
        } catch (error) {
            console.error("Error toggling favorite", error);
            fetchFavorites(); // re-sync
            Swal.fire("Error", "No se pudo actualizar favoritos.", "error");
        }
    };

    const isFavorite = (id) => {
        return favorites.some(f => f.idPropiedad === id);
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, toggleFavorite, isFavorite, loading }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};