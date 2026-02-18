import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#ff4d4d', '#60a5fa', '#4ade80', '#fbbf24', '#c084fc', '#2dd4bf'];

export const PaymentMethodChart = ({ data }) => {
    return (
        <div className="glass-card p-4 h-100">
            <h6 className="text-white font-weight-bold mb-4">Distribución por Método de Pago</h6>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="label"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ background: '#1a1a1a', border: 'none', borderRadius: '10px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export const PropertyTypeChart = ({ data }) => {
    return (
        <div className="glass-card p-4 h-100">
            <h6 className="text-white font-weight-bold mb-4">Ventas por Tipo de Propiedad</h6>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="label"
                        type="category"
                        stroke="#999"
                        fontSize={12}
                        width={80}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                        contentStyle={{ background: '#1a1a1a', border: 'none', borderRadius: '10px' }}
                    />
                    <Bar dataKey="value" fill="#ff4d4d" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const AgentPerformanceChart = ({ data }) => {
    return (
        <div className="glass-card p-4 h-100">
            <h6 className="text-white font-weight-bold mb-4">Ventas por Agente</h6>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="label" stroke="#999" fontSize={11} />
                    <YAxis stroke="#999" fontSize={11} tickFormatter={(value) => `$${value / 1000000}M`} />
                    <Tooltip
                        contentStyle={{ background: '#1a1a1a', border: 'none', borderRadius: '10px' }}
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Total Vendido']}
                    />
                    <Bar dataKey="value" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};