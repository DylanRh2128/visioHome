import "../../styles/theme.css";
import { PieChart as PieIcon, Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function ProgressStats({ charts, loading }) {
  const roleData = charts?.usuariosPorRol ?? [];
  const statusData = charts?.propiedadesPorEstado ?? [];

  const COLORS = ['var(--primary-vino)', 'var(--accent-red)', '#2a2a2a', '#e9ecef'];

  return (
    <div className="d-flex flex-column gap-5">
      <div>
        <div className="d-flex align-items-center gap-2 mb-4">
          <PieIcon size={22} color="var(--primary-vino)" />
          <h3 className="h6 fw-bold mb-0 text-uppercase ls-1">Distribución Usuarios</h3>
        </div>

        <div style={{ height: '240px', width: '100%' }}>
          {loading ? (
            <div className="placeholder-glow h-100 d-flex align-items-center justify-content-center bg-light rounded-3">
              <div className="spinner-border text-muted opacity-25" role="status"></div>
            </div>
          ) : roleData.length === 0 ? (
            <div className="h-100 d-flex align-items-center justify-content-center bg-light rounded-3 border border-dashed">
              <p className="text-muted small">Sin métricas disponibles</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [value, 'Cuentas']}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="pt-4 border-top">
        <div className="d-flex align-items-center gap-2 mb-4">
          <Activity size={22} color="var(--primary-vino)" />
          <h3 className="h6 fw-bold mb-0 text-uppercase ls-1">Estado Inmobiliario</h3>
        </div>

        <div className="d-flex flex-column gap-4">
          {statusData.length > 0 ? statusData.map((item, index) => (
            <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="small fw-semibold text-muted">{item.label}</span>
                <span className="small fw-bold">{item.value} Units</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${(item.value / (statusData.reduce((a, b) => a + (b.value || 0), 0) || 1)) * 100}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                    borderRadius: '10px',
                    transition: 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1)'
                  }}
                />
              </div>
            </div>
          )) : (
            <p className="text-muted small text-center opacity-50">Cargando inventario...</p>
          )}
        </div>
      </div>
    </div>
  );
}
