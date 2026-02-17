import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Search, MapPin, Home as HomeIcon, Filter, Bed, Heart } from "lucide-react";
import Swal from "sweetalert2";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        min_price: "",
        max_price: "",
        type: "",
        habitaciones: ""
    });
    const navigate = useNavigate();

    const fetchFavorites = async () => {
        try {
            const response = await api.get("/user/favorites");
            setFavorites(response.data.map(f => f.idPropiedad));
        } catch (error) {
            console.error("Error fetching favorites", error);
        }
    };

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const params = {
                query: searchTerm,
                ...filters
            };
            const response = await api.get("/user/search", { params });
            setProperties(response.data.data || []);
        } catch (error) {
            console.error("Error fetching properties", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
        fetchFavorites();
    }, [searchTerm, filters]);

    const toggleFavorite = async (id) => {
        try {
            const response = await api.post(`/user/favorites/toggle/${id}`);
            if (response.data.is_favorite) {
                setFavorites([...favorites, id]);
            } else {
                setFavorites(favorites.filter(favId => favId !== id));
            }
        } catch (error) {
            console.error("Error toggling favorite", error);
        }
    };

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold text-dark display-4">Explora Propiedades</h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                    Encuentra el hogar perfecto con nuestros filtros avanzados y catálogo actualizado en tiempo real.
                </p>
            </div>

            {/* BARRA DE BÚSQUEDA Y FILTROS */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
                <div className="row g-3">
                    <div className="col-lg-5">
                        <div className="input-group input-group-lg border rounded-pill overflow-hidden bg-light">
                            <span className="input-group-text bg-transparent border-0 px-3">
                                <Search size={20} className="text-muted" />
                            </span>
                            <input
                                type="text"
                                className="form-control bg-transparent border-0 shadow-none ps-0"
                                placeholder="Buscar por título, ubicación..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <select
                            className="form-select form-select-lg rounded-pill border shadow-none"
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <option value="">Todos los Tipos</option>
                            <option value="casa">Casa</option>
                            <option value="apartamento">Apartamento</option>
                            <option value="terreno">Terreno</option>
                        </select>
                    </div>
                    <div className="col-lg-2">
                        <input
                            type="number"
                            className="form-control form-select-lg rounded-pill border shadow-none"
                            placeholder="Precio Min"
                            value={filters.min_price}
                            onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
                        />
                    </div>
                    <div className="col-lg-2">
                        <select
                            className="form-select form-select-lg rounded-pill border shadow-none"
                            value={filters.habitaciones}
                            onChange={(e) => setFilters({ ...filters, habitaciones: e.target.value })}
                        >
                            <option value="">Habitaciones</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                    </div>
                    <div className="col-lg-1">
                        <button
                            className="btn btn-danger btn-lg w-100 rounded-pill shadow-sm"
                            style={{ backgroundColor: '#6b0000' }}
                            onClick={() => fetchProperties()}
                        >
                            <Filter size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* RESULTADOS */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-danger" role="status"></div>
                </div>
            ) : (
                <div className="row g-4">
                    {properties.length > 0 ? (
                        properties.map((prop) => {
                            const isFav = favorites.includes(prop.idPropiedad);
                            return (
                                <div key={prop.idPropiedad} className="col-md-6 col-lg-4">
                                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift transition-all">
                                        <div className="position-relative" style={{ height: '240px' }}>
                                            <img
                                                src={prop.imagen_principal || `https://api.dicebear.com/7.x/avataaars/svg?seed=${prop.titulo}`}
                                                className="card-img-top w-100 h-100 object-fit-cover"
                                                alt={prop.titulo}
                                            />
                                            <div className="position-absolute top-0 end-0 p-3">
                                                <button
                                                    className={`btn ${isFav ? 'btn-danger' : 'btn-white'} rounded-circle p-2 shadow-sm`}
                                                    onClick={() => toggleFavorite(prop.idPropiedad)}
                                                >
                                                    <Heart size={18} fill={isFav ? "white" : "none"} className={isFav ? "text-white" : "text-danger"} />
                                                </button>
                                            </div>
                                            <div className="position-absolute bottom-0 start-0 p-3">
                                                <span className="badge bg-white text-danger fw-bold shadow-sm px-3 py-2 rounded-pill">
                                                    {prop.estado.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="fw-bold text-dark mb-0 text-truncate" style={{ maxWidth: '70%' }}>{prop.titulo}</h5>
                                                <span className="text-danger fw-bold h5 mb-0">${Number(prop.precio).toLocaleString()}</span>
                                            </div>
                                            <p className="text-muted small mb-3">
                                                <MapPin size={14} className="me-1" /> {prop.ubicacion}
                                            </p>
                                            <div className="d-flex flex-wrap gap-2 mb-4">
                                                <span className="badge bg-light text-dark fw-normal rounded-pill px-3 py-2">
                                                    <HomeIcon size={14} className="me-1" /> {prop.tamano_m2} m²
                                                </span>
                                                <span className="badge bg-light text-dark fw-normal rounded-pill px-3 py-2">
                                                    <Bed size={14} className="me-1" /> {prop.habitaciones} Hab.
                                                </span>
                                                <span className="badge bg-light text-dark fw-normal rounded-pill px-3 py-2 text-capitalize">
                                                    {prop.tipo}
                                                </span>
                                            </div>
                                            <div className="d-grid">
                                                <button
                                                    className="btn btn-dark rounded-pill py-2 fw-bold"
                                                    onClick={() => navigate(`/user/properties/${prop.idPropiedad}`)}
                                                >
                                                    Ver Detalles
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-12 text-center py-5">
                            <h3 className="text-muted">No se encontraron propiedades.</h3>
                            <button className="btn btn-link text-danger fw-bold" onClick={() => { setSearchTerm(""); setFilters({ min_price: "", max_price: "", type: "" }); }}>Limpiar Filtros</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Properties;
