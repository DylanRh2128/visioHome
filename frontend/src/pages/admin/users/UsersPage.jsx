import { useState, useEffect } from "react";
import { Plus, Search, Users } from "lucide-react";
import usuarioService from "../../../services/usuarioService";
import statsService from "../../../services/statsService";
import UsersTable from "./UsersTable";
import UserForm from "./UserForm";
import StatHeader from "../../../layouts/StatHeader";
import "../../../styles/theme.css";

export default function UsersPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [globalStats, setGlobalStats] = useState(null);

  useEffect(() => {
    loadUsuarios();
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await usuarioService.getStats();
      setGlobalStats(data);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const data = await usuarioService.getAll();
      setUsuarios(data || []);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleCreate = () => {
    setSelectedUsuario(null);
    setShowForm(true);
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedUsuario) {
        await usuarioService.update(selectedUsuario.docUsuario, formData);
      } else {
        await usuarioService.create(formData);
      }
      setShowForm(false);
      setSelectedUsuario(null);
      loadUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert(error?.errors ? Object.values(error.errors).flat().join('\n') : (error.message || "Error al guardar usuario"));
    }
  };

  const handleDelete = async (docUsuario) => {
    if (!confirm(`¿Está seguro de eliminar este usuario?`)) {
      return;
    }

    try {
      await usuarioService.delete(docUsuario);
      loadUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario");
    }
  };

  const filteredUsuarios = usuarios.filter(
    (u) =>
      String(u.nombre || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(u.correo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(u.docUsuario || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="crud-container">
      <div className="crud-header">
        <div className="d-flex align-items-center gap-2">
          <Users className="text-primary-red" size={28} />
          <h2 className="m-0">Gestión de Usuarios</h2>
        </div>
        <button onClick={handleCreate} className="premium-btn">
          <Plus size={18} />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      <StatHeader
        loading={loading}
        stats={[
          { label: 'Total Usuarios', value: globalStats?.total_usuarios ?? 0 },
          { label: 'Clientes', value: globalStats?.total_clientes ?? 0 },
          { label: 'Agentes', value: globalStats?.total_agentes ?? 0 },
          { label: 'Admins', value: globalStats?.total_admins ?? 0 },
          { label: 'Activos', value: globalStats?.total_activos ?? 0 },
          { label: 'Bloqueados', value: globalStats?.total_bloqueados ?? 0 },
        ]}
      />

      {showForm ? (
        <div className="glass-card animate-fade-in mb-4">
          <UserForm
            user={selectedUsuario}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <div className="glass-card">
          <div className="search-container" style={{ marginBottom: '20px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
              type="text"
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
              <p className="mt-2 text-muted">Cargando usuarios...</p>
            </div>
          ) : (
            <div className="premium-table-container">
              <UsersTable
                usuarios={filteredUsuarios}
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
