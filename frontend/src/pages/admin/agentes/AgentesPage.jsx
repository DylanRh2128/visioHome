import { useState, useEffect } from "react";
import { Plus, Search, ShieldCheck } from "lucide-react";
import agenteService from "../../../services/agenteService";
import AgentesTable from "./AgentesTable";
import AgenteForm from "./AgentesForm";
import statsService from "../../../services/statsService";
import StatHeader from "../../../layouts/StatHeader";
import "../../../styles/theme.css";

export default function AgentesPage() {
  const [agentes, setAgentes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedAgente, setSelectedAgente] = useState(null);
  const [globalStats, setGlobalStats] = useState(null);

  useEffect(() => {
    loadAgentes();
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await statsService.getGlobalStats();
      setGlobalStats(data.agentes);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  const loadAgentes = async () => {
    try {
      setLoading(true);
      const data = await agenteService.getAll();
      console.log("Respuesta agentes:", data);
      setAgentes(data);
    } catch (error) {
      console.error("Error al cargar agentes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedAgente(null);
    setShowForm(true);
  };

  const handleEdit = (agente) => {
    setSelectedAgente(agente);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      if (selectedAgente) {
        await agenteService.update(selectedAgente.docUsuario, formData);
      } else {
        await agenteService.create(formData);
      }
      setShowForm(false);
      loadAgentes();
    } catch (error) {
      console.error("Error al guardar agente:", error);
      const msg = error?.errors
        ? Object.values(error.errors).flat().join(" | ")
        : error?.message || "Error al guardar agente";
      alert(msg);
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
    String(a.nombre || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(a.correo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(a.docUsuario || "").includes(searchTerm)
  );
  console.log("AgentesPage renderizando");

  return (
    <div className="crud-container">
      <div className="crud-header">
        <div className="d-flex align-items-center gap-2">
          <ShieldCheck className="text-primary-red" size={28} />
          <h2 className="m-0">Directorio de Agentes</h2>
        </div>
        {!showForm && (
          <button className="premium-btn" onClick={handleCreate}>
            <Plus size={20} />
            Vincular Agente
          </button>
        )}
      </div>

      <StatHeader
        loading={loading}
        stats={[
          { label: 'Total Agentes', value: globalStats?.total ?? 0 },
          { label: 'Activos', value: globalStats?.activos ?? 0 },
          { label: 'Inactivos', value: globalStats?.inactivos ?? 0 },
        ]}
      />

      {showForm ? (
        <div className="glass-card animate-fade-in mb-4">
          <AgenteForm
            agente={selectedAgente}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <div className="glass-card">
          <div className="search-container" style={{ marginBottom: '20px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
              placeholder="Buscar por nombre, correo o documento..."
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
              <p className="mt-2 text-muted">Cargando agentes...</p>
            </div>
          ) : (
            <div className="premium-table-container">
              <AgentesTable
                agentes={filtered}
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
