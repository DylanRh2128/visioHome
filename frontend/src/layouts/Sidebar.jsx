import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  ShoppingCart,
  Users,
  Box,
  ChevronDown,
  ChevronUp,
  LogOut,
  UserCog,
  FileText,
  UserCheck,
  Building
} from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:8000/";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const toggleAdmin = () => setIsAdminOpen(!isAdminOpen);

  // Construcción segura de la URL del avatar
  const avatarUrl = user?.avatar
    ? `${API_BASE_URL}${user.avatar}`
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.nombre || 'Admin'}`;

  return (
    <aside style={styles.sidebar}>
      {/* PERFIL DEL USUARIO - PREMIUM DESIGN */}
      <div style={styles.profile}>
        <div style={styles.avatar}>
          <img
            src={avatarUrl}
            alt="Avatar"
            style={styles.avatarImg}
            onError={(e) => {
              e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.nombre || 'Admin'}`;
            }}
          />
        </div>
        <strong style={styles.userName}>{user?.nombre || "Administrador"}</strong>
        <p style={styles.userEmail}>{user?.correo || "admin@visiohome.com"}</p>

        <div style={styles.roleBadge}>
          {user?.nombreRol || 'Administrador'}
        </div>
      </div>

      {/* NAVEGACIÓN PRINCIPAL */}
      <nav style={styles.nav}>
        <NavLink
          to="/admin/dashboard"
          style={({ isActive }) => ({
            ...styles.navLink,
            ...(isActive ? styles.navLinkActive : {})
          })}
        >
          <Home size={18} />
          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/admin/propiedades"
          style={({ isActive }) => ({
            ...styles.navLink,
            ...(isActive ? styles.navLinkActive : {})
          })}
        >
          <ShoppingCart size={18} />
          <span>Ventas</span>
        </NavLink>

        <NavLink
          to="/admin/usuarios"
          style={({ isActive }) => ({
            ...styles.navLink,
            ...(isActive ? styles.navLinkActive : {})
          })}
        >
          <Users size={18} />
          <span>Usuarios</span>
        </NavLink>

        <NavLink
          to="/admin/3d"
          style={({ isActive }) => ({
            ...styles.navLink,
            ...(isActive ? styles.navLinkActive : {})
          })}
        >
          <Box size={18} />
          <span>3D</span>
        </NavLink>

        {/* DROPDOWN DE ADMINISTRACIÓN */}
        <div>
          <button
            onClick={toggleAdmin}
            style={styles.dropdownToggle}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Building size={18} />
              <span>Administración</span>
            </div>
            {isAdminOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isAdminOpen && (
            <div style={styles.dropdownMenu}>
              <NavLink
                to="/admin/crud/usuarios"
                style={({ isActive }) => ({
                  ...styles.dropdownItem,
                  ...(isActive ? styles.dropdownItemActive : {})
                })}
              >
                <Users size={16} />
                <span>Usuarios</span>
              </NavLink>

              <NavLink
                to="/admin/crud/facturas"
                style={({ isActive }) => ({
                  ...styles.dropdownItem,
                  ...(isActive ? styles.dropdownItemActive : {})
                })}
              >
                <FileText size={16} />
                <span>Facturas</span>
              </NavLink>

              <NavLink
                to="/admin/crud/agentes"
                style={({ isActive }) => ({
                  ...styles.dropdownItem,
                  ...(isActive ? styles.dropdownItemActive : {})
                })}
              >
                <UserCheck size={16} />
                <span>Agentes</span>
              </NavLink>

              <NavLink
                to="/admin/crud/propiedades"
                style={({ isActive }) => ({
                  ...styles.dropdownItem,
                  ...(isActive ? styles.dropdownItemActive : {})
                })}
              >
                <Building size={16} />
                <span>Propiedades</span>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* SECCIÓN INFERIOR */}
      <div style={styles.footer}>
        <NavLink
          to="/admin/profile"
          style={({ isActive }) => ({
            ...styles.navLink,
            marginBottom: '4px',
            ...(isActive ? styles.navLinkActive : {})
          })}
        >
          <UserCog size={18} />
          <span>Editar perfil</span>
        </NavLink>

        <button onClick={logout} style={styles.logout}>
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    background: "#6b0000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 100,
  },
  profile: {
    padding: "40px 20px 20px",
    textAlign: "center",
  },
  avatar: {
    marginBottom: "16px",
    display: 'flex',
    justifyContent: 'center',
  },
  avatarImg: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.15)",
    padding: '4px',
    background: 'rgba(255,255,255,0.05)',
    objectFit: 'cover'
  },
  userName: {
    display: "block",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "4px",
  },
  userEmail: {
    fontSize: "13px",
    opacity: 0.7,
    margin: 0,
    marginBottom: "5px"
  },
  roleBadge: {
    display: 'inline-block',
    marginTop: '5px',
    padding: '4px 12px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'rgba(255,255,255,0.9)'
  },
  nav: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
    overflowY: 'hidden', // SIN SCROLL POR REQUERIMIENTO
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  navLinkActive: {
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
  },
  dropdownToggle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.7)",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  dropdownMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    marginTop: "4px",
    paddingLeft: "10px",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 16px",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  dropdownItemActive: {
    color: "#fff",
    background: "rgba(255,255,255,0.05)",
  },
  footer: {
    padding: "20px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  logout: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.95)",
    color: "#6b0000",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    transition: "all 0.2s ease",
  },
};
