import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Search, ShoppingCart, User, LogOut, Home } from "lucide-react";
import "@/styles/user.css"; // Import user-specific styles
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const UserLayout = () => {
    const { logout } = useAuth();
    const { cart } = useCart();

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Navbar */}
            <nav className="public-navbar fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <Link to="/user/dashboard" className="flex items-center gap-2 no-underline">
                            <div className="w-8 h-8 bg-[#6b0000] rounded-lg flex items-center justify-center">
                                <Home className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-extrabold text-[#6b0000] tracking-tight">
                                VisioHome
                            </span>
                        </Link>

                        {/* Search Bar (Global) - Hidden on small screens, can be expanded */}
                        <div className="hidden md:flex flex-1 mx-10 max-w-lg">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6b0000] focus:border-[#6b0000] sm:text-sm transition-all"
                                    placeholder="Buscar propiedades, zonas..."
                                />
                            </div>
                        </div>

                        {/* Icons / Actions */}
                        <div className="flex items-center gap-4">
                            <Link to="/user/cart" className="relative p-2 text-gray-500 hover:text-[#6b0000] transition-colors">
                                <ShoppingCart className="w-6 h-6" />
                                {cart.length > 0 && (
                                    <span className="absolute top-1 right-1 bg-[#6b0000] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>

                            <Link to="/user/profile" className="p-2 text-gray-500 hover:text-[#6b0000] transition-colors">
                                <User className="w-6 h-6" />
                            </Link>

                            <button
                                onClick={logout}
                                className="p-2 text-gray-500 hover:text-red-600 transition-colors flex items-center gap-2"
                                title="Cerrar Sesión"
                            >
                                <LogOut className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20 pb-10">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="public-footer bg-[#080808] text-white pt-16 pb-8 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-[#6b0000] rounded-lg flex items-center justify-center">
                                    <Home className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xl font-extrabold text-white tracking-tight">
                                    VisioHome
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Transformamos la experiencia de encontrar tu hogar ideal con tecnología y diseño de vanguardia.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Plataforma</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><Link to="/user/dashboard" className="hover:text-white transition-colors">Inicio</Link></li>
                                <li><Link to="/user/properties" className="hover:text-white transition-colors">Propiedades</Link></li>
                                <li><Link to="/user/appointments" className="hover:text-white transition-colors">Citas</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Soporte</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Newsletter</h4>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Tu email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-[#6b0000]" />
                                <button className="bg-[#6b0000] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#500000] transition-colors">
                                    Suscribir
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">© 2024 VisioHome Inc. Todos los derechos reservados.</p>
                        <div className="flex gap-6">
                            {/* Social icons placeholders */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UserLayout;
