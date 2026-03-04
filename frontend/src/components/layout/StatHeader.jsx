import React from 'react';
import "../../styles/theme.css";

export default function StatHeader({ stats, loading }) {
    if (loading || !stats) return null;

    return (
        <div style={styles.container}>
            {stats.map((stat, index) => (
                <div key={index} className="glass-card" style={styles.card}>
                    <div style={styles.value}>{stat.value.toLocaleString() || 0}</div>
                    <div style={styles.label}>{stat.label}</div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
    },
    card: {
        padding: '20px',
        textAlign: 'center',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    value: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#6b0000',
    },
    label: {
        fontSize: '13px',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontWeight: '600',
    }
};
