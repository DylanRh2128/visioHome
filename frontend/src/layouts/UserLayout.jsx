import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    Shield,
    LogOut
} from "lucide-react";

export default function UserLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light w-100 position-relative">

            {/* NAVBAR */}
            <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom sticky-top shadow-sm px-lg-4" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.9) !important' }}>
                <div className="container-fluid">

                    {/* LOGO */}
                    <Link
                        to="/user/dashboard"
                        className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
                    >
                        <Shield className="text-danger" size={26} style={{ color: '#6b0000' }} />
                        <span className="fw-bolder tracking-tight text-dark h4 mb-0">
                            VisioHome
                        </span>
                    </Link>

                    {/* NAV LINKS */}
                    <div className="collapse navbar-collapse justify-content-center" id="userNavbar">
                        <div className="navbar-nav gap-lg-4">
                            <Link
                                to="/user/dashboard"
                                className="nav-link fw-semibold text-secondary"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/user/properties"
                                className="nav-link fw-semibold text-secondary"
                            >
                                Explorar
                            </Link>
                            <Link
                                to="/user/favorites"
                                className="nav-link fw-semibold text-secondary"
                            >
                                Favoritos
                            </Link>
                            <Link
                                to="/user/appointments"
                                className="nav-link fw-semibold text-secondary"
                            >
                                Mis Citas
                            </Link>
                            <Link
                                to="/user/profile"
                                className="nav-link fw-semibold text-secondary"
                            >
                                Mi Perfil
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="d-flex align-items-center gap-3">

                        {/* AGREGAR ESPACIO O OTROS ELEMENTOS SI ES NECESARIO */}

                        {/* USER INFO */}
                        <div className="d-none d-sm-flex align-items-center gap-3 ms-2">
                            <div className="text-end">
                                <p className="small fw-bold text-dark mb-0">
                                    {user?.nombre || "Usuario"}
                                </p>
                                <p className="text-uppercase fw-bold text-muted mb-0" style={{ fontSize: '10px', letterSpacing: '1px' }}>
                                    Cliente
                                </p>
                            </div>

                            <img
                                className="rounded-circle border border-light shadow-sm"
                                style={{ width: '36px', height: '36px', objectFit: 'cover', cursor: 'pointer' }}
                                src={
                                    user?.avatar
                                        ? `http://127.0.0.1:8000/storage/${user.avatar}`
                                        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.nombre || "User"}`
                                }
                                alt="Avatar"
                                onClick={() => navigate('/user/profile')}
                                title="Ver perfil"
                            />
                        </div>

                        {/* LOGOUT */}
                        <button
                            onClick={handleLogout}
                            className="btn btn-link p-2 text-secondary"
                            title="Cerrar Sesión"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <main className="flex-grow-1 w-100">
                <Outlet />
            </main>

            {/* FOOTER */}
            <footer className="bg-white border-top py-5 mt-5">
                <div className="container text-center">
                    <p className="small text-muted mb-0">
                        © {new Date().getFullYear()} VisioHome Inmobiliaria. Experiencia Premium.
                    </p>
                </div>
            </footer>
        </div>
    );
}
