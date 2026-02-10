import HeaderResumen from "../../components/dashboard/HeaderResumen";
import StatsCards from "../../components/dashboard/StatsCards";
import ProgressStats from "../../components/dashboard/ProgressStats";
import ChartCard from "../../components/dashboard/ChartCard";
import "../../styles/theme.css";

export default function Dashboard() {
  return (
    <div className="crud-container">
      <HeaderResumen />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <StatsCards />
          <ChartCard />
        </div>
        <div className="glass-card" style={{ margin: 0, padding: '24px' }}>
          <ProgressStats />
        </div>
      </div>
    </div>
  );
}
