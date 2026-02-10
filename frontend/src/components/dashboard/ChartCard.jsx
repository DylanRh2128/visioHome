import { TrendingUp, Filter, Calendar } from "lucide-react";
import "../../styles/theme.css";

export default function ChartCard() {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
  const data1 = [40, 30, 60, 45, 80, 55, 75];
  const data2 = [25, 20, 40, 30, 60, 40, 50];

  return (
    <div className="glass-card" style={{ margin: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700' }}>Actividad de Negocios</h3>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Comparativa mensual de cierres y visitas</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="premium-btn-secondary" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={14} />
            <span>Mensual</span>
          </button>
          <button className="premium-btn-secondary" style={{ padding: '8px 12px' }}>
            <Filter size={14} />
          </button>
        </div>
      </div>

      <div style={{
        height: '220px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 10px 20px',
        borderBottom: '1px solid var(--border-grey)'
      }}>
        {months.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '180px' }}>
              <div style={{
                width: '12px',
                height: `${data1[i]}%`,
                backgroundColor: 'var(--primary-red)',
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.6s ease'
              }} />
              <div style={{
                width: '12px',
                height: `${data2[i]}%`,
                backgroundColor: '#e9ecef',
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.8s ease'
              }} />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{m}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--primary-red)' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>Propiedades Vendidas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#e9ecef' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>Visitas Registradas</span>
        </div>
      </div>
    </div>
  );
}
