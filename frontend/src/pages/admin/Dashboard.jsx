import { useState, useEffect } from "react";
import HeaderResumen from "../../components/dashboard/HeaderResumen";
import StatsCards from "../../components/dashboard/StatsCards";
import ProgressStats from "../../components/dashboard/ProgressStats";
import ChartCard from "../../components/dashboard/ChartCard";
import statsService from "../../services/statsService";
import "../../styles/theme.css";

export default function Dashboard() {
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
      console.error("Error al cargar estadísticas del dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-container">
      <HeaderResumen
        period={period}
        setPeriod={setPeriod}
        loading={loading}
        onRefresh={loadStats}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <StatsCards kpis={stats?.kpis} loading={loading} />
          <ChartCard charts={stats?.charts} loading={loading} period={period} />
        </div>
        <div className="glass-card" style={{ margin: 0, padding: '24px' }}>
          <ProgressStats charts={stats?.charts} loading={loading} />
        </div>
      </div>
    </div>
  );
}
