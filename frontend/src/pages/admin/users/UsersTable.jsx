import { Edit2, Trash2, Mail, Shield, User, Phone, CheckCircle, XCircle } from "lucide-react";
import "../../../styles/theme.css";

export default function UsersTable({ usuarios, onEdit, onDelete }) {
  const getRolName = (id) => {
    const roles = { 1: "ADMIN", 2: "CLIENTE", 3: "AGENTE" };
    return roles[id] || "USUARIO";
  };

  const getRolColor = (id) => {
    const colors = { 1: "#ff4d4d", 2: "#4ade80", 3: "#60a5fa" };
    return colors[id] || "#fff";
  };

  return (
    <table className="premium-table">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Contacto / ID</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(usuarios) && usuarios.map((u) => (
          <tr key={u.docUsuario}>
            <td>
              <div className="d-flex align-items-center gap-3">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <User size={20} color={getRolColor(u.idRol)} />
                </div>
                <div style={{ fontWeight: "700", color: "#fff" }}>{u.nombre}</div>
              </div>
            </td>
            <td>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2 small text-muted">
                  <Mail size={12} /> {u.correo}
                </div>
                <div className="d-flex align-items-center gap-2 small text-muted">
                  <Phone size={12} /> {u.telefono || "N/A"}
                </div>
                <div className="small text-muted" style={{ fontSize: "0.7rem", opacity: 0.6 }}>ID: {u.docUsuario}</div>
              </div>
            </td>
            <td>
              <span style={{
                padding: "0.3rem 0.6rem",
                borderRadius: "6px",
                fontSize: "0.7rem",
                fontWeight: "bold",
                background: "rgba(255, 255, 255, 0.03)",
                color: getRolColor(u.idRol),
                border: `1px solid ${getRolColor(u.idRol)}20`
              }}>
                {getRolName(u.idRol)}
              </span>
            </td>
            <td>
              <span style={{
                padding: "0.3rem 0.6rem",
                borderRadius: "6px",
                fontSize: "0.7rem",
                fontWeight: "bold",
                background: (u.estado || 'Activo') === 'Activo' ? "rgba(74, 222, 128, 0.1)" : "rgba(248, 113, 113, 0.1)",
                color: (u.estado || 'Activo') === 'Activo' ? "#4ade80" : "#f87171",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem"
              }}>
                {(u.estado || 'Activo') === 'Activo' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {(u.estado || 'Activo')?.toUpperCase()}
              </span>
            </td>
            <td>
              <div className="d-flex gap-2">
                <button
                  onClick={() => onEdit(u)}
                  style={{ background: "none", border: "none", color: "#60a5fa", cursor: "pointer", padding: "0.4rem" }}
                  title="Editar"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(u.docUsuario)}
                  style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", padding: "0.4rem" }}
                  title="Eliminar"
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
