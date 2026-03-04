import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, CheckCircle, XCircle, X } from "lucide-react";
import "../../styles/theme.css";

export default function AgenteForm({ agente, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    docAgente: "",
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    nitInmobiliaria: "",
    activo: 1,
  });

  useEffect(() => {
    if (agente) setForm(agente);
  }, [agente]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? (checked ? 1 : 0) : value });
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0 font-weight-bold" style={{ color: "#fff" }}>
          {agente ? "Actualizar Agente" : "Crear Nuevo Agente"}
        </h3>
        <button onClick={onCancel} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleLocalSubmit} className="row g-3">
        <div className="col-md-6 position-relative">
          <label className="text-muted small mb-1 uppercase font-weight-bold">Documento / ID</label>
          <div className="position-relative">
            <User size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              name="docAgente"
              placeholder="000000000"
              value={form.docAgente}
              onChange={handleChange}
              disabled={!!agente}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="text-muted small mb-1 uppercase font-weight-bold">Nombre Completo</label>
          <div className="position-relative">
            <User size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              name="nombre"
              placeholder="Ej. Roberto Silva"
              value={form.nombre}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="text-muted small mb-1 uppercase font-weight-bold">Correo Electrónico</label>
          <div className="position-relative">
            <Mail size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              name="correo"
              type="email"
              placeholder="roberto@visiohome.com"
              value={form.correo}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="text-muted small mb-1 uppercase font-weight-bold">Teléfono</label>
          <div className="position-relative">
            <Phone size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              name="telefono"
              placeholder="+57 300 000 0000"
              value={form.telefono}
              onChange={handleChange}
              className="premium-input ps-5"
            />
          </div>
        </div>

        <div className="col-12">
          <label className="text-muted small mb-1 uppercase font-weight-bold">Dirección de Oficina</label>
          <div className="position-relative">
            <MapPin size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              name="direccion"
              placeholder="Calle 123 #45-67"
              value={form.direccion}
              onChange={handleChange}
              className="premium-input ps-5"
            />
          </div>
        </div>

        <div className="col-md-8">
          <label className="text-muted small mb-1 uppercase font-weight-bold">NIT Inmobiliaria</label>
          <div className="position-relative">
            <Briefcase size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              name="nitInmobiliaria"
              placeholder="900000000-0"
              value={form.nitInmobiliaria}
              onChange={handleChange}
              className="premium-input ps-5"
            />
          </div>
        </div>

        <div className="col-md-4 d-flex align-items-end mb-1">
          <label className="d-flex align-items-center gap-2 cursor-pointer p-2 rounded" style={{ background: "rgba(255,255,255,0.02)", width: "100%" }}>
            <input
              type="checkbox"
              name="activo"
              checked={!!form.activo}
              onChange={handleChange}
              style={{ width: "20px", height: "20px" }}
            />
            <span style={{ color: form.activo ? "#4ade80" : "#f87171", fontWeight: "bold" }}>
              {form.activo ? "Agente Activo" : "Agente Inactivo"}
            </span>
          </label>
        </div>

        <div className="col-12 mt-4 d-flex gap-2">
          <button type="button" onClick={onCancel} className="premium-btn premium-btn-secondary flex-grow-1">
            Cancelar
          </button>
          <button type="submit" className="premium-btn flex-grow-1">
            {agente ? "Guardar Cambios" : "Crear Agente"}
          </button>
        </div>
      </form>
    </div>
  );
}
