import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Calendar,
    Clock,
    User,
    LogOut,
    Home,
    Search
} from "lucide-react";
import "../styles/theme.css";
import { useAuth } from "../context/AuthContext";

export default function AgenteLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* Sidebar */}
            <aside className="admin-sidebar" style={{
                width: '260px',
                background: '#1e293b',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh'
            }}>
                <div className="sidebar-logo" style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h1 style={{ fontSize: '24px', margin: 0, fontWeight: 'bold', color: '#fff' }}>Visio<span style={{ color: '#ef4444' }}>Home</span></h1>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: '5px 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Agente Portal</p>
                </div>

                <nav className="sidebar-nav" style={{ flex: 1, padding: '20px 0' }}>
                    <div style={{ padding: '0 20px 10px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>Menú Principal</div>

                    <NavLink to="/agente/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 30px', color: '#cbd5e1', textDecoration: 'none', transition: 'all 0.3s'
                    }}>
                        <LayoutDashboard size={20} /> Dashboard
                    </NavLink>

                    <NavLink to="/agente/appointments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 30px', color: '#cbd5e1', textDecoration: 'none', transition: 'all 0.3s'
                    }}>
                        <Clock size={20} /> Mis Citas
                    </NavLink>

                    <NavLink to="/agente/disponibilidad" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 30px', color: '#cbd5e1', textDecoration: 'none', transition: 'all 0.3s'
                    }}>
                        <Calendar size={20} /> Disponibilidad
                    </NavLink>

                    <NavLink to="/agente/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 30px', color: '#cbd5e1', textDecoration: 'none', transition: 'all 0.3s'
                    }}>
                        <User size={20} /> Mi Perfil
                    </NavLink>
                </nav>

                <div className="sidebar-footer" style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button onClick={handleLogout} style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
                    }}>
                        <LogOut size={18} /> Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: '260px', padding: '40px' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '40px'
                }}>
                    <div className="search-bar" style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input type="text" placeholder="Buscar..." style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff' }} />
                    </div>

                    <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px' }}>{user.nombre}</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Agente VisioHome</p>
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                            <User size={20} />
                        </div>
                    </div>
                </header>

                <div className="page-content">
                    <Outlet />
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .nav-item.active {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff !important;
                    border-left: 4px solid #ef4444;
                }
                .nav-item:hover:not(.active) {
                    background: rgba(255, 255, 255, 0.02);
                    color: #fff !important;
                }
            `}} />
        </div>
    );
}
