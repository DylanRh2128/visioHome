import { useState, useEffect } from "react";
import { Plus, Search, Receipt } from "lucide-react";
import pagoService from "../../../services/pagoService";
import FacturasTable from "./FacturasTable";
import FacturasForm from "./FacturasForm";
import statsService from "../../../services/statsService";
import StatHeader from "../../../layouts/StatHeader";
import "../../../styles/theme.css";

export default function FacturasPage() {
    const [facturas, setFacturas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedFactura, setSelectedFactura] = useState(null);
    const [globalStats, setGlobalStats] = useState(null);

    useEffect(() => {
        loadFacturas();
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await statsService.getGlobalStats();
            setGlobalStats(data.pagos);
        } catch (error) {
            console.error("Error al cargar estadísticas:", error);
        }
    };

    const loadFacturas = async () => {
        try {
            setLoading(true);
            const data = await pagoService.getAll();
            setFacturas(data || []);
        } catch (error) {
            console.error("Error al cargar facturas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setShowForm(true);
    };

    const handleSubmit = async (formData) => {
        try {
            await pagoService.create(formData);
            setShowForm(false);
            loadFacturas();
        } catch (error) {
            alert(error.message || "Error al registrar pago");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Anular este registro de pago?")) return;
        try {
            await pagoService.delete(id);
            loadFacturas();
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    const filtered = facturas.filter(f =>
        String(f.docUsuario || "").includes(searchTerm) ||
        String(f.referencia || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(f.idPago || "").includes(searchTerm)
    );

    return (
        <div className="crud-container">
            <div className="crud-header">
                <div className="d-flex align-items-center gap-2">
                    <Receipt className="text-primary-red" size={28} />
                    <h2 className="m-0">Control de Facturación</h2>
                </div>
                {!showForm && (
                    <button className="premium-btn" onClick={handleCreate}>
                        <Plus size={20} />
                        Registrar Pago
                    </button>
                )}
            </div>

            <StatHeader
                loading={loading}
                stats={[
                    { label: 'Total Pagos', value: globalStats?.total ?? 0 },
                    { label: 'Aprobados', value: globalStats?.aprobados ?? 0 },
                    { label: 'Monto Aprobado', value: `$${(globalStats?.montoAprobado ?? 0).toLocaleString()}` },
                    { label: 'Monto Pendiente', value: `$${(globalStats?.montoPendiente ?? 0).toLocaleString()}` },
                ]}
            />

            {showForm ? (
                <div className="glass-card animate-fade-in mb-4">
                    <FacturasForm
                        onSubmit={handleSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            ) : (
                <div className="glass-card">
                    <div className="search-container" style={{ marginBottom: '20px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input
                            placeholder="Buscar por usuario, referencia o ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="premium-input search-input"
                        />
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary-red" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-2 text-muted">Cargando facturas...</p>
                        </div>
                    ) : (
                        <div className="premium-table-container">
                            <FacturasTable
                                facturas={filtered}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
