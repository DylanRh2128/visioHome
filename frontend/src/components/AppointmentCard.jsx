import React from 'react';
import {
    Clock,
    MapPin,
    Calendar,
    CreditCard,
    XCircle,
    DollarSign
} from 'lucide-react';

const StatusBadge = ({ status }) => {
    const statusMap = {
        pendiente: 'Pendiente',
        confirmada: 'Confirmada',
        cancelada: 'Cancelada',
        realizada: 'Realizada',
        pagada: 'Pagada'
    };

    return (
        <span className={`status-badge status-${status}`}>
            {statusMap[status] || status}
        </span>
    );
};

export default function AppointmentCard({ apt, onCancel, onPay }) {
    const property = apt.propiedad || {};
    const propertyImage = property.imagen || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800';

    const formattedDate = new Date(apt.fecha).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formattedTime = new Date(apt.fecha).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="appointment-card">
            <div className="appointment-image-wrapper">
                <img
                    src={propertyImage}
                    alt={property.titulo}
                    className="appointment-image"
                />
                <div className="appointment-status-overlay">
                    <StatusBadge status={apt.estado} />
                </div>
            </div>

            <div className="appointment-content">
                <h3 className="appointment-title truncate">{property.titulo || 'Propiedad sin título'}</h3>

                <div className="appointment-info-row">
                    <MapPin size={16} className="appointment-info-icon" />
                    <span className="truncate">{property.ubicacion || 'Ubicación no disponible'}</span>
                </div>

                <div className="appointment-info-row">
                    <Calendar size={16} className="appointment-info-icon" />
                    <span>{formattedDate}</span>
                </div>

                <div className="appointment-info-row">
                    <Clock size={16} className="appointment-info-icon" />
                    <span>{formattedTime}</span>
                </div>

                {apt.precio && (
                    <div className="appointment-price">
                        ${Number(apt.precio).toLocaleString()}
                    </div>
                )}

                <div className="appointment-footer">
                    {apt.estado === 'pendiente' && (
                        <button
                            onClick={() => onPay(apt.idCita)}
                            className="btn-premium btn-pay shadow-lg"
                        >
                            <CreditCard size={16} /> Pagar Reservación
                        </button>
                    )}

                    {apt.estado !== 'cancelada' && apt.estado !== 'realizada' && (
                        <button
                            onClick={() => onCancel(apt.idCita)}
                            className="btn-premium btn-cancel"
                        >
                            <XCircle size={16} /> Cancelar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
