import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import usuarioService from "../../services/usuarioService";
import { Save, User, Mail, Phone, MapPin, Shield, Camera } from "lucide-react";
import "../../styles/theme.css";

export default function Profile() {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    password: ""
  });

  useEffect(() => {
    if (authUser) {
      loadUserProfile();
    }
  }, [authUser]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const data = await usuarioService.show(authUser.docUsuario);
      setUser(data);
      setFormData({
        nombre: data.nombre || "",
        correo: data.correo || "",
        telefono: data.telefono || "",
        direccion: data.direccion || "",
        password: ""
      });
    } catch (error) {
      console.error("Error al cargar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const dataToSend = { ...formData };
      if (!dataToSend.password) delete dataToSend.password;

      await usuarioService.update(authUser.docUsuario, dataToSend);
      alert("Perfil actualizado correctamente");
      loadUserProfile();
    } catch (error) {
      alert("Error al actualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="crud-container"><p>Cargando perfil...</p></div>;

  return (
    <div className="crud-container" style={{ maxWidth: '900px' }}>
      <div className="crud-header">
        <h2>Mi Perfil Profesional</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px', alignItems: 'start' }}>
        {/* Lateral: Avatar y Resumen */}
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 24px' }}>
            <img
              src={authUser?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Juanita"}
              alt="Profile"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--bg-content)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />
            <button style={{ position: 'absolute', bottom: '5px', right: '5px', background: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={18} />
            </button>
          </div>
          <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '700' }}>{user?.nombre}</h3>
          <div className="badge" style={{ background: '#e7f3ff', color: '#0066cc', marginBottom: '16px' }}>
            {user?.nombreRol || 'Administrador'}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
            ID: {user?.docUsuario}
          </p>
        </div>

        {/* Principal: Formulario de edición */}
        <div className="glass-card">
          <h4 style={{ marginBottom: '24px', fontWeight: '600' }}>Información de Cuenta</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label><User size={14} style={{ marginRight: '6px' }} /> Nombre Completo</label>
                <input name="nombre" value={formData.nombre} onChange={handleChange} className="premium-input" required />
              </div>
              <div className="form-group">
                <label><Mail size={14} style={{ marginRight: '6px' }} /> Correo Electrónico</label>
                <input name="correo" type="email" value={formData.correo} onChange={handleChange} className="premium-input" required />
              </div>
              <div className="form-group">
                <label><Phone size={14} style={{ marginRight: '6px' }} /> Teléfono de Contacto</label>
                <input name="telefono" value={formData.telefono} onChange={handleChange} className="premium-input" />
              </div>
              <div className="form-group">
                <label><Shield size={14} style={{ marginRight: '6px' }} /> Nueva Contraseña</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} className="premium-input" placeholder="Min. 6 caracteres" />
                <small style={{ color: '#999', fontSize: '11px' }}>Dejar en blanco para conservar actual</small>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label><MapPin size={14} style={{ marginRight: '6px' }} /> Dirección Residencial / Oficina</label>
                <input name="direccion" value={formData.direccion} onChange={handleChange} className="premium-input" />
              </div>
            </div>

            <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-grey)', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="premium-btn" disabled={saving}>
                <Save size={18} />
                {saving ? "Guardando..." : "Actualizar mis datos"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
