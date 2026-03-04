import { useState, useEffect } from "react";
import { Check, X, MapPin, User, Calendar as CalendarIcon, Clock, ExternalLink } from "lucide-react";
import api from "../../services/api"; // Usaremos api directamente para los nuevos endpoints
import Swal from "sweetalert2";
import "../../styles/theme.css";

export default function AgenteCitas() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        estado: "",
        fecha: ""
    });

    useEffect(() => {
        loadCitas();
    }, [filters]);

    const loadCitas = async () => {
        try {
            setLoading(true);
            const params = {};
            if (filters.estado) params.estado = filters.estado;
            if (filters.fecha) params.fecha = filters.fecha;

            const response = await api.get("/agente/appointments", { params });
            setCitas(response.data);
        } catch (error) {
            console.error("Error al cargar citas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmar = async (id) => {
        try {
            await api.put(`/agente/appointments/confirm/${id}`);
            Swal.fire("Confirmada", "La cita ha sido marcada como confirmada.", "success");
            loadCitas();
        } catch (error) {
            Swal.fire("Error", "No se pudo confirmar la cita.", "error");
        }
    };

    const handleCancelar = async (id) => {
        const result = await Swal.fire({
            title: "¿Cancelar cita?",
            text: "Indica al usuario que no podrás asistir.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cancelar"
        });

        if (result.isConfirmed) {
            try {
                await api.put(`/agente/appointments/cancel/${id}`);
                Swal.fire("Cancelada", "La cita ha sido cancelada.", "info");
                loadCitas();
            } catch (error) {
                Swal.fire("Error", "No se pudo cancelar la cita.", "error");
            }
        }
    };

    return (
        <div className="citas-page">
            <div className="crud-header">
                <h2>Gestión de Citas</h2>
                <p className="text-muted">Administra tus citas programadas con potenciales clientes.</p>
            </div>

            {/* BARRA DE FILTROS AGENTE */}
            <div className="glass-card mb-4" style={{ padding: '20px', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <select
                        className="form-select border-0 bg-light"
                        style={{ borderRadius: '12px', padding: '12px' }}
                        value={filters.estado}
                        onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
                    >
                        <option value="">Todos los Estados</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="cancelada">Cancelada</option>
                        <option value="realizada">Realizada</option>
                    </select>
                </div>
                <div>
                    <input
                        type="date"
                        className="form-control border-0 bg-light"
                        style={{ borderRadius: '12px', padding: '12px' }}
                        value={filters.fecha}
                        onChange={(e) => setFilters({ ...filters, fecha: e.target.value })}
                    />
                </div>
                <button
                    className="btn btn-light"
                    style={{ borderRadius: '12px', padding: '12px 20px' }}
                    onClick={() => setFilters({ estado: "", fecha: "" })}
                >
                    <X size={18} />
                </button>
            </div>

            <div className="glass-card">
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>Cargando tus citas...</div>
                ) : (
                    <div className="premium-table-container">
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Fecha y Hora</th>
                                    <th>Usuario</th>
                                    <th>Propiedad</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {citas.map((cita) => (
                                    <tr key={cita.idCita}>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: '600' }}>
                                                    {new Date(cita.fecha).toLocaleDateString()}
                                                </span>
                                                <span style={{ fontSize: '13px', color: '#666' }}>
                                                    <Clock size={12} inline /> {new Date(cita.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <User size={16} className="text-muted" />
                                                <span>{cita.usuario?.nombre || "Cargando..."}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '14px', fontWeight: '500' }}>{cita.propiedad?.titulo}</span>
                                                <span className="text-muted" style={{ fontSize: '12px' }}>
                                                    <MapPin size={10} inline /> {cita.propiedad?.ubicacion}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${cita.estado}`}>
                                                {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {cita.estado === 'pendiente' && (
                                                    <button onClick={() => handleConfirmar(cita.idCita)}
                                                        className="action-btn edit"
                                                        style={{ background: '#dcfce7', color: '#166534' }}
                                                        title="Confirmar Cita">
                                                        <Check size={16} />
                                                    </button>
                                                )}
                                                {cita.estado !== 'cancelada' && (
                                                    <button onClick={() => handleCancelar(cita.idCita)}
                                                        className="action-btn delete"
                                                        title="Cancelar Cita">
                                                        <X size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {citas.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                                            No tienes citas registradas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
