import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Home, Calendar, Star, TrendingUp, Search, MapPin } from "lucide-react";
import api from "../../services/api";

export default function DashboardUser() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/user/dashboard-data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row mb-5 align-items-center">
        <div className="col-md-8">
          <h1 className="fw-bold text-dark display-5 mb-1">
            Hola, <span className="text-danger">{user?.nombre?.split(' ')[0] || "Usuario"}</span>
          </h1>
          <p className="lead text-muted">Encontramos <span className="fw-bold text-dark">{data?.featured_properties?.length || 0}</span> nuevas propiedades que podrían interesarte.</p>
        </div>
        <div className="col-md-4 text-md-end">
          <div className="d-flex gap-2 justify-content-md-end">
            <button className="btn btn-outline-dark rounded-pill px-4 py-2 fw-bold">Ver Perfil</button>
            <button className="btn btn-danger rounded-pill px-4 py-2 fw-bold" style={{ backgroundColor: '#6b0000' }}>Explorar</button>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {/* Stats Cards */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 hover-lift transition-all">
            <div className="d-flex flex-column gap-3">
              <div className="p-3 bg-primary bg-opacity-10 rounded-4 text-primary w-fit-content">
                <Home size={28} />
              </div>
              <div>
                <h6 className="mb-1 text-muted small fw-bold text-uppercase tracking-wider">Propiedades</h6>
                <h3 className="fw-bold mb-0 text-dark">{data?.featured_properties?.length || 0}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 hover-lift transition-all">
            <div className="d-flex flex-column gap-3">
              <div className="p-3 bg-danger bg-opacity-10 rounded-4 text-danger w-fit-content">
                <Calendar size={28} />
              </div>
              <div>
                <h6 className="mb-1 text-muted small fw-bold text-uppercase tracking-wider">Citas</h6>
                <h3 className="fw-bold mb-0 text-dark">{data?.stats?.appointments_count || 0}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 hover-lift transition-all">
            <div className="d-flex flex-column gap-3">
              <div className="p-3 bg-warning bg-opacity-10 rounded-4 text-warning w-fit-content">
                <Star size={28} />
              </div>
              <div>
                <h6 className="mb-1 text-muted small fw-bold text-uppercase tracking-wider">Favoritas</h6>
                <h3 className="fw-bold mb-0 text-dark">{data?.stats?.favorites_count || 0}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 hover-lift transition-all">
            <div className="d-flex flex-column gap-3">
              <div className="p-3 bg-success bg-opacity-10 rounded-4 text-success w-fit-content">
                <TrendingUp size={28} />
              </div>
              <div>
                <h6 className="mb-1 text-muted small fw-bold text-uppercase tracking-wider">En Carrito</h6>
                <h3 className="fw-bold mb-0 text-dark">{data?.stats?.cart_count || 0}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Próximas Citas */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
            <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Tus próximas citas</h5>
              <button className="btn btn-link text-danger fw-bold text-decoration-none p-0">Ver todas</button>
            </div>
            <div className="card-body p-4 pt-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle border-0">
                  <thead className="table-light">
                    <tr className="border-0">
                      <th className="border-0 rounded-start">Propiedad</th>
                      <th className="border-0">Fecha</th>
                      <th className="border-0">Estado</th>
                      <th className="border-0 rounded-end text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.upcoming_appointments?.length > 0 ? (
                      data.upcoming_appointments.map((apt) => (
                        <tr key={apt.idCita}>
                          <td className="fw-bold">ID Propiedad: {apt.idPropiedad}</td>
                          <td>{new Date(apt.fecha).toLocaleDateString()}</td>
                          <td>
                            <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2">
                              {apt.estado}
                            </span>
                          </td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-dark rounded-pill px-3">Gestionar</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-5 text-muted">
                          No tienes citas próximas programadas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 bg-dark text-white p-4 h-100 position-relative overflow-hidden">
            <div className="position-absolute top-0 end-0 p-3 opacity-10">
              <Search size={120} />
            </div>
            <div className="position-relative z-1">
              <span className="badge bg-danger mb-3 px-3 py-2 fw-bold" style={{ backgroundColor: '#6b0000' }}>Exclusivo</span>
              <h2 className="fw-bold mb-3 lh-sm">Encuentra la casa de tus sueños hoy.</h2>
              <p className="text-light opacity-75 mb-4">Utiliza nuestro buscador avanzado para filtrar por ubicación, precio y tipo de propiedad.</p>

              <div className="input-group mb-3 bg-white bg-opacity-10 rounded-4 overflow-hidden p-1 border border-white border-opacity-25">
                <span className="input-group-text bg-transparent border-0 text-white opacity-50 px-3">
                  <Search size={18} />
                </span>
                <input type="text" className="form-control bg-transparent border-0 text-white shadow-none placeholder-light py-2" placeholder="Buscar ubicación..." />
              </div>

              <button className="btn btn-light w-100 py-3 rounded-4 fw-bold mt-2 shadow-lg hover-scale transition-all">
                Iniciar Búsqueda
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Row */}
      <div className="row mt-5">
        <div className="col-12 mb-4 d-flex justify-content-between align-items-end">
          <div>
            <h5 className="fw-bold mb-1">Nuevas Oportunidades</h5>
            <p className="text-muted small mb-0">Basado en tus últimas búsquedas</p>
          </div>
          <button className="btn btn-outline-dark btn-sm rounded-pill px-4">Ver más</button>
        </div>

        {data?.featured_properties?.map(prop => (
          <div key={prop.idPropiedad} className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 hover-lift transition-all">
              <div className="position-relative" style={{ height: '180px' }}>
                <img
                  src={prop.imagen_principal || `https://api.dicebear.com/7.x/avataaars/svg?seed=${prop.titulo}`}
                  className="card-img-top w-100 h-100 object-fit-cover"
                  alt={prop.titulo}
                />
                <div className="position-absolute top-0 end-0 p-2">
                  <button className="btn btn-white btn-sm rounded-circle p-2 shadow-sm"><Star size={14} className="text-warning" /></button>
                </div>
                <div className="position-absolute bottom-0 start-0 p-2">
                  <span className="badge bg-white text-dark shadow-sm px-2 py-1 small rounded-pill">
                    <MapPin size={10} className="me-1" /> {prop.ubicacion}
                  </span>
                </div>
              </div>
              <div className="card-body p-3">
                <h6 className="fw-bold mb-1 text-truncate">{prop.titulo}</h6>
                <p className="text-danger fw-bold mb-2 h5">${Number(prop.precio).toLocaleString()}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">{prop.tamano_m2}m²</span>
                  <button
                    className="btn btn-link text-dark btn-sm p-0 fw-bold text-decoration-none"
                    onClick={() => navigate(`/user/properties/${prop.idPropiedad}`)}
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
