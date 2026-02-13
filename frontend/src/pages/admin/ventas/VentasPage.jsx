import React, { useState, useEffect } from 'react';
import { ShoppingCart, Calendar, RefreshCcw, TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import statsService from '../../../services/statsService';
import StatCard from '../StatsCards/StatCard';
import { PaymentMethodChart, PropertyTypeChart, AgentPerformanceChart } from '../StatsCards/DistributionCharts';
import IncomeChart from '../StatsCards/IncomeChart';

const VentasPage = () => {
    const initialStats = {
        kpis: {
            ventas: { total: 0, cantidad: 0 },
            usuarios: { total: 0 },
            propiedades: { total: 0 },
            agentes: { total: 0 }
        },
        charts: {
            usuariosPorRol: [],
            ventasPorEstado: [],
            propiedadesPorEstado: [],
            ventasPorTiempo: []
        }
    };

    const [stats, setStats] = useState(initialStats);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('year');

    useEffect(() => {
        loadStats();
    }, [period]);

    const loadStats = async () => {
        try {
            setLoading(true);
            const data = await statsService.getStats(period);
            // Asegurar que la estructura coincida con lo esperado por el componente
            setStats(data || initialStats);
        } catch (error) {
            console.error("Error loading sales stats:", error);
            setStats(initialStats);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(price || 0);
    };

    const renderChange = (change) => {
        // Como el backend actual no envía 'change', usamos 0 por ahora o calculamos si es necesario
        const val = change || 0;
        const isPositive = val >= 0;
        return (
            <span className={`small d-flex align-items-center gap-1 ${isPositive ? 'text-success' : 'text-danger'}`} style={{ fontSize: '0.75rem' }}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isPositive ? '+' : ''}{val}% vs anterior
            </span>
        );
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary-red" role="status" />
                <p className="mt-3 text-muted">Generando reporte de ventas...</p>
            </div>
        );
    }

    if (!stats || !stats.kpis) {
        return (
            <div className="text-center py-5 text-danger">
                No se pudieron cargar las estadísticas.
            </div>
        );
    }

    // Mapeo defensivo de datos del backend a los componentes
    const kpis = stats.kpis;
    const charts = stats.charts || {};

    return (
        <div className="container-fluid py-4 animate-fade-in">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div className="p-2 rounded-3" style={{ background: 'rgba(255, 77, 77, 0.1)' }}>
                        <ShoppingCart className="text-primary-red" size={32} />
                    </div>
                    <div>
                        <h1 className="m-0 h3 font-weight-bold text-white">Panel de Ventas</h1>
                        <p className="text-muted small m-0">Análisis detallado de transacciones y facturación</p>
                    </div>
                </div>

                <div className="d-flex gap-3 align-items-center">
                    <div className="position-relative">
                        <Calendar size={18} className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }} />
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="premium-input ps-5"
                            style={{ minWidth: '160px', height: '45px' }}
                        >
                            <option value="day">Hoy</option>
                            <option value="week">Esta Semana</option>
                            <option value="month">Este Mes</option>
                            <option value="year">Este Año</option>
                        </select>
                    </div>
                    <button onClick={loadStats} className="premium-btn" disabled={loading}>
                        <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* KPI Row */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <StatCard
                        title="Ventas Totales"
                        value={kpis.ventas?.cantidad ?? 0}
                        icon={Target}
                        color="#fbbf24"
                        subtitle={renderChange(0)} // Placeholder para cambio
                    />
                </div>
                <div className="col-md-4">
                    <StatCard
                        title="Total Facturado"
                        value={formatPrice(kpis.ventas?.total ?? 0)}
                        icon={DollarSign}
                        color="#4ade80"
                        subtitle={renderChange(0)} // Placeholder para cambio
                    />
                </div>
                <div className="col-md-4">
                    <div className="glass-card p-4 h-100 d-flex flex-column justify-content-center">
                        <div className="text-muted small uppercase font-weight-bold mb-1">Agentes Activos</div>
                        <div className="d-flex align-items-baseline gap-2">
                            <h2 className="m-0 text-white font-weight-900">{kpis.agentes?.total ?? 0}</h2>
                            <span className="small text-muted">en plataforma</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Charts */}
            <div className="row g-4 mb-4">
                <div className="col-lg-8">
                    <IncomeChart data={charts.ventasPorTiempo ?? []} />
                </div>
                <div className="col-lg-4">
                    <PaymentMethodChart data={charts.ventasPorEstado ?? []} />
                </div>
            </div>

            {/* Distribution Charts */}
            <div className="row g-4 mb-4">
                <div className="col-lg-4">
                    <PropertyTypeChart data={charts.propiedadesPorEstado ?? []} />
                </div>
                <div className="col-lg-8">
                    {/* El backend actual no devuelve ventas por agente en este endpoint, usamos usuarios por rol como distribución alternativa o placeholder */}
                    <AgentPerformanceChart data={charts.usuariosPorRol ?? []} />
                </div>
            </div>

            {/* Summary Row */}
            <div className="row g-4">
                <div className="col-md-12">
                    <div className="glass-card p-4">
                        <h6 className="text-white font-weight-bold mb-3">Resumen de Estados de Transacciones</h6>
                        <div className="d-flex flex-wrap gap-4">
                            {(charts.ventasPorEstado ?? []).map((s, idx) => (
                                <div key={idx} className="d-flex align-items-center gap-2">
                                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: COLORS[idx % COLORS.length] }}></div>
                                    <span className="text-white font-weight-bold">{s.value}</span>
                                    <span className="text-muted small uppercase">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

const COLORS = ['#ff4d4d', '#60a5fa', '#4ade80', '#fbbf24', '#c084fc', '#2dd4bf'];

export default VentasPage;
