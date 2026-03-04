import { useEffect, useState } from "react";
import { User, Mail, Lock, Shield, X, Save, Key } from "lucide-react";
import "../../styles/theme.css";

export default function UserForm({ user, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    docUsuario: "",
    nombre: "",
    correo: "",
    password: "",
    idRol: 2,
  });

  useEffect(() => {
    if (user) setForm({ ...user, password: "" });
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0 font-weight-bold" style={{ color: "#fff" }}>
          {user ? "Editar Usuario" : "Crear Nuevo Usuario"}
        </h3>
        <button onClick={onCancel} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleLocalSubmit} className="row g-4">
        <div className="col-md-6">
          <label className="text-muted small mb-1 uppercase font-weight-bold">Documento / ID</label>
          <div className="position-relative">
            <Key size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              name="docUsuario"
              placeholder="000000000"
              value={form.docUsuario}
              onChange={handleChange}
              disabled={!!user}
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
              placeholder="Ej. Juan Pérez"
              value={form.nombre}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-12">
          <label className="text-muted small mb-1 uppercase font-weight-bold">Correo Electrónico</label>
          <div className="position-relative">
            <Mail size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              name="correo"
              type="email"
              placeholder="juan@example.com"
              value={form.correo}
              onChange={handleChange}
              className="premium-input ps-5"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="text-muted small mb-1 uppercase font-weight-bold">Rol de Acceso</label>
          <div className="position-relative">
            <Shield size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <select
              name="idRol"
              value={form.idRol}
              onChange={handleChange}
              className="premium-input ps-5"
              style={{ appearance: "none" }}
            >
              <option value={1}>Administrador</option>
              <option value={2}>Cliente</option>
              <option value={3}>Agente</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <label className="text-muted small mb-1 uppercase font-weight-bold">Contraseña</label>
          <div className="position-relative">
            <Lock size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              name="password"
              type="password"
              placeholder={user ? "Nueva (opcional)" : "Mín. 6 caracteres"}
              value={form.password}
              onChange={handleChange}
              className="premium-input ps-5"
              required={!user}
            />
          </div>
        </div>

        <div className="col-12 mt-4 d-flex gap-2">
          <button type="button" onClick={onCancel} className="premium-btn premium-btn-secondary flex-grow-1">
            Cancelar
          </button>
          <button type="submit" className="premium-btn flex-grow-1">
            {user ? "Guardar Cambios" : "Crear Usuario"}
          </button>
        </div>
      </form>
    </div>
  );
}
