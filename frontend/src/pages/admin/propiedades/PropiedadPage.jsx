import { useState, useEffect } from "react";
import { Plus, Search, Home } from "lucide-react";
import propiedadService from "../../../services/propiedadService";
import statsService from "../../../services/statsService";
import PropiedadTable from "./PropiedadTable";
import PropiedadForm from "./PropiedadForm";
import StatHeader from "../../../layouts/StatHeader";
import "../../../styles/theme.css";

export default function PropiedadPage() {
    const [propiedades, setPropiedades] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedPropiedad, setSelectedPropiedad] = useState(null);
    const [globalStats, setGlobalStats] = useState(null);

    useEffect(() => {
        loadPropiedades();
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await statsService.getGlobalStats();
            setGlobalStats(data.propiedades);
        } catch (error) {
            console.error("Error al cargar estadísticas:", error);
        }
    };

    const loadPropiedades = async () => {
        try {
            setLoading(true);
            const data = await propiedadService.getAll();
            setPropiedades(data || []);
        } catch (error) {
            console.error("Error al cargar propiedades:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedPropiedad(null);
        setShowForm(true);
    };

    const handleEdit = (prop) => {
        setSelectedPropiedad(prop);
        setShowForm(true);
    };

    const handleSubmit = async (formData) => {
        try {
            if (selectedPropiedad) {
                await propiedadService.update(selectedPropiedad.idPropiedad, formData);
            } else {
                await propiedadService.create(formData);
            }
            setShowForm(false);
            loadPropiedades();
        } catch (error) {
            alert(error.message || "Error al guardar propiedad");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Eliminar esta propiedad?")) return;
        try {
            await propiedadService.delete(id);
            loadPropiedades();
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    const filtered = propiedades.filter(p =>
        String(p.titulo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(p.ubicacion || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(p.idPropiedad || "").includes(searchTerm)
    );

    return (
        <div className="crud-container">
            <div className="crud-header">
                <div className="d-flex align-items-center gap-2">
                    <Home className="text-primary-red" size={28} />
                    <h2 className="m-0">Gestión de Propiedades</h2>
                </div>
                {!showForm && (
                    <button className="premium-btn" onClick={handleCreate}>
                        <Plus size={20} />
                        Añadir Propiedad
                    </button>
                )}
            </div>

            <StatHeader
                loading={loading}
                stats={[
                    { label: 'Total Propiedades', value: globalStats?.total ?? 0 },
                    { label: 'Disponibles', value: globalStats?.disponibles ?? 0 },
                    { label: 'Vendidas', value: globalStats?.vendidas ?? 0 },
                    { label: 'Valor Inventario', value: `$${globalStats?.valorInventario?.toLocaleString() ?? 0}` },
                ]}
            />

            {showForm ? (
                <div className="glass-card animate-fade-in mb-4">
                    <PropiedadForm
                        propiedad={selectedPropiedad}
                        onSubmit={handleSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            ) : (
                <div className="glass-card">
                    <div className="search-container" style={{ marginBottom: '20px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input
                            placeholder="Buscar por título, ubicación o ID..."
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
                            <p className="mt-2 text-muted">Cargando propiedades...</p>
                        </div>
                    ) : (
                        <div className="premium-table-container">
                            <PropiedadTable
                                propiedades={filtered}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
