import { FileText, Download, Trash2, Calendar, CreditCard, User, Hash, DollarSign } from "lucide-react";
import "../../styles/theme.css";

export default function FacturasTable({ facturas, onDelete }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getEstadoStyle = (estado) => {
        const styles = {
            aprobado: { bg: "rgba(74, 222, 128, 0.1)", color: "#4ade80" },
            rechazado: { bg: "rgba(248, 113, 113, 0.1)", color: "#f87171" },
            pendiente: { bg: "rgba(251, 191, 36, 0.1)", color: "#fbbf24" },
        };
        return styles[estado] || { bg: "rgba(255,255,255,0.05)", color: "#fff" };
    };

    return (
        <table className="premium-table">
            <thead>
                <tr>
                    <th>Referencia</th>
                    <th>Cliente</th>
                    <th>Inmueble</th>
                    <th>Monto</th>
                    <th>Método / Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {facturas.map((f) => (
                    <tr key={f.idPago}>
                        <td>
                            <div className="d-flex align-items-center gap-3">
                                <div style={{
                                    padding: "0.5rem",
                                    background: "rgba(107, 0, 0, 0.1)",
                                    color: "var(--accent-red)",
                                    borderRadius: "10px"
                                }}>
                                    <FileText size={18} />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontWeight: "800", color: "#fff", letterSpacing: "0.5px" }}>
                                        {f.referencia || `#${f.idPago}`}
                                    </span>
                                    <span className="small text-muted" style={{ fontSize: "0.7rem" }}>ID Transacción: {f.idPago}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex align-items-center gap-2">
                                <div style={{
                                    width: "30px",
                                    height: "30px",
                                    background: "rgba(255,255,255,0.05)",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "0.75rem",
                                    fontWeight: "bold"
                                }}>
                                    <User size={14} />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>{f.cliente || "C. Final"}</span>
                                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{f.docUsuario}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="small" style={{ color: "var(--text-muted)" }}>
                                {f.propiedad ? (
                                    <div className="d-flex flex-column">
                                        <span style={{ color: "#fff" }}>{f.propiedad.titulo}</span>
                                        <span style={{ fontSize: "0.7rem" }}>ID: {f.idPropiedad}</span>
                                    </div>
                                ) : (
                                    <span>Inmueble #{f.idPropiedad}</span>
                                )}
                            </div>
                        </td>
                        <td>
                            <span style={{ fontWeight: "900", color: "#fff", fontSize: "0.95rem" }}>
                                {formatPrice(f.monto)}
                            </span>
                        </td>
                        <td>
                            <div className="d-flex flex-column gap-1">
                                <div className="d-flex align-items-center gap-2 small text-muted">
                                    <CreditCard size={12} /> {f.metodoPago}
                                </div>
                                <div className="d-flex align-items-center gap-2 small" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                                    <Calendar size={12} /> {formatDate(f.fecha)}
                                </div>
                            </div>
                        </td>
                        <td>
                            <span style={{
                                padding: "0.4rem 0.8rem",
                                borderRadius: "8px",
                                fontSize: "0.7rem",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                ...getEstadoStyle(f.estado)
                            }}>
                                {f.estado}
                            </span>
                        </td>
                        <td>
                            <div className="d-flex gap-2">
                                <button
                                    onClick={() => alert('Generando PDF de la factura...')}
                                    style={{ background: "none", border: "none", color: "#60a5fa", cursor: "pointer", padding: "0.4rem" }}
                                    title="Descargar PDF"
                                >
                                    <Download size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete(f.idPago)}
                                    style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", padding: "0.4rem" }}
                                    title="Eliminar"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
