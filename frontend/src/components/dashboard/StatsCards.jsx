import { ArrowUpRight, ArrowDownRight, Users, Building, DollarSign, Wallet } from "lucide-react";
import "../../styles/theme.css";

export default function StatsCards({ kpis, loading }) {
  const stats = [
    {
      icon: <DollarSign size={22} />,
      value: `$${(kpis?.income?.current ?? 0).toLocaleString()}`,
      label: "Ingresos Brutos",
      trend: `${kpis?.sales?.current ?? 0} Transacciones`,
      isPositive: true,
      color: "var(--primary-vino)"
    },
    {
      icon: <Building size={22} />,
      value: (kpis?.properties?.current ?? 0).toString(),
      label: "Inventario Activo",
      trend: "Propiedades",
      isPositive: true,
      color: "var(--accent-red)"
    },
    {
      icon: <Users size={22} />,
      value: (kpis?.users?.current ?? 0).toString(),
      label: "Usuarios Totales",
      trend: "Cuentas",
      isPositive: true,
      color: "#1a73e8"
    },
  ];

  return (
    <div className="grid-auto" style={{ gap: '1.5rem' }}>
      {stats.map((stat, index) => (
        <div key={index} className="premium-card d-flex flex-column gap-3 animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s`, minHeight: '160px' }}>
          {loading ? (
            <div className="placeholder-glow w-100">
              <div className="placeholder col-4 mb-3" style={{ height: '40px', borderRadius: '10px' }}></div>
              <div className="placeholder col-8 mb-2" style={{ height: '30px' }}></div>
              <div className="placeholder col-5" style={{ height: '20px' }}></div>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-start">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: `${stat.color}10`,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {stat.icon}
                </div>
                <div className="small fw-bold text-muted d-flex align-items-center gap-1">
                  <span style={{ color: stat.isPositive ? '#1e8e3e' : '#d93025' }}>{stat.trend}</span>
                </div>
              </div>
              <div>
                <h3 className="h2 fw-bold mb-1" style={{ letterSpacing: '-1px' }}>{stat.value}</h3>
                <p className="text-muted fw-semibold small mb-0">{stat.label}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
