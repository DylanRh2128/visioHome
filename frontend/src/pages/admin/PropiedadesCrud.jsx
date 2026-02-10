import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, MapPin } from "lucide-react";
import propiedadService from "../../services/propiedadService";

export default function PropiedadesCrud() {
    const [propiedades, setPropiedades] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPropiedades();
    }, []);

    const loadPropiedades = async () => {
        try {
            setLoading(true);
            const data = await propiedadService.getAll(searchTerm);
            setPropiedades(data);
        } catch (error) {
            console.error("Error al cargar propiedades:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== undefined) {
                loadPropiedades();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleDelete = async (propiedad) => {
        if (!confirm(`¿Está seguro de eliminar la propiedad "${propiedad.titulo}"?`)) {
            return;
        }

        try {
            await propiedadService.delete(propiedad.idPropiedad);
            alert("Propiedad eliminada exitosamente");
            loadPropiedades();
        } catch (error) {
            console.error("Error al eliminar propiedad:", error);
            alert("Error al eliminar propiedad");
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const filteredPropiedades = propiedades.filter(
        (p) =>
            p.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Gestión de Propiedades</h2>
                <button style={styles.addButton} onClick={() => alert('Función de crear propiedad - Implementar modal')}>
                    <Plus size={20} />
                    Nueva Propiedad
                </button>
            </div>

            <div style={styles.searchBar}>
                <Search size={20} color="#999" />
                <input
                    type="text"
                    placeholder="Buscar por título o ubicación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {loading ? (
                <div style={styles.emptyState}>
                    <p>Cargando propiedades...</p>
                </div>
            ) : (
                <>
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeader}>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>Título</th>
                                    <th style={styles.th}>Ubicación</th>
                                    <th style={styles.th}>Precio</th>
                                    <th style={styles.th}>Tipo</th>
                                    <th style={styles.th}>Área (m²)</th>
                                    <th style={styles.th}>Estado</th>
                                    <th style={styles.th}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPropiedades.map((propiedad) => (
                                    <tr key={propiedad.idPropiedad} style={styles.tableRow}>
                                        <td style={styles.td}>{propiedad.idPropiedad}</td>
                                        <td style={styles.td}>
                                            <strong>{propiedad.titulo}</strong>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.locationInfo}>
                                                <MapPin size={14} color="#666" />
                                                <span>{propiedad.ubicacion}</span>
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <strong>{formatPrice(propiedad.precio)}</strong>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.typeBadge}>{propiedad.tipo}</span>
                                        </td>
                                        <td style={styles.td}>{propiedad.tamano_m2 || propiedad.area || 'N/A'}</td>
                                        <td style={styles.td}>
                                            <span
                                                style={{
                                                    ...styles.statusBadge,
                                                    background:
                                                        propiedad.estado === "disponible" ? "#d4edda" :
                                                            propiedad.estado === "vendida" ? "#f8d7da" :
                                                                propiedad.estado === "reservada" ? "#fff3cd" : "#e2e3e5",
                                                    color:
                                                        propiedad.estado === "disponible" ? "#155724" :
                                                            propiedad.estado === "vendida" ? "#721c24" :
                                                                propiedad.estado === "reservada" ? "#856404" : "#383d41",
                                                }}
                                            >
                                                {propiedad.estado}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.actions}>
                                                <button style={styles.editButton} onClick={() => alert('Función de editar - Implementar modal')}>
                                                    <Edit2 size={16} />
                                                </button>
                                                <button style={styles.deleteButton} onClick={() => handleDelete(propiedad)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredPropiedades.length === 0 && (
                        <div style={styles.emptyState}>
                            <p>No se encontraron propiedades</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

const styles = {
    container: {
        background: "#fff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#333",
        margin: 0,
    },
    addButton: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        background: "#6b0000",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
    },
    searchBar: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 15px",
        background: "#f8f9fa",
        borderRadius: "8px",
        marginBottom: "20px",
    },
    searchInput: {
        flex: 1,
        border: "none",
        background: "transparent",
        fontSize: "14px",
        outline: "none",
    },
    tableWrapper: {
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    tableHeader: {
        background: "#f8f9fa",
    },
    th: {
        padding: "12px 15px",
        textAlign: "left",
        fontSize: "13px",
        fontWeight: "600",
        color: "#666",
        borderBottom: "2px solid #dee2e6",
    },
    tableRow: {
        borderBottom: "1px solid #dee2e6",
    },
    td: {
        padding: "15px",
        fontSize: "14px",
        color: "#333",
    },
    locationInfo: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
    },
    typeBadge: {
        padding: "4px 12px",
        background: "#e7f3ff",
        color: "#0066cc",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        textTransform: "capitalize",
    },
    statusBadge: {
        padding: "4px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        textTransform: "capitalize",
    },
    actions: {
        display: "flex",
        gap: "8px",
    },
    editButton: {
        padding: "6px",
        background: "#fff3cd",
        color: "#856404",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    deleteButton: {
        padding: "6px",
        background: "#f8d7da",
        color: "#721c24",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    emptyState: {
        textAlign: "center",
        padding: "40px",
        color: "#999",
    },
};
