import { Edit2, Trash2, MapPin, Home, Building, Layout, Square, Ruler } from "lucide-react";
import "../../../styles/theme.css";

export default function PropiedadTable({ propiedades, onEdit, onDelete }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getTipoIcon = (tipo) => {
        switch (tipo?.toLowerCase()) {
            case 'casa': return <Home size={16} />;
            case 'apartamento': return <Building size={16} />;
            case 'local': return <Layout size={16} />;
            default: return <Square size={16} />;
        }
    };

    const getEstadoStyle = (estado) => {
        const styles = {
            disponible: { bg: "rgba(74, 222, 128, 0.1)", color: "#4ade80" },
            vendida: { bg: "rgba(248, 113, 113, 0.1)", color: "#f87171" },
            reservada: { bg: "rgba(251, 191, 36, 0.1)", color: "#fbbf24" },
            arrendada: { bg: "rgba(96, 165, 250, 0.1)", color: "#60a5fa" },
        };
        return styles[estado] || { bg: "rgba(255,255,255,0.05)", color: "#fff" };
    };

    return (
        <table className="premium-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Propiedad</th>
                    <th>Tipo / Área</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {propiedades.map((p) => (
                    <tr key={p.idPropiedad}>
                        <td><span style={{ color: "var(--text-muted)", fontWeight: "bold" }}>#{p.idPropiedad}</span></td>
                        <td>
                            <div className="d-flex flex-column">
                                <span style={{ fontWeight: "700", color: "#fff" }}>{p.titulo}</span>
                                <div className="d-flex align-items-center gap-1 small text-muted">
                                    <MapPin size={12} />
                                    {p.ubicacion}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex align-items-center gap-3">
                                <span style={{
                                    padding: "0.2rem 0.6rem",
                                    background: "rgba(255,255,255,0.05)",
                                    borderRadius: "8px",
                                    fontSize: "0.7rem",
                                    fontWeight: "bold",
                                    color: "#ff4d4d",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    textTransform: "uppercase"
                                }}>
                                    {getTipoIcon(p.tipo)}
                                    {p.tipo}
                                </span>
                                <span className="small text-muted d-flex align-items-center gap-1">
                                    <Ruler size={14} /> {p.tamano_m2} m²
                                </span>
                            </div>
                        </td>
                        <td>
                            <span style={{ fontWeight: "800", color: "#fff" }}>
                                {formatPrice(p.precio)}
                            </span>
                        </td>
                        <td>
                            <span style={{
                                padding: "0.4rem 0.8rem",
                                borderRadius: "8px",
                                fontSize: "0.7rem",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                ...getEstadoStyle(p.estado)
                            }}>
                                {p.estado}
                            </span>
                        </td>
                        <td>
                            <div className="d-flex gap-2">
                                <button
                                    onClick={() => onEdit(p)}
                                    style={{ background: "none", border: "none", color: "#ffb86c", cursor: "pointer", padding: "0.4rem" }}
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete(p.idPropiedad)}
                                    style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", padding: "0.4rem" }}
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
