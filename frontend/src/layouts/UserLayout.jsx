import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    Shield,
    Home,
    Search,
    ShoppingCart,
    Calendar,
    User,
    LogOut,
    Box
} from "lucide-react";
import "../styles/theme.css";

export default function UserLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Minimalist User Navbar */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center gap-8">
                            <Link to="/user/dashboard" className="flex items-center gap-2 no-underline">
                                <Shield className="text-[#6b0000]" size={28} />
                                <span className="text-xl font-extrabold tracking-tighter text-gray-900">VisioHome</span>
                            </Link>

                            <div className="hidden md:ml-6 md:flex md:space-x-8">
                                <Link to="/user/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-900 border-b-2 border-transparent hover:border-[#6b0000] focus:outline-none transition-all no-underline">
                                    Dashboard
                                </Link>
                                <Link to="/user/properties" className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-[#6b0000] focus:outline-none transition-all no-underline">
                                    Explorar
                                </Link>
                                <Link to="/user/appointments" className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-[#6b0000] focus:outline-none transition-all no-underline">
                                    Mis Citas
                                </Link>
                                <Link to="/user/3d" className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-[#6b0000] focus:outline-none transition-all no-underline">
                                    Exploración 3D
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to="/user/cart" className="p-2 text-gray-400 hover:text-[#6b0000] transition-colors relative">
                                <ShoppingCart size={22} />
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#6b0000] ring-2 ring-white"></span>
                            </Link>

                            <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

                            <div className="flex items-center gap-3">
                                <Link to="/user/profile" className="flex items-center gap-3 no-underline group">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-bold text-gray-900 m-0 group-hover:text-[#6b0000] transition-colors">{user?.nombre || "Comprador"}</p>
                                        <p className="text-[10px] text-gray-400 m-0 uppercase tracking-widest font-bold">Cliente Elite</p>
                                    </div>
                                    <img
                                        className="h-10 w-10 rounded-full border-2 border-transparent group-hover:border-[#6b0000] transition-all"
                                        src={user?.avatar ? `http://127.0.0.1:8000/${user.avatar}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.nombre || 'User'}`}
                                        alt="Avatar"
                                    />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-[#6b0000] transition-colors"
                                    title="Cerrar Sesión"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Simple User Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm text-gray-400 font-medium">&copy; {new Date().getFullYear()} VisioHome Inmobiliaria. Experiencia Premium.</p>
                </div>
            </footer>
        </div>
    );
}
