import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, ShieldCheck } from "lucide-react";
import agenteService from "../../services/agenteService";
import "../../styles/theme.css";

export default function AgentesPage() {
  const [agentes, setAgentes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedAgente, setSelectedAgente] = useState(null);
  const [formData, setFormData] = useState({
    docUsuario: "",
    nitInmobiliaria: "VISIO-001",
    especialidad: "",
    experiencia_anos: "0"
  });

  useEffect(() => {
    loadAgentes();
  }, []);

  const loadAgentes = async () => {
    try {
      setLoading(true);
      const data = await agenteService.getAll();
      setAgentes(data);
    } catch (error) {
      console.error("Error al cargar agentes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedAgente(null);
    setFormData({
      docUsuario: "",
      nitInmobiliaria: "VISIO-001",
      especialidad: "",
      experiencia_anos: "0"
    });
    setShowForm(true);
  };

  const handleEdit = (agente) => {
    setSelectedAgente(agente);
    setFormData({
      docUsuario: agente.docUsuario || "",
      nitInmobiliaria: agente.nitInmobiliaria || "VISIO-001",
      especialidad: agente.especialidad || "",
      experiencia_anos: agente.experiencia_anos || "0"
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
      if (selectedAgente) {
        await agenteService.update(selectedAgente.idAgente, formData);
      } else {
        await agenteService.create(formData);
      }
      setShowForm(false);
      loadAgentes();
    } catch (error) {
      alert("Error al guardar agente");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este agente?")) return;
    try {
      await agenteService.delete(id);
      loadAgentes();
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  const filtered = agentes.filter(a =>
    String(a.docUsuario).includes(searchTerm) ||
    String(a.especialidad).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Directorio de Agentes</h2>
        <button className="premium-btn" onClick={handleCreate}>
          <Plus size={20} />
          Vincular Agente
        </button>
      </div>

      {showForm && (
        <div className="glass-card animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>{selectedAgente ? 'Editar Perfil Agente' : 'Nuevo Agente'}</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Documento Usuario</label>
                <input name="docUsuario" value={formData.docUsuario} onChange={handleChange} className="premium-input" disabled={!!selectedAgente} required />
              </div>
              <div className="form-group">
                <label>Especialidad</label>
                <input name="especialidad" value={formData.especialidad} onChange={handleChange} className="premium-input" placeholder="Ej. Residencial, Comercial" required />
              </div>
              <div className="form-group">
                <label>Años de Experiencia</label>
                <input name="experiencia_anos" type="number" value={formData.experiencia_anos} onChange={handleChange} className="premium-input" required />
              </div>
              <div className="form-group">
                <label>NIT Inmobiliaria</label>
                <input name="nitInmobiliaria" value={formData.nitInmobiliaria} onChange={handleChange} className="premium-input" readOnly />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)} className="premium-btn-secondary">Cancelar</button>
              <button type="submit" className="premium-btn">Guardar Información</button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card">
        <div className="search-container" style={{ marginBottom: '20px' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            placeholder="Buscar por documento o especialidad..."
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
                <th>Documento</th>
                <th>Especialidad</th>
                <th>Experiencia</th>
                <th>Inmobiliaria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.idAgente}>
                  <td>{a.idAgente}</td>
                  <td>{a.docUsuario}</td>
                  <td style={{ fontWeight: '600' }}>{a.especialidad}</td>
                  <td>{a.experiencia_anos} Años</td>
                  <td>{a.nitInmobiliaria}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="action-btn edit" onClick={() => handleEdit(a)}><Edit2 size={16} /></button>
                      <button className="action-btn delete" onClick={() => handleDelete(a.idAgente)}><Trash2 size={16} /></button>
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
