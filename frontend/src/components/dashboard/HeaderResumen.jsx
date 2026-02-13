import { ChevronDown, RefreshCw } from "lucide-react";
import "../../styles/theme.css";

export default function HeaderResumen({ period, setPeriod, loading, onRefresh }) {
  const currentMonth = new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });

  return (
    <div className="d-flex justify-content-between align-items-center mb-5 animate-fade-up">
      <div>
        <h2 className="section-title mb-1">
          Dashboard <span style={{ color: 'var(--accent-red)' }}>General</span>
        </h2>
        <p className="text-muted small">
          Análisis estratégico para <span className="text-dark fw-bold" style={{ textTransform: 'capitalize' }}>{currentMonth}</span>
        </p>
      </div>

      <div className="d-flex gap-3">
        <div className="premium-card p-1 d-flex align-items-center" style={{ borderRadius: 'var(--radius-sm)' }}>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border-0 bg-transparent px-3 py-2 fw-semibold text-muted small"
            style={{ outline: 'none', cursor: 'pointer' }}
          >
            <option value="day">Vista Diaria</option>
            <option value="week">Semanal</option>
            <option value="month">Mensual</option>
            <option value="year">Anual</option>
          </select>
        </div>

        <button
          className="premium-btn shadow-sm"
          style={{ padding: '10px' }}
          onClick={onRefresh}
          disabled={loading}
          title="Actualizar datos"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>

        <button className="premium-btn shadow-sm px-4">
          <span>Reporte</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
