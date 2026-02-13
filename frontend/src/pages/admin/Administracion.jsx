import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, RefreshCcw, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import statsService from "../../services/statsService";
import StatsGrid from "./StatsCards/StatsGrid";
import IncomeChart from "./StatsCards/IncomeChart";

export default function Administracion() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("year");

  useEffect(() => {
    loadStats();
  }, [period]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await statsService.getStats(period);
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleChange = (e) => {
    navigate(`/admin/${e.target.value}`);
  };

  return (
    <div className="container-fluid py-4" style={{ minHeight: '100vh', background: 'transparent' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="p-2 rounded-3 bg-primary-red-dim">
            <LayoutDashboard className="text-primary-red" size={32} />
          </div>
          <div>
            <h1 className="m-0 h3 font-weight-bold text-white">Analytics Dashboard</h1>
            <p className="text-muted small m-0">Reporte de rendimiento perimetral</p>
          </div>
        </div>

        <div className="d-flex gap-3 align-items-center">
          <div className="position-relative">
            <Calendar size={18} className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }} />
            <select
              value={period}
              onChange={handlePeriodChange}
              className="premium-input ps-5"
              style={{ minWidth: '160px', height: '45px' }}
            >
              <option value="day">Hoy</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mes</option>
              <option value="year">Este Año</option>
            </select>
          </div>

          <button
            onClick={loadStats}
            className="premium-btn d-flex align-items-center gap-2"
            disabled={loading}
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
          >
            <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
            Recargar
          </button>

          <select
            onChange={handleChange}
            defaultValue=""
            className="premium-input"
            style={{ minWidth: '200px', height: '45px' }}
          >
            <option value="" disabled>-- Gestión CRUD --</option>
            <option value="ventas">Analíticas de Ventas</option>
            <option value="usuarios">Usuarios</option>
            <option value="agentes">Agentes</option>
            <option value="propiedades">Propiedades</option>
            <option value="facturas">Facturacion</option>
          </select>
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0))', margin: '2rem 0' }} />

      {loading && !stats ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary-red" role="status">
            <span className="visually-hidden">Cargando métricas...</span>
          </div>
          <p className="mt-3 text-muted">Consultando registros...</p>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="mb-4">
            <StatsGrid stats={stats} />
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-8">
              <IncomeChart data={stats.chartData} />
            </div>
            <div className="col-lg-4">
              <div className="glass-card p-4 h-100 d-flex flex-column justify-content-center text-center">
                <div className="mb-3">
                  <div className="text-muted small uppercase font-weight-bold mb-1">Rendimiento Mensual</div>
                  <h1 className="text-white font-weight-900 m-0" style={{ fontSize: '3.5rem' }}>{stats.kpis.sales.change}%</h1>
                  <div className={`d-flex align-items-center justify-content-center gap-1 ${stats.kpis.sales.change >= 0 ? 'text-success' : 'text-danger'}`}>
                    {stats.kpis.sales.change >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    <span className="font-weight-bold">Incremento en ventas</span>
                  </div>
                </div>
                <p className="text-muted small">Métrica calculada comparando el volumen de transacciones actuales vs el período anterior.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .bg-primary-red-dim { background: rgba(107, 0, 0, 0.1); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
