import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, CheckCircle, XCircle, X, ShieldCheck, Save, Search } from "lucide-react";
import "../../../styles/theme.css";

export default function AgenteForm({ agente, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    docUsuario: "",
    nombre: "",
    correo: "",
    carrera: "",
    ciudad: "",
    telefono: "",
    direccion: "",
    nitInmobiliaria: "900123456-1",
    especialidad: "",
    experiencia_anos: 0,
    biografia: "",
    password: "",
    activo: 1,
    foto_perfil: null
  });

  useEffect(() => {
    if (agente) {
      setForm({
        docUsuario: agente.docUsuario || "",
        nombre: agente.nombre || "",
        correo: agente.correo || "",
        carrera: agente.carrera || "",
        ciudad: agente.ciudad || "",
        telefono: agente.telefono || "",
        direccion: agente.direccion || "",
        nitInmobiliaria: agente.nitInmobiliaria || "900123456-1",
        especialidad: agente.especialidad || "",
        experiencia_anos: agente.experiencia_anos || 0,
        biografia: agente.biografia || "",
        password: "", // No cargar password previa
        activo: agente.activo ? 1 : 0,
        foto_perfil: null
      });
    }
  }, [agente]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked ? 1 : 0 });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="p-4 animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="h5 fw-bold mb-1" style={{ color: "var(--primary-vino)" }}>
            {agente ? "Actualizar Credenciales de Agente" : "Vincular Nuevo Agente"}
          </h3>
          <p className="text-muted small mb-0">Registra o edita los datos profesionales del representante inmobiliario.</p>
        </div>
        <button onClick={onCancel} className="btn btn-link text-muted p-0">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleLocalSubmit} className="row g-4">
        <div className="col-12 mt-2">
          <h4 className="form-section-title">Identificación y Perfil</h4>
        </div>

        <div className="col-md-6">
          <label className="form-label">Cédula / Pasaporte *</label>
          <div className="position-relative">
            <User size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="docUsuario"
              placeholder="Ej: 1000234567"
              value={form.docUsuario || ""}
              onChange={handleChange}
              disabled={!!agente}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Nombre del Agente *</label>
          <div className="position-relative">
            <ShieldCheck size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="nombre"
              placeholder="Ej. Roberto Silva"
              value={form.nombre || ""}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Contraseña {agente && "(dejar en blanco para no cambiar)"} *</label>
          <div className="position-relative">
            <ShieldCheck size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="password"
              type="password"
              placeholder="Min 8 caracteres"
              value={form.password || ""}
              onChange={handleChange}
              className="premium-input ps-5"
              required={!agente}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Especialidad *</label>
          <div className="position-relative">
            <Briefcase size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="especialidad"
              placeholder="Ej. Residencial, Comercial"
              value={form.especialidad || ""}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Carrera / Título *</label>
          <div className="position-relative">
            <ShieldCheck size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="carrera"
              placeholder="Ej. Abogado, Administrador"
              value={form.carrera || ""}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Ciudad de Operación *</label>
          <div className="position-relative">
            <MapPin size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="ciudad"
              placeholder="Ej. Bogotá, Medellín"
              value={form.ciudad || ""}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Años de Experiencia *</label>
          <div className="position-relative">
            <Briefcase size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="experiencia_anos"
              type="number"
              placeholder="Ej. 5"
              value={form.experiencia_anos ?? 0}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-12 mt-2">
          <h4 className="form-section-title mt-2">Datos de Localización y Empresa</h4>
        </div>

        <div className="col-md-6">
          <label className="form-label">Correo Corporativo *</label>
          <div className="position-relative">
            <Mail size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="correo"
              type="email"
              placeholder="nombre@inmobiliaria.com"
              value={form.correo || ""}
              onChange={handleChange}
              disabled={!!agente}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Línea Telefónica</label>
          <div className="position-relative">
            <Phone size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="telefono"
              placeholder="+57 3XX XXX XXXX"
              value={form.telefono || ""}
              onChange={handleChange}
              className="premium-input ps-5"
            />
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Dirección de Despacho</label>
          <div className="position-relative">
            <MapPin size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="direccion"
              placeholder="Sede principal, Barrio, Ciudad..."
              value={form.direccion || ""}
              onChange={handleChange}
              className="premium-input ps-5"
            />
          </div>
        </div>

        <div className="col-md-12">
          <label className="form-label">Biografía Profesional</label>
          <div className="position-relative">
            <textarea
              name="biografia"
              placeholder="Describe la experiencia y visión del agente..."
              value={form.biografia || ""}
              onChange={handleChange}
              className="premium-input p-3"
              style={{ height: '100px', resize: 'vertical' }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Foto de Perfil</label>
          <input
            name="foto_perfil"
            type="file"
            onChange={handleChange}
            className="premium-input"
            accept="image/*"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Entidad / Inmobiliaria (NIT)</label>
          <div className="position-relative">
            <Briefcase size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
            <input
              name="nitInmobiliaria"
              placeholder="900.XXX.XXX-X"
              value={form.nitInmobiliaria || "900123456-1"}
              onChange={handleChange}
              className="premium-input ps-5"
              readOnly
            />
          </div>
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <div className="premium-input d-flex align-items-center justify-content-center gap-3"
            style={{ background: form.activo ? 'rgba(74, 222, 128, 0.05)' : 'rgba(248, 113, 113, 0.05)', borderColor: form.activo ? '#4ade8050' : '#f8717150' }}>
            <div className="form-check form-switch m-0 d-flex align-items-center gap-2">
              <input
                className="form-check-input cursor-pointer"
                type="checkbox"
                name="activo"
                id="activoSwitch"
                checked={!!form.activo}
                onChange={handleChange}
                style={{ width: '2.5em', height: '1.25em', backgroundColor: form.activo ? '#4ade80' : '#f87171' }}
              />
              <label className="form-check-label fw-bold small m-0" htmlFor="activoSwitch" style={{ color: form.activo ? '#1e8e3e' : '#d93025' }}>
                {form.activo ? "ESTADO ACTIVO" : "ESTADO INACTIVO"}
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
            <span>{agente ? "Actualizar Agente" : "Vincular Agente"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
