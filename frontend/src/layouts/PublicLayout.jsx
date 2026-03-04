import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Shield, Mail, Phone, MapPin, Facebook, Instagram, Twitter, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PublicLayout() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navLinks = [
        { path: "/", label: "Inicio" },
        { path: "/contact", label: "Contacto" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const getDashboardLink = () => {
        if (!user) return "/";
        if (user.rol === 'admin') return "/admin/dashboard";
        if (user.rol === 'user') return "/user/dashboard";
        if (user.rol === 'agente') return "/agente/dashboard";
        return "/";
    };

    return (
        <div className="public-layout">
            <nav className="public-navbar">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
                        <Shield color="var(--accent-red)" size={32} />
                        <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", letterSpacing: "-1px" }}>VisioHome</span>
                    </Link>

                    <div className="d-flex align-items-center gap-4">
                        <div className="d-none d-md-flex gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    style={{
                                        color: location.pathname === link.path ? "#fff" : "rgba(255,255,255,0.6)",
                                        textDecoration: "none",
                                        fontWeight: "600",
                                        transition: "var(--transition-smooth)"
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="d-flex gap-3 align-items-center">
                            {!user ? (
                                <>
                                    <Link to="/login" className="text-white text-decoration-none fw-bold small">
                                        Iniciar Sesión
                                    </Link>
                                    <Link to="/registro" className="premium-btn" style={{ padding: "8px 20px" }}>
                                        Unirse Gratis
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={getDashboardLink()} className="premium-btn d-flex align-items-center gap-2" style={{ padding: "8px 20px" }}>
                                        <UserIcon size={16} />
                                        <span>Mi Panel</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-white bg-transparent border-0 d-flex align-items-center gap-2 small fw-bold"
                                        style={{ cursor: 'pointer', padding: 0 }}
                                    >
                                        <LogOut size={16} />
                                        <span>Cerrar Sesión</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer className="public-footer">
                <div className="section-container" style={{ padding: 0 }}>
                    <div className="grid-auto">
                        <div>
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <Shield color="var(--accent-red)" size={28} />
                                <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "#fff" }}>VisioHome</span>
                            </div>
                            <p style={{ opacity: 0.6, lineHeight: "1.8", maxWidth: "300px" }}>
                                Líderes en visualización 3D y gestión inmobiliaria inteligente. Transformamos el mercado digital.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white mb-4">Contacto</h4>
                            <div className="d-flex flex-column gap-3" style={{ opacity: 0.7 }}>
                                <div className="d-flex align-items-center gap-2 small"><Mail size={18} /> info@visiohome.com</div>
                                <div className="d-flex align-items-center gap-2 small"><Phone size={18} /> +1 (555) 123-4567</div>
                                <div className="d-flex align-items-center gap-2 small"><MapPin size={18} /> Calle Real 123, Madrid</div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white mb-4">Síguenos</h4>
                            <div className="d-flex gap-3">
                                <a href="#" className="premium-btn" style={{ padding: "10px" }}><Facebook size={20} /></a>
                                <a href="#" className="premium-btn" style={{ padding: "10px" }}><Instagram size={20} /></a>
                                <a href="#" className="premium-btn" style={{ padding: "10px" }}><Twitter size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
