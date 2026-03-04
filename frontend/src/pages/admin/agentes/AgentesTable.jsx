import { Edit2, Trash2, Mail, Phone, BadgeCheck, XCircle } from "lucide-react";
import "../../../styles/theme.css";

export default function AgentesTable({ agentes, onEdit, onDelete }) {
  return (
    <table className="premium-table">
      <thead>
        <tr>
          <th>Agente</th>
          <th>Especialidad / Carrera</th>
          <th>Contacto</th>
          <th>NIT / Ciudad</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {agentes.map((a) => (
          <tr key={a.docUsuario}>
            <td>
              <div className="d-flex align-items-center gap-3">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "rgba(107, 0, 0, 0.2)",
                  color: "#ff4d4d",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold"
                }}>
                  {a.nombre?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#fff" }}>{a.nombre}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ID: {a.docUsuario}</div>
                </div>
              </div>
            </td>
            <td>
              <div style={{ fontWeight: "600", color: "#fff" }}>{a.especialidad}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>{a.carrera}</div>
            </td>
            <td>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center gap-2 small text-muted">
                  <Mail size={12} /> {a.correo}
                </div>
                <div className="d-flex align-items-center gap-2 small text-muted">
                  <Phone size={12} /> {a.telefono || "Sin teléfono"}
                </div>
              </div>
            </td>
            <td>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                {a.ciudad || "No definida"}
                <br />
                <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>NIT: {a.nitInmobiliaria || "Particular"}</span>
              </div>
            </td>
            <td>
              <span style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                background: a.activo ? "rgba(74, 222, 128, 0.1)" : "rgba(248, 113, 113, 0.1)",
                color: a.activo ? "#4ade80" : "#f87171",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem"
              }}>
                {a.activo ? <BadgeCheck size={14} /> : <XCircle size={14} />}
                {a.activo ? "ACTIVO" : "INACTIVO"}
              </span>
            </td>
            <td>
              <div className="d-flex gap-2">
                <button
                  onClick={() => onEdit(a)}
                  style={{ background: "none", border: "none", color: "#ffb86c", cursor: "pointer", padding: "0.5rem", borderRadius: "8px", transition: "0.2s" }}
                  title="Editar"
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 184, 108, 0.1)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "none"}
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(a.docUsuario)}
                  style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", padding: "0.5rem", borderRadius: "8px", transition: "0.2s" }}
                  title="Eliminar"
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 77, 77, 0.1)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "none"}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}
