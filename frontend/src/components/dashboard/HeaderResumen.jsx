import { ChevronDown, RefreshCw } from "lucide-react";
import "../../styles/theme.css";

export default function HeaderResumen() {
  const currentMonth = new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-dark)', margin: 0, letterSpacing: '-0.5px' }}>
          Dashboard <span style={{ color: 'var(--primary-red)' }}>General</span>
        </h2>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>
          Resumen de actividad para <span style={{ textTransform: 'capitalize', color: 'var(--text-dark)', fontWeight: '600' }}>{currentMonth}</span>
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="premium-btn-secondary" style={{ padding: '10px', borderRadius: '8px' }}>
          <RefreshCw size={16} />
        </button>
        <button className="premium-btn" style={{ padding: '10px 16px', borderRadius: '8px' }}>
          <span>Exportar Informe</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
