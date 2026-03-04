import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { Heart, MapPin, Bed, Bath, Layout, ChevronLeft, Search } from "lucide-react";
import Swal from "sweetalert2";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchFavorites = async () => {
        try {
            const response = await api.get("/user/favorites");
            setFavorites(response.data);
        } catch (error) {
            console.error("Error fetching favorites", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const toggleFavorite = async (idPropiedad) => {
        try {
            await api.post(`/user/favorites/toggle/${idPropiedad}`);
            fetchFavorites();
            Swal.fire({
                icon: "success",
                title: "Actualizado",
                text: "Lista de favoritos actualizada.",
                timer: 1000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar favoritos.", "error");
        }
    };

    if (loading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-danger" role="status"></div>
        </div>
    );

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="fw-bold text-dark display-6 mb-1">Mis Favoritos</h1>
                    <p className="text-muted mb-0">Tus propiedades seleccionadas para tu futuro hogar.</p>
                </div>
                <Link to="/user/properties" className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2" style={{ backgroundColor: '#6b0000' }}>
                    <Search size={18} /> Explorar Más
                </Link>
            </div>

            {favorites.length > 0 ? (
                <div className="row g-4">
                    {favorites.map((fav) => {
                        const prop = fav.propiedad;
                        if (!prop) return null;
                        return (
                            <div key={fav.id} className="col-md-6 col-lg-4">
                                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift transition-all">
                                    <div className="position-relative" style={{ height: '220px' }}>
                                        <img
                                            src={prop.imagen_principal || `https://api.dicebear.com/7.x/avataaars/svg?seed=${prop.titulo}`}
                                            className="card-img-top h-100 w-100 object-fit-cover"
                                            alt={prop.titulo}
                                        />
                                        <div className="position-absolute top-0 end-0 p-3">
                                            <button
                                                className="btn btn-white rounded-circle p-2 shadow-sm text-danger"
                                                onClick={() => toggleFavorite(prop.idPropiedad)}
                                            >
                                                <Heart size={20} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h5 className="card-title fw-bold text-truncate mb-0" style={{ maxWidth: '70%' }}>{prop.titulo}</h5>
                                            <span className="text-danger fw-bold h5 mb-0">${Number(prop.precio).toLocaleString()}</span>
                                        </div>
                                        <p className="text-muted small mb-3"><MapPin size={14} className="me-1" /> {prop.ubicacion}</p>

                                        <div className="d-flex gap-3 mb-4">
                                            <span className="badge bg-light text-dark fw-normal rounded-pill px-3 py-2"><Bed size={14} className="me-1" /> {prop.habitaciones}</span>
                                            <span className="badge bg-light text-dark fw-normal rounded-pill px-3 py-2"><Bath size={14} className="me-1" /> {prop.banos}</span>
                                            <span className="badge bg-light text-dark fw-normal rounded-pill px-3 py-2"><Layout size={14} className="me-1" /> {prop.tamano_m2}m²</span>
                                        </div>

                                        <button
                                            className="btn btn-dark w-100 rounded-pill py-2 fw-bold"
                                            onClick={() => navigate(`/user/properties/${prop.idPropiedad}`)}
                                        >
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-5 mt-5">
                    <div className="bg-light d-inline-block p-4 rounded-circle mb-4 text-muted opacity-25">
                        <Heart size={64} />
                    </div>
                    <h3 className="fw-bold text-dark">Tu lista está vacía</h3>
                    <p className="text-muted mb-4 lead">No has guardado ninguna propiedad todavía.</p>
                    <Link to="/user/properties" className="btn btn-outline-danger rounded-pill px-5 py-2 fw-bold">
                        Empezar a buscar
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Favorites;
