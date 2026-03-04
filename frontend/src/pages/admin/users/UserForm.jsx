import { useEffect, useState } from "react";
import { User, Mail, Lock, Shield, X, Save, Key, Camera, Phone, MapPin } from "lucide-react";
import "../../../styles/theme.css";

export default function UserForm({ user, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    docUsuario: "",
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    password: "",
    idRol: 2,
    activo: 1,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        ...user,
        password: "",
        activo: user.activo ? 1 : 0
      });
      if (user.avatar) {
        setPreviewUrl(`http://127.0.0.1:8000/${user.avatar}`);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      // IMPORTANTE: No enviar el avatar si es un string (la URL actual)
      // para que el backend no reciba un valor de texto en vez de archivo
      if (key === 'avatar') return;

      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });

    if (selectedFile) {
      formData.append('avatar', selectedFile);
    }

    onSubmit(formData);
  };

  return (
    <div className="p-4 animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="h5 fw-bold mb-1" style={{ color: "var(--primary-vino)" }}>
            {user ? "Editar Perfil de Usuario" : "Crear Nuevo Usuario"}
          </h3>
          <p className="text-muted small mb-0">Completa la información necesaria para gestionar la cuenta.</p>
        </div>
        <button onClick={onCancel} className="btn btn-link text-muted p-0">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleLocalSubmit} className="row g-4">
        {/* Avatar Section */}
        <div className="col-12 d-flex align-items-center gap-4 mb-2">
          <div style={{ position: 'relative', width: '90px', height: '90px' }}>
            <img
              src={previewUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.nombre || 'User'}`}
              alt="Avatar Preview"
              className="rounded-circle border border-2 shadow-sm"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderColor: 'var(--primary-vino)' }}
            />
            <label
              htmlFor="avatar-upload"
              className="position-absolute bottom-0 end-0 bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '32px', height: '32px', cursor: 'pointer', border: '1px solid #ddd' }}
            >
              <Camera size={14} color="var(--primary-vino)" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <div>
            <p className="fw-bold mb-1 small">Foto de Perfil</p>
            <p className="text-muted small mb-0">Recomendado: JPG o PNG, min 400x400px.</p>
          </div>
        </div>

        <div className="col-12 mt-2">
          <h4 className="form-section-title">Información Personal</h4>
        </div>

        <div className="col-md-6">
          <label className="form-label">Nombre Completo</label>
          <div className="position-relative">
            <User size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="nombre"
              placeholder="Ej. Carlos Rodriguez"
              value={form.nombre || ""}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Documento de Identidad</label>
          <div className="position-relative">
            <Key size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="docUsuario"
              placeholder="12345678"
              value={form.docUsuario || ""}
              onChange={handleChange}
              disabled={user ? true : false}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Correo Electrónico</label>
          <div className="position-relative">
            <Mail size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="correo"
              type="email"
              placeholder="carlos@visiohome.com"
              value={form.correo || ""}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Teléfono Móvil</label>
          <div className="position-relative">
            <Phone size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="telefono"
              placeholder="300 000 0000"
              value={form.telefono || ""}
              onChange={handleChange}
              className="premium-input ps-5"
            />
          </div>
        </div>

        <div className="col-12">
          <h4 className="form-section-title mt-4">Configuración de Cuenta</h4>
        </div>

        <div className="col-md-6">
          <label className="form-label">Rol del Sistema</label>
          <div className="position-relative">
            <Shield size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6, zIndex: 1 }} />
            <select
              name="idRol"
              value={form.idRol || 2}
              onChange={handleChange}
              className="premium-input premium-select ps-5"
            >
              <option value={1}>Administrador</option>
              <option value={2}>Cliente</option>
              <option value={3}>Agente Inmobiliario</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Establecer Contraseña</label>
          <div className="position-relative">
            <Lock size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="password"
              type="password"
              placeholder={user ? "Nueva contraseña (opcional)" : "Mínimo 8 caracteres"}
              value={form.password || ""}
              onChange={handleChange}
              className="premium-input ps-5"
              required={!user}
            />
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center">
          <div className="premium-input d-flex align-items-center justify-content-center gap-3 w-100"
            style={{
              background: form.activo ? 'rgba(74, 222, 128, 0.05)' : 'rgba(248, 113, 113, 0.05)',
              borderColor: form.activo ? '#4ade8050' : '#f8717150',
              height: '52px'
            }}>
            <div className="form-check form-switch m-0 d-flex align-items-center gap-2">
              <input
                className="form-check-input cursor-pointer"
                type="checkbox"
                name="activo"
                id="activoSwitchUser"
                checked={!!form.activo}
                onChange={handleChange}
                style={{ width: '2.5em', height: '1.25em', backgroundColor: form.activo ? '#4ade80' : '#f87171' }}
              />
              <label className="form-check-label fw-bold small m-0" htmlFor="activoSwitchUser" style={{ color: form.activo ? '#1e8e3e' : '#d93025' }}>
                {form.activo ? "CUENTA ACTIVA" : "CUENTA INACTIVA"}
              </label>
            </div>
          </div>
        </div>

        <div className="col-12 mt-5 py-3 border-top d-flex gap-3">
          <button type="button" onClick={onCancel} className="btn border-0 fw-bold text-muted px-4">
            Cancelar
          </button>
          <button type="submit" className="premium-btn shadow-sm flex-grow-1 justify-content-center">
            <Save size={18} />
            <span>{user ? "Actualizar Registro" : "Crear Usuario"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
