import React from 'react';
import '../../../styles/theme.css';

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => {
    return (
        <div className="glass-card stat-card-hover" style={{
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: `4px solid ${color}`
        }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small uppercase font-weight-bold">{title}</span>
                <div style={{
                    padding: '0.5rem',
                    borderRadius: '10px',
                    background: `${color}15`,
                    color: color
                }}>
                    <Icon size={20} />
                </div>
            </div>
            <div className="mt-auto">
                <h2 className="m-0 font-weight-900" style={{ color: '#fff' }}>{value}</h2>
                {subtitle && <p className="text-muted small m-0 mt-1">{subtitle}</p>}
            </div>
        </div>
    );
};

export default StatCard;
