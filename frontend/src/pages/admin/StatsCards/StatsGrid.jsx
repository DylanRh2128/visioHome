import React from 'react';
import { Users, Receipt, DollarSign, Home, BadgeCheck, TrendingUp, TrendingDown, Layout, UserCheck } from 'lucide-react';
import StatCard from './StatCard';

const StatsGrid = ({ stats }) => {
    if (!stats || !stats.kpis) return null;

    const { kpis, rankings } = stats;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(price);
    };

    const renderChange = (change) => {
        const isPositive = change >= 0;
        return (
            <span className={`small d-flex align-items-center gap-1 ${isPositive ? 'text-success' : 'text-danger'}`} style={{ fontSize: '0.7rem' }}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {isPositive ? '+' : ''}{change}% vs anterior
            </span>
        );
    };

    return (
        <div className="stats-layout">
            {/* KPI Cards */}
            <div className="row g-3 mb-4">
                <div className="col-lg-3 col-md-6">
                    <StatCard
                        title="Ingresos Totales"
                        value={formatPrice(kpis.income.current)}
                        icon={DollarSign}
                        color="#4ade80"
                        subtitle={renderChange(kpis.income.change)}
                    />
                </div>
                <div className="col-lg-3 col-md-6">
                    <StatCard
                        title="Ventas Totales"
                        value={kpis.sales.current}
                        icon={Receipt}
                        color="#fbbf24"
                        subtitle={renderChange(kpis.sales.change)}
                    />
                </div>
                <div className="col-lg-2 col-md-4">
                    <StatCard
                        title="Usuarios Nuevos"
                        value={kpis.users.current}
                        icon={Users}
                        color="#60a5fa"
                        subtitle={renderChange(kpis.users.change)}
                    />
                </div>
                <div className="col-lg-2 col-md-4">
                    <StatCard
                        title="Propios Pubs."
                        value={kpis.properties.current}
                        icon={Home}
                        color="#2dd4bf"
                        subtitle={renderChange(kpis.properties.change)}
                    />
                </div>
                <div className="col-lg-2 col-md-4">
                    <StatCard
                        title="Agentes Activos"
                        value={kpis.activeAgents}
                        icon={UserCheck}
                        color="#c084fc"
                        subtitle="Total plataforma"
                    />
                </div>
            </div>

            {/* Rankings Section */}
            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <div className="glass-card p-4 h-100">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <BadgeCheck className="text-primary-red" size={24} />
                            <h5 className="m-0 text-white font-weight-bold">Top Agente de Ventas</h5>
                        </div>
                        {rankings.topAgente ? (
                            <div className="d-flex align-items-center justify-content-between p-3 rounded-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ width: 45, height: 45, background: 'rgba(107,0,0,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--accent-red)' }}>
                                        {rankings.topAgente.nombre.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-weight-bold">{rankings.topAgente.nombre}</div>
                                        <div className="text-muted small">{rankings.topAgente.total_sales} ventas cerradas</div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <div className="text-white font-weight-900">{formatPrice(rankings.topAgente.total_amount)}</div>
                                    <div className="text-muted small">Total acumulado</div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted italic">No hay datos suficientes para este período.</p>
                        )}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="glass-card p-4 h-100">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <Layout className="text-primary-red" size={24} />
                            <h5 className="m-0 text-white font-weight-bold">Propiedad más Vendida</h5>
                        </div>
                        {rankings.topPropiedad ? (
                            <div className="d-flex align-items-center justify-content-between p-3 rounded-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ width: 45, height: 45, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Home size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white font-weight-bold">{rankings.topPropiedad.titulo}</div>
                                        <div className="text-muted small">ID Inmueble disponible</div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <div className="text-white font-weight-900">{rankings.topPropiedad.total_sales}</div>
                                    <div className="text-muted small">Pagos registrados</div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted italic">No hay datos suficientes para este período.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsGrid;
