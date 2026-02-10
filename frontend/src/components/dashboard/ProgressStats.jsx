import "../../styles/theme.css";
import { Target, Info, ArrowRight } from "lucide-react";

export default function ProgressStats() {
  const stats = [
    { label: "Meta de Ingresos", percentage: 65, color: "var(--primary-red)", val: "$3.5M / $5.0M" },
    { label: "Propiedades en Venta", percentage: 76, color: "#ffb86c", val: "108 / 150" },
    { label: "Tasa de Conversión", percentage: 42, color: "#60a5fa", val: "42% Global" },
    { label: "Retención de Clientes", percentage: 89, color: "#4ade80", val: "89% Anual" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Target size={20} color="var(--primary-red)" />
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Metas Mensuales</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {stats.map((stat, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>{stat.label}</span>
              <span style={{ fontSize: '14px', color: 'var(--text-dark)', fontWeight: '700' }}>{stat.percentage}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#f1f3f4', borderRadius: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${stat.percentage}%`,
                  backgroundColor: stat.color,
                  borderRadius: '10px',
                  transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '16px', borderRadius: '8px', background: '#f8f9fa', borderLeft: '4px solid var(--primary-red)' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Info size={18} color="var(--primary-red)" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', color: '#555' }}>
            Has alcanzado el 80% de tus metas anuales.
            <button style={{ border: 'none', background: 'none', color: 'var(--primary-red)', padding: '0 4px', fontWeight: 'bold', cursor: 'pointer' }}>Ver detalles <ArrowRight size={12} /></button>
          </p>
        </div>
      </div>
    </div>
  );
}
