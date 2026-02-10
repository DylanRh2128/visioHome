import { ArrowUpRight, ArrowDownRight, Users, Building, DollarSign, Wallet } from "lucide-react";
import "../../styles/theme.css";

export default function StatsCards() {
  const stats = [
    {
      icon: <DollarSign size={20} />,
      value: "$158.4K",
      label: "Ingresos Totales",
      trend: "+12.5%",
      isPositive: true,
      color: "#1e8e3e"
    },
    {
      icon: <Building size={20} />,
      value: "142",
      label: "Propiedades",
      trend: "+8.2%",
      isPositive: true,
      color: "var(--primary-red)"
    },
    {
      icon: <Users size={20} />,
      value: "1,204",
      label: "Clientes Activos",
      trend: "-2.4%",
      isPositive: false,
      color: "#1a73e8"
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
      {stats.map((stat, index) => (
        <div key={index} className="glass-card" style={{ margin: 0, padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: `${stat.color}10`,
              color: stat.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {stat.icon}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: '700',
              color: stat.isPositive ? '#1e8e3e' : '#d93025'
            }}>
              {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {stat.trend}
            </div>
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: '700', color: 'var(--text-dark)' }}>{stat.value}</h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
