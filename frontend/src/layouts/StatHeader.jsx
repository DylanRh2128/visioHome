import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * StatHeader - Componente para mostrar KPIs rápidos en la parte superior de los CRUDs
 */
export default function StatHeader({ stats, loading }) {
    return (
        <div style={styles.container}>
            {stats.map((stat, index) => (
                <div key={index} style={styles.statBox}>
                    <span style={styles.label}>{stat.label}</span>
                    <div style={styles.valueContainer}>
                        {loading ? (
                            <Loader2 className="animate-spin" size={16} color="#6b0000" />
                        ) : (
                            <span style={styles.value}>{stat.value}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap'
    },
    statBox: {
        padding: '20px 30px',
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: '16px',
        minWidth: '200px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    label: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    valueContainer: {
        height: '32px',
        display: 'flex',
        alignItems: 'center'
    },
    value: {
        fontSize: '24px',
        fontWeight: '800',
        color: '#333'
    }
};
