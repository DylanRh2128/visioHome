import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from "../../../services/api";

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await api.get(`/propiedades/${id}`);
                setProperty(response.data);

                // Check if is favorite
                const favRes = await api.get(`/user/favorites/check/${id}`);
                setIsFavorite(favRes.data.is_favorite);

            } catch (error) {
                console.error("Error loading property:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
        window.scrollTo(0, 0);
    }, [id]);

    const addToCart = async () => {
        try {
            await api.post("/user/cart/add", {
                idPropiedad: id,
                cantidad: 1
            });
            Swal.fire({
                icon: "success",
                title: "Reserva Iniciada",
                text: "Propiedad agregada al carrito con éxito.",
                confirmButtonColor: '#6b0000'
            });
        } catch (error) {
            Swal.fire("Error", "No se pudo agregar al carrito.", "error");
        }
    };

    const toggleFavorite = async () => {
        try {
            const response = await api.post(`/user/favorites/toggle/${id}`);
            setIsFavorite(response.data.is_favorite);
            Swal.fire({
                icon: "success",
                title: response.data.is_favorite ? "Agregado" : "Eliminado",
                text: response.data.message,
                timer: 1000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error("Error toggling favorite", error);
        }
    };

    if (loading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    if (!property) return (
        <div className="container py-5 text-center">
            <h3>Propiedad no encontrada</h3>
            <Link to="/user/properties" className="btn btn-danger mt-3">Volver al buscador</Link>
        </div>
    );

    const images = property.imagenes && property.imagenes.length > 0
        ? property.imagenes.map(img => img.urlImagen)
        : [property.imagen_principal || 'https://images.unsplash.com/photo-1600585154340-be6191dae10c?auto=format&fit=crop&q=80&w=1200'];

    return (
        <div className="container py-5">
            {/* Header / Breadcrumb */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Link to="/user/properties" className="btn btn-outline-dark border-0 rounded-pill d-flex align-items-center gap-2 fw-bold text-uppercase small">
                    <ChevronLeft size={16} /> Volver al listado
                </Link>
                <div className="d-flex gap-2">
                    <button className="btn btn-light rounded-circle p-2 shadow-sm"><Share2 size={18} /></button>
                    <button
                        className={`btn ${isFavorite ? 'btn-danger' : 'btn-light'} rounded-circle p-2 shadow-sm`}
                        onClick={toggleFavorite}
                    >
                        <Heart size={18} fill={isFavorite ? "white" : "none"} />
                    </button>
                </div>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-lg-8">
                    {/* Bootstrap Carousel for Images */}
                    <div id="propertyCarousel" className="carousel slide shadow-lg rounded-5 overflow-hidden mb-4" data-bs-ride="carousel">
                        <div className="carousel-inner" style={{ height: '500px' }}>
                            {images.map((img, idx) => (
                                <div key={idx} className={`carousel-item h-100 ${idx === 0 ? 'active' : ''}`}>
                                    <img src={img} className="d-block w-100 h-100 object-fit-cover" alt={`Imagen ${idx + 1}`} />
                                </div>
                            ))}
                        </div>
                        {images.length > 1 && (
                            <>
                                <button className="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Anterior</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Siguiente</span>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="mb-4">
                        <div className="d-flex gap-2 mb-2">
                            <span className="badge bg-danger px-3 py-2 rounded-pill text-uppercase" style={{ backgroundColor: '#6b0000' }}>
                                {property.estado === 'disponible' ? 'En Venta' : property.estado.toUpperCase()}
                            </span>
                            <span className="badge bg-dark px-3 py-2 rounded-pill text-uppercase">{property.tipo.toUpperCase()}</span>
                        </div>
                        <h1 className="fw-bold display-5 mb-1 text-dark">{property.titulo}</h1>
                        <p className="lead d-flex align-items-center gap-2 text-muted"><MapPin size={20} /> {property.ubicacion}</p>
                    </div>

                    {/* Specs Grid */}
                    <div className="row g-3 mb-5">
                        <div className="col-6 col-md-3 text-center">
                            <div className="bg-white shadow-sm p-4 rounded-4 border-bottom border-danger border-4">
                                <Bed className="text-danger mb-2" size={28} />
                                <h5 className="fw-bold mb-0 text-dark">{property.habitaciones || 1}</h5>
                                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Habitaciones</small>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <div className="bg-white shadow-sm p-4 rounded-4 border-bottom border-danger border-4">
                                <Bath className="text-danger mb-2" size={28} />
                                <h5 className="fw-bold mb-0 text-dark">{property.banos || 1}</h5>
                                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Baños</small>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <div className="bg-white shadow-sm p-4 rounded-4 border-bottom border-danger border-4">
                                <Layout className="text-danger mb-2" size={28} />
                                <h5 className="fw-bold mb-0 text-dark">{property.tamano_m2}m²</h5>
                                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Area Total</small>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <div className="bg-white shadow-sm p-4 rounded-4 border-bottom border-success border-4">
                                <Shield className="text-success mb-2" size={28} />
                                <h5 className="fw-bold mb-0 text-dark">Legal</h5>
                                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Verificado</small>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <h3 className="fw-bold text-dark mb-3">Descripción</h3>
                        <p className="text-muted lead fs-6" style={{ textAlign: 'justify', lineHeight: '1.8' }}>
                            {property.descripcion}
                        </p>
                    </div>

                    {/* MAP INTEGRATION (Phase 3) */}
                    <div className="mb-5">
                        <h3 className="fw-bold text-dark mb-3">Ubicación Estretégica</h3>
                        <div className="rounded-5 overflow-hidden shadow-sm border" style={{ height: '400px' }}>
                            {property.latitud && property.longitud ? (
                                <MapContainer center={[property.latitud, property.longitud]} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[property.latitud, property.longitud]}>
                                        <Popup>
                                            <div className="text-center p-2">
                                                <h6 className="fw-bold mb-1">{property.titulo}</h6>
                                                <p className="small text-muted mb-0">{property.ubicacion}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            ) : (
                                <div className="h-100 bg-light d-flex align-items-center justify-content-center text-muted">
                                    <p><MapPin size={48} className="mb-2 d-block mx-auto" /> Mapa no disponible para esta ubicación</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="mb-5">
                        <h3 className="fw-bold text-dark mb-4">Comentarios y Calificaciones</h3>
                        <Comments idPropiedad={id} />
                    </div>
                </div>

                {/* Sidebar Sticky Panel */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-lg rounded-5 p-4 sticky-top border-top border-danger border-5" style={{ top: '100px', backgroundColor: '#fff', zIndex: 10 }}>
                        <div className="mb-4">
                            <span className="text-muted small text-uppercase fw-bold tracking-widest d-block mb-1">Precio Exclusivo</span>
                            <h2 className="fw-bold text-danger display-6 mb-0" style={{ color: '#6b0000' }}>
                                ${Number(property.precio).toLocaleString()}
                            </h2>
                            <p className="small text-muted mt-2 mb-0">Impuestos y gastos de gestión incluidos.</p>
                        </div>

                        <div className="d-grid gap-3 mb-4">
                            <Link to={`/user/appointments?idPropiedad=${id}`} className="btn btn-danger btn-lg py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#6b0000' }}>
                                <Calendar size={20} /> Agendar Visita
                            </Link>
                            <button onClick={addToCart} className="btn btn-outline-dark btn-lg py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm">
                                <ShoppingCart size={20} /> Reservar Propiedad
                            </button>
                        </div>

                        <hr className="my-4 opacity-10" />

                        <div className="d-flex align-items-center gap-3">
                            <div className="p-1 border border-2 border-danger rounded-circle">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=AgenteElite" className="rounded-circle" style={{ width: '50px', height: '50px' }} alt="Agente" />
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold">Asesor de Ventas Elite</h6>
                                <p className="text-muted small mb-0 d-flex align-items-center gap-1">
                                    <span className="badge bg-success bg-opacity-10 text-success p-1 rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                                    En línea ahora
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
