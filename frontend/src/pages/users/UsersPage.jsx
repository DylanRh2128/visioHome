import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";
import usuarioService from "../../services/usuarioService";
import "../../styles/theme.css";

export default function UsersPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [formData, setFormData] = useState({
    docUsuario: '',
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    password: '',
    idRol: 2,
    estado: 'Activo'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const data = await usuarioService.getAll();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedUsuario(null);
    setFormData({
      docUsuario: '',
      nombre: '',
      correo: '',
      telefono: '',
      direccion: '',
      password: '',
      idRol: 2,
      estado: 'Activo'
    });
    setErrors({});
    setShowForm(true);
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setFormData({
      docUsuario: usuario.docUsuario || '',
      nombre: usuario.nombre || '',
      correo: usuario.correo || '',
      telefono: usuario.telefono || '',
      direccion: usuario.direccion || '',
      password: '',
      idRol: usuario.idRol || 2,
      estado: usuario.estado || 'Activo'
    });
    setErrors({});
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.docUsuario) newErrors.docUsuario = 'Documento requerido';
    if (!formData.nombre) newErrors.nombre = 'Nombre requerido';
    if (!formData.correo) newErrors.correo = 'Correo requerido';
    if (!selectedUsuario && !formData.password) newErrors.password = 'Contraseña requerida';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const dataToSend = { ...formData };
      if (selectedUsuario && !formData.password) {
        delete dataToSend.password;
      }

      if (selectedUsuario) {
        await usuarioService.update(selectedUsuario.docUsuario, dataToSend);
      } else {
        await usuarioService.create(dataToSend);
      }

      setShowForm(false);
      loadUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert(error.message || "Error al guardar usuario");
    }
  };

  const handleDelete = async (usuario) => {
    if (!confirm(`¿Está seguro de eliminar al usuario ${usuario.nombre}?`)) {
      return;
    }

    try {
      await usuarioService.delete(usuario.docUsuario);
      loadUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario");
    }
  };

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.docUsuario?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleName = (idRol) => {
    const roles = { 1: "Admin", 2: "Cliente", 3: "Agente" };
    return roles[idRol] || "Usuario";
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Gestión de Usuarios</h2>
        <button className="premium-btn" onClick={handleCreate}>
          <Plus size={20} />
          Nuevo Usuario
        </button>
      </div>

      {showForm && (
        <div className="glass-card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>{selectedUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Documento *</label>
                <input
                  type="text"
                  name="docUsuario"
                  value={formData.docUsuario}
                  onChange={handleChange}
                  disabled={!!selectedUsuario}
                  className="premium-input"
                />
                {errors.docUsuario && <span className="error-text">{errors.docUsuario}</span>}
              </div>

              <div className="form-group">
                <label>Nombre Completo *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="premium-input"
                />
                {errors.nombre && <span className="error-text">{errors.nombre}</span>}
              </div>

              <div className="form-group">
                <label>Correo *</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="premium-input"
                />
                {errors.correo && <span className="error-text">{errors.correo}</span>}
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="premium-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="premium-input"
                />
              </div>

              <div className="form-group">
                <label>Contraseña {!selectedUsuario && '*'}</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={selectedUsuario ? 'Dejar vacío para no cambiar' : ''}
                  className="premium-input"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>Rol *</label>
                <select
                  name="idRol"
                  value={formData.idRol}
                  onChange={handleChange}
                  className="premium-input"
                >
                  <option value={1}>Admin</option>
                  <option value={2}>Cliente</option>
                  <option value={3}>Agente</option>
                </select>
              </div>

              <div className="form-group">
                <label>Estado *</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="premium-input"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)} className="premium-btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="premium-btn">
                {selectedUsuario ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

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
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            <p>Cargando usuarios...</p>
          </div>
        ) : (
          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.map((usuario) => (
                  <tr key={usuario.docUsuario}>
                    <td>{usuario.docUsuario}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.telefono || 'N/A'}</td>
                    <td>
                      <span className="badge">{getRoleName(usuario.idRol)}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${usuario.estado === 'Activo' ? 'active' : 'inactive'}`}>
                        {usuario.estado || 'Activo'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="action-btn edit" onClick={() => handleEdit(usuario)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(usuario)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
