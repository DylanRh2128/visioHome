import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Download } from "lucide-react";
import pagoService from "../../services/pagoService";

export default function FacturasCrud() {
    const [facturas, setFacturas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFacturas();
    }, []);

    const loadFacturas = async () => {
        try {
            setLoading(true);
            const data = await pagoService.getAll(searchTerm);
            setFacturas(data);
        } catch (error) {
            console.error("Error al cargar facturas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== undefined) {
                loadFacturas();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleDelete = async (factura) => {
        if (!confirm(`¿Está seguro de eliminar la factura ${factura.referencia || factura.numero}?`)) {
            return;
        }

        try {
            await pagoService.delete(factura.idPago);
            alert("Factura eliminada exitosamente");
            loadFacturas();
        } catch (error) {
            console.error("Error al eliminar factura:", error);
            alert("Error al eliminar factura");
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('es-CO');
    };

    const filteredFacturas = facturas.filter(
        (f) =>
            f.referencia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.numero?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.docUsuario?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Gestión de Facturas</h2>
                <button style={styles.addButton} onClick={() => alert('Función de crear factura - Implementar modal')}>
                    <Plus size={20} />
                    Nueva Factura
                </button>
            </div>

            <div style={styles.searchBar}>
                <Search size={20} color="#999" />
                <input
                    type="text"
                    placeholder="Buscar por número de factura o cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {loading ? (
                <div style={styles.emptyState}>
                    <p>Cargando facturas...</p>
                </div>
            ) : (
                <>
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeader}>
                                    <th style={styles.th}>Número</th>
                                    <th style={styles.th}>Cliente</th>
                                    <th style={styles.th}>Monto</th>
                                    <th style={styles.th}>Método</th>
                                    <th style={styles.th}>Fecha</th>
                                    <th style={styles.th}>Estado</th>
                                    <th style={styles.th}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFacturas.map((factura) => (
                                    <tr key={factura.idPago} style={styles.tableRow}>
                                        <td style={styles.td}>
                                            <strong>{factura.referencia || factura.numero || `#${factura.idPago}`}</strong>
                                        </td>
                                        <td style={styles.td}>{factura.cliente || factura.docUsuario}</td>
                                        <td style={styles.td}>
                                            <strong>{formatPrice(factura.monto)}</strong>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.methodBadge}>{factura.metodoPago}</span>
                                        </td>
                                        <td style={styles.td}>{formatDate(factura.fecha)}</td>
                                        <td style={styles.td}>
                                            <span
                                                style={{
                                                    ...styles.statusBadge,
                                                    background:
                                                        factura.estado === "aprobado" ? "#d4edda" :
                                                            factura.estado === "pendiente" ? "#fff3cd" :
                                                                factura.estado === "rechazado" ? "#f8d7da" : "#e2e3e5",
                                                    color:
                                                        factura.estado === "aprobado" ? "#155724" :
                                                            factura.estado === "pendiente" ? "#856404" :
                                                                factura.estado === "rechazado" ? "#721c24" : "#383d41",
                                                }}
                                            >
                                                {factura.estado}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.actions}>
                                                <button style={styles.downloadButton} onClick={() => alert('Descargar PDF - Implementar')}>
                                                    <Download size={16} />
                                                </button>
                                                <button style={styles.editButton} onClick={() => alert('Función de editar - Implementar modal')}>
                                                    <Edit2 size={16} />
                                                </button>
                                                <button style={styles.deleteButton} onClick={() => handleDelete(factura)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredFacturas.length === 0 && (
                        <div style={styles.emptyState}>
                            <p>No se encontraron facturas</p>
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
    methodBadge: {
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
    downloadButton: {
        padding: "6px",
        background: "#d1ecf1",
        color: "#0c5460",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
