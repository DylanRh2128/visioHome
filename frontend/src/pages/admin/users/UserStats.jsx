import React, { useState, useEffect } from "react";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList
} from "recharts";
import { Users, Filter, Calendar, MoreHorizontal } from "lucide-react";
import statsService from "../../../services/statsService";

const COLORS = ["#6b0000", "#d40000", "#ffcc00", "#808080"];
const GENDER_COLORS = {
    'Hombre': '#6b0000',
    'Mujer': '#fff9c4', // Light yellowish as in image
    'Otro': '#808080'
};

export default function UserStats() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("year");

    useEffect(() => {
        fetchData();
    }, [period]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await statsService.getUserStats(period);
            setData(res);
        } catch (error) {
            console.error("Error fetching user stats:", error);
            setData({
                genderDistribution: [],
                funnelData: [],
                recentUsers: [],
                totalUsers: 0
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: "40px", textAlign: "center", color: "#6b0000" }}>
                <div className="spinner-border" role="status"></div>
                <h3>Cargando estadísticas...</h3>
            </div>
        );
    }

    const totalUsers = data?.totalUsers ?? 0;
    const genderDist = data?.genderDistribution ?? [];
    const funnelData = data?.funnelData ?? [];
    const recentUsers = data?.recentUsers ?? [];

    // Pre-process gender data for the chart to match image labels
    const genderChartData = genderDist.map(item => ({
        name: (item.name || "OTRO").toUpperCase(),
        value: item.value || 0,
        percent: totalUsers > 0
            ? ((item.value / totalUsers) * 100).toFixed(0) + "%"
            : "0%"
    }));

    return (
        <div style={styles.container}>
            {/* HEADER */}
            <div style={styles.header}>
                <h1 style={styles.title}>
                    Usuarios {period === 'year' ? 'este año' : period === 'month' ? 'este mes' : 'esta semana'} VisioHome
                </h1>
                <div style={styles.filterContainer}>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        style={styles.select}
                    >
                        <option value="year">Año</option>
                        <option value="month">Mes</option>
                        <option value="week">Semana</option>
                    </select>
                </div>
            </div>

            <div style={styles.contentGrid}>
                {/* LEFT: GENDER PIE CHART */}
                <div style={styles.chartCard}>
                    <div style={{ width: '100%', height: 300, position: 'relative' }}>
                        {genderChartData.length > 0 && totalUsers > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={genderChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={0}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={450}
                                    >
                                        {genderChartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.name === 'MUJER' ? '#fff9c4' : entry.name === 'HOMBRE' ? '#6b0000' : '#808080'}
                                                stroke="#000"
                                                strokeWidth={1}
                                            />
                                        ))}
                                        <LabelList
                                            dataKey="percent"
                                            position="inside"
                                            style={{ fill: '#000', fontWeight: 'bold', fontSize: '14px' }}
                                        />
                                    </Pie>
                                    <Tooltip formatter={(value, name, props) => [value, props?.payload?.name ?? 'Género']} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div style={styles.emptyChart}>
                                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📊</div>
                                <p style={{ color: '#999', margin: 0 }}>Sin datos de género</p>
                            </div>
                        )}
                    </div>
                    <div style={styles.customLegend}>
                        {genderChartData.length > 0 && genderChartData.map((item, idx) => (
                            <div key={idx} style={styles.legendItem}>
                                <span style={{ fontWeight: 'bold' }}>{item.percent}</span>
                                <span style={{ fontSize: '12px' }}>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CENTER: ENGAGEMENT FUNNEL */}
                <div style={styles.funnelCard}>
                    <div style={styles.funnelHeader}>
                        <div style={styles.funnelValue}>{totalUsers.toLocaleString()}</div>
                    </div>
                    <div style={styles.funnelBody}>
                        {funnelData.length > 0 && totalUsers > 0 ? funnelData.map((item, index) => (
                            <div key={index} style={styles.funnelRow}>
                                <div style={styles.funnelLabel}>{item.name}</div>
                                <div
                                    style={{
                                        ...styles.funnelBar,
                                        width: `${totalUsers > 0 ? Math.max((item.value / totalUsers) * 100, 5) : 0}%`, // Min width for visibility
                                        backgroundColor: item.color,
                                        borderBottom: index < funnelData.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none'
                                    }}
                                >
                                    {item.value.toLocaleString()}
                                </div>
                            </div>
                        )) : (
                            <div style={styles.emptyFunnel}>
                                <div style={{ fontSize: '30px', marginBottom: '10px' }}>⏳</div>
                                <p style={{ color: '#666', fontWeight: 'bold' }}>Sin datos en el embudo</p>
                                <span style={{ fontSize: '12px', color: '#999' }}>No hay registros para este periodo</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: LATEST ACTIVITY */}
                <div style={styles.activityCard}>
                    <div style={styles.activityHeader}>
                        <div style={styles.tabs}>
                            <button style={styles.tabActive}>Latest activity</button>
                        </div>
                        <MoreHorizontal size={18} color="#999" />
                    </div>

                    <div style={styles.activityList}>
                        {recentUsers.length > 0 ? recentUsers.map((activity, idx) => (
                            <div key={idx} style={styles.activityItem}>
                                <div style={styles.activityAvatar}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '8px',
                                        background: `linear-gradient(135deg, ${COLORS[idx % COLORS.length]}, #333)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '18px'
                                    }}>
                                        {activity.nombre ? activity.nombre.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </div>
                                <div style={styles.activityInfo}>
                                    <div style={styles.activityUser}>
                                        {activity.nombre ?? 'Usuario Anónimo'}
                                        <span style={{ marginLeft: '8px', color: '#ffcc00' }}>
                                            {'★'.repeat(activity.puntuacion ?? 0)}
                                        </span>
                                    </div>
                                    <div style={styles.activityText}>{activity.texto ?? 'Sin comentario.'}</div>
                                    <div style={styles.activityStats}>
                                        <span>{activity.correo ?? ''}</span>
                                    </div>
                                </div>
                                <div style={styles.activityDate}>
                                    {activity.fecha ? new Date(activity.fecha).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Reciente'}
                                </div>
                            </div>
                        )) : (
                            <div style={styles.emptyActivity}>
                                <div style={styles.emptyIcon}>💬</div>
                                <p style={styles.emptyText}>No hay comentarios registrados</p>
                                <span style={styles.emptySubtext}>La actividad reciente de los usuarios aparecerá aquí.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "30px",
        background: "#f4f4f4",
        minHeight: "100%",
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "30px",
        position: "relative",
    },
    title: {
        fontSize: "28px",
        fontWeight: "600",
        color: "#333",
        background: "white",
        padding: "10px 40px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    filterContainer: {
        position: "absolute",
        right: 0,
    },
    select: {
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        background: "white",
        fontSize: "14px",
        cursor: "pointer",
    },
    contentGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr 1fr",
        gap: "24px",
        alignItems: "start",
    },
    chartCard: {
        background: "transparent",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    customLegend: {
        display: "flex",
        gap: "40px",
        marginTop: "10px",
    },
    legendItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    funnelCard: {
        background: "transparent",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    funnelHeader: {
        width: "100%",
        height: "60px",
        background: "linear-gradient(to bottom, #4a0000, #220000)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "700",
        clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)",
        marginBottom: "2px",
    },
    funnelBody: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
    },
    funnelRow: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: 'relative',
    },
    funnelLabel: {
        position: "absolute",
        left: "-120px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "13px",
        fontWeight: "700",
        color: "#333",
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        width: '110px',
        textAlign: 'right',
    },
    funnelBar: {
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "16px",
        fontWeight: "600",
        transition: "all 0.3s ease",
    },
    activityCard: {
        background: "white",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    },
    activityHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    tabs: {
        display: "flex",
        gap: "15px",
    },
    tabActive: {
        background: "transparent",
        border: "none",
        borderBottom: "2px solid #6b0000",
        padding: "4px 0",
        fontSize: "13px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    tab: {
        background: "transparent",
        border: "none",
        color: "#999",
        padding: "4px 0",
        fontSize: "13px",
        cursor: "pointer",
    },
    activityList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    activityItem: {
        display: "flex",
        gap: "12px",
        position: "relative",
    },
    activityAvatar: {
        width: "50px",
        height: "50px",
        background: "#eee",
        borderRadius: "12px",
        flexShrink: 0,
    },
    activityInfo: {
        flex: 1,
    },
    activityUser: {
        fontSize: "14px",
        fontWeight: "bold",
        marginBottom: "2px",
    },
    activityText: {
        fontSize: "12px",
        color: "#666",
        marginBottom: "6px",
        lineHeight: "1.4",
    },
    activityStats: {
        display: "flex",
        gap: "12px",
        fontSize: "11px",
        color: "#999",
    },
    activityDate: {
        fontSize: "11px",
        color: "#999",
        position: "absolute",
        right: 0,
        top: 0,
    },
    emptyActivity: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        background: '#fcfcfc',
        borderRadius: '12px',
        border: '1px dashed #ddd'
    },
    emptyIcon: {
        fontSize: '48px',
        marginBottom: '16px',
        opacity: 0.5
    },
    emptyText: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#666',
        margin: '0 0 8px 0'
    },
    emptySubtext: {
        fontSize: '13px',
        color: '#999'
    }
};
