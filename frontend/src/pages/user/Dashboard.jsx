import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    Search,
    Home,
    Calendar,
    ArrowRight,
    Star,
    Clock,
    MapPin,
    LayoutGrid,
    ChevronRight,
    TrendingUp
} from "lucide-react";
import propiedadService from "../../services/propiedadService";

export default function Dashboard() {
    const { user } = useAuth();
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFeatured();
    }, []);

    const loadFeatured = async () => {
        try {
            setLoading(true);
            const data = await propiedadService.getAll();
            setFeaturedProperties(data.slice(0, 3));
        } catch (error) {
            console.error("Error loading featured properties:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
            {/* Upper Section: Welcome & Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                        Bienvenido de nuevo, <span className="text-[#6b0000]">{user?.nombre?.split(' ')[0] || "Explorador"}</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">Encuentra el hogar de tus sueños hoy mismo.</p>
                </div>
                <div className="w-full md:w-auto">
                    <Link
                        to="/user/properties"
                        className="btn-premium bg-[#6b0000] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-xl hover:bg-[#4d0000] transition-all no-underline"
                    >
                        <Search size={22} />
                        <span>Descubrir Propiedades</span>
                    </Link>
                </div>
            </div>

            {/* Quick Stats / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                        <Home size={24} />
                    </div>
                    <h3 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Favoritos</h3>
                    <p className="text-2xl font-extrabold text-gray-900 m-0">12 Guardados</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center text-green-600 mb-4">
                        <Calendar size={24} />
                    </div>
                    <h3 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Citas</h3>
                    <p className="text-2xl font-extrabold text-gray-900 m-0">2 Próximas</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Mercado</h3>
                    <p className="text-2xl font-extrabold text-gray-900 m-0">+4.5% mes</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                        <Clock size={24} />
                    </div>
                    <h3 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Recientes</h3>
                    <p className="text-2xl font-extrabold text-gray-900 m-0">5 Vistas hoy</p>
                </div>
            </div>

            {/* Recommended Properties */}
            <div className="mb-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Recomendados para ti</h2>
                        <p className="text-gray-400 font-medium small">Basado en tus búsquedas recientes y preferencias.</p>
                    </div>
                    <Link to="/user/properties" className="text-[#6b0000] font-bold flex items-center gap-1 hover:gap-2 transition-all no-underline small">
                        Ver todo <ChevronRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse bg-gray-100 rounded-3xl h-[400px]"></div>
                        ))
                    ) : (
                        featuredProperties.map(prop => (
                            <div key={prop.idPropiedad} className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={prop.imagen || `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800`}
                                        alt={prop.titulo}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#6b0000] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Premium</span>
                                    </div>
                                    <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
                                        <Star size={18} />
                                    </button>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#6b0000] transition-colors">{prop.titulo}</h3>
                                            <p className="text-gray-400 text-sm flex items-center gap-1">
                                                <MapPin size={14} /> {prop.ubicacion || "Ubicación Privada"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-extrabold text-[#6b0000] m-0">${prop.precio?.toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase m-0">USD / Total</p>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <div className="text-center">
                                                <p className="text-sm font-extrabold text-gray-900 m-0">{prop.habitaciones || 3}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase m-0">Hab</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-extrabold text-gray-900 m-0">{prop.banos || 2}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase m-0">Baños</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-extrabold text-gray-900 m-0">{prop.tamano_m2 || 120}m²</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase m-0">Área</p>
                                            </div>
                                        </div>
                                        <Link to={`/user/properties/${prop.idPropiedad}`} className="p-2 text-gray-300 group-hover:text-[#6b0000] transition-colors">
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Next Milestone: Tours Virtuales */}
            <div className="bg-[#6b0000]/5 rounded-[40px] p-12 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
                <div className="absolute -bottom-10 -right-10 text-[#6b0000]/5 scale-150 transform rotate-12">
                    <Box size={300} />
                </div>
                <div className="max-w-xl relative z-10">
                    <span className="bg-[#6b0000] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">Innovación</span>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">Vive la propiedad antes de visitarla con <span className="text-[#6b0000]">Tours 3D</span></h2>
                    <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed">
                        Nuestra tecnología inmersiva te permite recorrer cada rincón de tu próximo hogar desde la comodidad de tu asiento. Próximamente disponible.
                    </p>
                    <Link to="/user/3d" className="btn-premium bg-[#6b0000] text-white px-10 py-4 rounded-2xl font-bold inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all no-underline">
                        Explorar Futuro <Star size={18} />
                    </Link>
                </div>
                <div className="relative z-10 w-full lg:w-1/2">
                    <div className="aspect-video bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=800"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            alt="3D Tour Preview"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <LayoutGrid className="text-[#6b0000]" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
