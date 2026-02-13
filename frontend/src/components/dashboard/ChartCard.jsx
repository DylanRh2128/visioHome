import { TrendingUp, Filter, Calendar, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../../styles/theme.css";

export default function ChartCard({ charts, loading, period }) {
  const data = charts?.ventasPorTiempo ?? [];
  const hasData = data && data.length > 0;

  return (
    <div className="premium-card h-100 d-flex flex-column animate-fade-up">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <BarChart3 size={20} color="var(--primary-vino)" />
            <h3 className="h5 fw-bold mb-0">Rendimiento Operativo</h3>
          </div>
          <p className="text-muted small mb-0">Flujo de caja por periodo de tiempo</p>
        </div>
        <div className="badge rounded-pill px-3 py-2 text-uppercase fw-bold"
          style={{ background: "rgba(107, 0, 0, 0.05)", color: "var(--primary-vino)", letterSpacing: "1px", fontSize: "10px" }}>
          Vista {period === 'year' ? 'Anual' : period === 'month' ? 'Mensual' : period === 'week' ? 'Semanal' : 'Diaria'}
        </div>
      </div>

      <div className="flex-grow-1" style={{ minHeight: '300px' }}>
        {loading ? (
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-danger" role="status"></div>
          </div>
        ) : !hasData ? (
          <div className="h-100 d-flex flex-column align-items-center justify-content-center bg-light rounded-3 border border-dashed">
            <TrendingUp size={48} className="text-muted opacity-25 mb-3" />
            <p className="text-muted fw-semibold small">Sin registros en este periodo</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#999', fontWeight: '500' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#999', fontWeight: '500' }}
                tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(107, 0, 0, 0.03)' }}
                contentStyle={{
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  boxShadow: 'var(--shadow-premium)',
                  padding: '12px'
                }}
                formatter={(value) => [`$${(value || 0).toLocaleString()}`, 'Total Acumulado']}
              />
              <Bar
                dataKey="value"
                fill="var(--primary-vino)"
                radius={[6, 6, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-4 pt-3 border-top d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <div className="rounded-circle" style={{ width: '8px', height: '8px', background: 'var(--primary-vino)' }}></div>
          <span className="text-muted small fw-medium">Ingresos</span>
        </div>
      </div>
    </div>
  );
}
