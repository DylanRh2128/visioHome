import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Receipt } from "lucide-react";
import pagoService from "../../services/pagoService";
import "../../styles/theme.css";

export default function FacturasPage() {
    const [facturas, setFacturas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        docUsuario: "",
        idPropiedad: "",
        monto: "",
        metodoPago: "Efectivo",
        estado: "Pendiente",
        referencia: ""
    });

    useEffect(() => {
        loadFacturas();
    }, []);

    const loadFacturas = async () => {
        try {
            setLoading(true);
            const data = await pagoService.getAll();
            setFacturas(data);
        } catch (error) {
            console.error("Error al cargar facturas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setFormData({
            docUsuario: "",
            idPropiedad: "",
            monto: "",
            metodoPago: "Efectivo",
            estado: "Pendiente",
            referencia: ""
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
            await pagoService.create(formData);
            setShowForm(false);
            loadFacturas();
        } catch (error) {
            alert("Error al registrar pago");
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
        String(f.docUsuario).includes(searchTerm) ||
        String(f.referencia).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="crud-container">
            <div className="crud-header">
                <h2>Control de Facturación</h2>
                <button className="premium-btn" onClick={handleCreate}>
                    <Plus size={20} />
                    Registrar Pago
                </button>
            </div>

            {showForm && (
                <div className="glass-card animate-fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3>Nuevo Registro de Factura</h3>
                        <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Documento Usuario</label>
                                <input name="docUsuario" value={formData.docUsuario} onChange={handleChange} className="premium-input" required />
                            </div>
                            <div className="form-group">
                                <label>ID Propiedad</label>
                                <input name="idPropiedad" value={formData.idPropiedad} onChange={handleChange} className="premium-input" required />
                            </div>
                            <div className="form-group">
                                <label>Monto</label>
                                <input name="monto" type="number" value={formData.monto} onChange={handleChange} className="premium-input" required />
                            </div>
                            <div className="form-group">
                                <label>Método de Pago</label>
                                <select name="metodoPago" value={formData.metodoPago} onChange={handleChange} className="premium-input">
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                    <option value="Tarjeta">Tarjeta de Crédito</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Referencia</label>
                                <input name="referencia" value={formData.referencia} onChange={handleChange} className="premium-input" />
                            </div>
                            <div className="form-group">
                                <label>Estado</label>
                                <select name="estado" value={formData.estado} onChange={handleChange} className="premium-input">
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Pagado">Pagado</option>
                                    <option value="Anulado">Anulado</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setShowForm(false)} className="premium-btn-secondary">Cancelar</button>
                            <button type="submit" className="premium-btn">Proceder al Registro</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass-card">
                <div className="search-container" style={{ marginBottom: '20px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                        placeholder="Buscar por documento o referencia..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="premium-input search-input"
                    />
                </div>

                <div className="premium-table-container">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th># ID</th>
                                <th>Fecha</th>
                                <th>Usuario</th>
                                <th>Propiedad</th>
                                <th>Monto</th>
                                <th>Método</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(f => (
                                <tr key={f.idPago}>
                                    <td>{f.idPago}</td>
                                    <td>{new Date(f.fecha).toLocaleDateString()}</td>
                                    <td style={{ fontSize: '12px', opacity: 0.8 }}>{f.docUsuario}</td>
                                    <td>Prop ID: {f.idPropiedad}</td>
                                    <td style={{ fontWeight: '700', color: 'var(--primary-red)' }}>${Number(f.monto).toLocaleString()}</td>
                                    <td>{f.metodoPago}</td>
                                    <td>
                                        <span className={`status-badge ${f.estado === 'Pagado' ? 'active' : 'inactive'}`}>
                                            {f.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn delete" onClick={() => handleDelete(f.idPago)} title="Anular">
                                            <Trash2 size={16} />
                                        </button>
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
