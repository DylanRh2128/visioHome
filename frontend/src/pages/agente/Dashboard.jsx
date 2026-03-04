import { useState, useEffect } from "react";
import {
    Calendar,
    Clock,
    User,
    CheckCircle,
    XCircle,
    AlertCircle,
    TrendingUp,
    Users
} from "lucide-react";
import api from "../../services/api";
import "../../styles/theme.css";

export default function AgenteDashboard() {
    const [stats, setStats] = useState([
        { label: "Citas Totales", value: "0", icon: Calendar, color: "#4f46e5", key: "total_citas" },
        { label: "Citas Hoy", value: "0", icon: Clock, color: "#10b981", key: "citas_hoy" },
        { label: "Pendientes", value: "0", icon: AlertCircle, color: "#f59e0b", key: "citas_pendientes" },
        { label: "Ventas Mes", value: "0", icon: TrendingUp, color: "#8b5cf6", key: "ventas_mes" },
    ]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await api.get("/agente/stats");
            const { stats: backendStats, proximas_citas } = response.data;

            setStats(prev => prev.map(s => ({
                ...s,
                value: backendStats[s.key]?.toString() || "0"
            })));

            setUpcomingAppointments(proximas_citas);
        } catch (error) {
            console.error("Error al cargar datos del dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="agent-dashboard">
            <div className="crud-header">
                <h2>Panel de Control - Agente</h2>
                <p className="text-muted">Bienvenido de nuevo a tu panel de gestión.</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="glass-card" style={{
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                        }}>
                            <div style={{
                                padding: '12px',
                                borderRadius: '12px',
                                background: `${stat.color}20`,
                                color: stat.color
                            }}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{stat.label}</p>
                                <h3 style={{ fontSize: '24px', margin: 0 }}>{loading ? "..." : stat.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-content" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Próximas Citas */}
                <div className="glass-card" style={{ padding: '25px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0 }}>Próximas Citas</h3>
                        <button className="text-btn" style={{ color: '#4f46e5', fontWeight: '600' }}>Ver todas</button>
                    </div>

                    <div className="appointment-list d-flex flex-column gap-3">
                        {loading ? (
                            <p className="text-center py-4">Cargando citas...</p>
                        ) : upcomingAppointments.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                <Calendar size={48} style={{ marginBottom: '15px', opacity: 0.3 }} />
                                <p>No tienes citas programadas próximamente.</p>
                            </div>
                        ) : (
                            upcomingAppointments.map((cita) => (
                                <div key={cita.idCita} className="p-3 border rounded-3 d-flex justify-content-between align-items-center bg-light">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="p-2 bg-white rounded shadow-sm">
                                            <Calendar className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <p className="mb-0 fw-bold">{cita.usuario?.nombre}</p>
                                            <p className="mb-0 small text-muted">
                                                {new Date(cita.fecha).toLocaleDateString()} a las {new Date(cita.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-0 small fw-bold text-uppercase">{cita.estado}</p>
                                        <p className="mb-0 xsmall text-muted">{cita.propiedad?.titulo}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Perfil Rápido / Atajos */}
                <div className="glass-card" style={{ padding: '25px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Acceso Rápido</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <button className="premium-btn w-100 py-3" onClick={() => window.location.href = '/agente/disponibilidad'}>
                            <Clock size={18} /> Gestionar Horarios
                        </button>
                        <button className="glass-btn w-100 py-3 d-flex align-items-center justify-content-center gap-2" onClick={() => window.location.href = '/agente/appointments'}>
                            <Calendar size={18} /> Ver Mis Citas
                        </button>
                        <hr className="my-2" />
                        <div className="p-3 bg-light rounded-3 smaller text-muted">
                            <p className="mb-1 fw-bold text-dark">Tip del día:</p>
                            Mantén tu disponibilidad actualizada para recibir más solicitudes de visita.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
