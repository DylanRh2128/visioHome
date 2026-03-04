import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Building, Users, FileText, UserCheck, ChevronDown } from "lucide-react";

export default function AdminLayout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <div style={styles.contentArea}>
        <header style={styles.header}>
          <div style={styles.headerRight} ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={styles.adminBtn}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={styles.iconCircle}>
                  <Building size={16} />
                </div>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>Administración</span>
              </div>
              <ChevronDown size={14} style={{
                transition: 'transform 0.3s ease',
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </button>

            {isDropdownOpen && (
              <div style={styles.dropdown}>
                <NavLink to="/admin/usuarios" onClick={() => setIsDropdownOpen(false)} style={styles.dropdownItem}>
                  <Users size={16} />
                  <span>Gestión de Usuarios</span>
                </NavLink>
                <NavLink to="/admin/facturas" onClick={() => setIsDropdownOpen(false)} style={styles.dropdownItem}>
                  <FileText size={16} />
                  <span>Control de Facturas</span>
                </NavLink>
                <NavLink to="/admin/agentes" onClick={() => setIsDropdownOpen(false)} style={styles.dropdownItem}>
                  <UserCheck size={16} />
                  <span>Equipo de Agentes</span>
                </NavLink>
                <NavLink to="/admin/propiedades" onClick={() => setIsDropdownOpen(false)} style={styles.dropdownItem}>
                  <Building size={16} />
                  <span>Catálogo de Propiedades</span>
                </NavLink>
              </div>
            )}
          </div>
        </header>
        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "var(--bg-content)",
  },
  contentArea: {
    flex: 1,
    marginLeft: "250px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "70px",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 90,
  },
  headerRight: {
    position: "relative",
  },
  adminBtn: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "8px 16px",
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
    transition: "all 0.3s ease",
    color: "#333",
  },
  iconCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "rgba(107, 0, 0, 0.1)",
    color: "#6b0000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 10px)",
    right: 0,
    width: "240px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(15px)",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
    overflow: "hidden",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    color: "#444",
    textDecoration: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  main: {
    padding: "40px",
    flex: 1,
  },
};
