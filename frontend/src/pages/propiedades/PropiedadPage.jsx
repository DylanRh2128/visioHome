import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";
import propiedadService from "../../services/propiedadService";
import "../../styles/theme.css";

export default function PropiedadPage() {
    const [propiedades, setPropiedades] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedPropiedad, setSelectedPropiedad] = useState(null);
    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        ubicacion: "",
        tamano_m2: "",
        precio: "",
        estado: "Disponible",
        tipo: "Venta",
        nitInmobiliaria: "VISIO-001"
    });

    useEffect(() => {
        loadPropiedades();
    }, []);

    const loadPropiedades = async () => {
        try {
            setLoading(true);
            const data = await propiedadService.getAll();
            setPropiedades(data);
        } catch (error) {
            console.error("Error al cargar propiedades:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedPropiedad(null);
        setFormData({
            titulo: "",
            descripcion: "",
            ubicacion: "",
            tamano_m2: "",
            precio: "",
            estado: "Disponible",
            tipo: "Venta",
            nitInmobiliaria: "VISIO-001"
        });
        setShowForm(true);
    };

    const handleEdit = (prop) => {
        setSelectedPropiedad(prop);
        setFormData({
            titulo: prop.titulo || "",
            descripcion: prop.descripcion || "",
            ubicacion: prop.ubicacion || "",
            tamano_m2: prop.tamano_m2 || "",
            precio: prop.precio || "",
            estado: prop.estado || "Disponible",
            tipo: prop.tipo || "Venta",
            nitInmobiliaria: prop.nitInmobiliaria || "VISIO-001"
        });
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedPropiedad) {
                await propiedadService.update(selectedPropiedad.idPropiedad, formData);
            } else {
                await propiedadService.create(formData);
            }
            setShowForm(false);
            loadPropiedades();
        } catch (error) {
            alert("Error al guardar propiedad");
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
        p.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="crud-container">
            <div className="crud-header">
                <h2>Gestión de Propiedades</h2>
                <button className="premium-btn" onClick={handleCreate}>
                    <Plus size={20} />
                    Añadir Propiedad
                </button>
            </div>

            {showForm && (
                <div className="glass-card animate-fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3>{selectedPropiedad ? 'Editar Propiedad' : 'Nueva Propiedad'}</h3>
                        <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Título</label>
                                <input name="titulo" value={formData.titulo} onChange={handleChange} className="premium-input" required />
                            </div>
                            <div className="form-group">
                                <label>Precio</label>
                                <input name="precio" type="number" value={formData.precio} onChange={handleChange} className="premium-input" required />
                            </div>
                            <div className="form-group">
                                <label>Ubicación</label>
                                <input name="ubicacion" value={formData.ubicacion} onChange={handleChange} className="premium-input" required />
                            </div>
                            <div className="form-group">
                                <label>Tamaño (m2)</label>
                                <input name="tamano_m2" type="number" value={formData.tamano_m2} onChange={handleChange} className="premium-input" required />
                            </div>
                            <div className="form-group">
                                <label>Tipo</label>
                                <select name="tipo" value={formData.tipo} onChange={handleChange} className="premium-input">
                                    <option value="Venta">Venta</option>
                                    <option value="Arriendo">Arriendo</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Estado</label>
                                <select name="estado" value={formData.estado} onChange={handleChange} className="premium-input">
                                    <option value="Disponible">Disponible</option>
                                    <option value="Vendido">Vendido</option>
                                    <option value="Alquilado">Alquilado</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Descripción</label>
                                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className="premium-input" rows="3" />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setShowForm(false)} className="premium-btn-secondary">Cancelar</button>
                            <button type="submit" className="premium-btn">Guardar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass-card">
                <div className="search-container" style={{ marginBottom: '20px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                        placeholder="Buscar por título o ubicación..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="premium-input search-input"
                    />
                </div>

                <div className="premium-table-container">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Propiedad</th>
                                <th>Ubicación</th>
                                <th>Precio</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.idPropiedad}>
                                    <td>{p.idPropiedad}</td>
                                    <td style={{ fontWeight: '600' }}>{p.titulo}</td>
                                    <td>{p.ubicacion}</td>
                                    <td style={{ fontWeight: '700', color: 'var(--primary-red)' }}>${Number(p.precio).toLocaleString()}</td>
                                    <td>
                                        <span className="badge" style={{ background: p.tipo === 'Venta' ? '#fff3e0' : '#e3f2fd', color: p.tipo === 'Venta' ? '#e65100' : '#1565c0' }}>
                                            {p.tipo}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${p.estado === 'Disponible' ? 'active' : 'inactive'}`}>
                                            {p.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="action-btn edit" onClick={() => handleEdit(p)}><Edit2 size={16} /></button>
                                            <button className="action-btn delete" onClick={() => handleDelete(p.idPropiedad)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
