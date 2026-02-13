import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    MapPin,
    Bed,
    Bath,
    Layout,
    Calendar,
    Video,
    ShoppingCart,
    CreditCard,
    ChevronLeft,
    Star,
    Share2,
    Phone,
    Mail,
    CheckCircle2,
    Shield
} from "lucide-react";
import propiedadService from "../../services/propiedadService";
import appointmentService from "../../services/appointmentService";
import AppointmentModal from "../../components/user/AppointmentModal";
import "../../styles/theme.css";

export default function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);

    const handleSchedule = async (appointmentData) => {
        try {
            await appointmentService.create({
                ...appointmentData,
                idPropiedad: id
            });
            // Success logic is handled inside the modal step 3
        } catch (error) {
            alert("Error al agendar la cita: " + (error.message || "Intente más tarde"));
        }
    };

    const dummyImages = [
        "https://images.unsplash.com/photo-1600585154340-be6191dae10c?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600607687940-4e5a994239b7?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600607687644-c7171b42398f?auto=format&fit=crop&q=80&w=1200"
    ];

    useEffect(() => {
        loadProperty();
        window.scrollTo(0, 0);
    }, [id]);

    const loadProperty = async () => {
        try {
            setLoading(true);
            const data = await propiedadService.getById(id);
            setProperty(data);
        } catch (error) {
            console.error("Error loading property:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse">
                <div className="h-8 w-64 bg-gray-100 rounded-lg mb-8"></div>
                <div className="h-[600px] w-full bg-gray-100 rounded-[3rem] mb-12"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-12 w-3/4 bg-gray-100 rounded-xl"></div>
                        <div className="h-4 w-full bg-gray-100 rounded-lg"></div>
                        <div className="h-4 w-full bg-gray-100 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!property) return <div className="p-20 text-center">Propiedad no encontrada.</div>;

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Navigation Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
                <Link to="/user/properties" className="flex items-center gap-2 text-gray-500 hover:text-[#6b0000] font-bold no-underline transition-colors uppercase text-xs tracking-widest">
                    <ChevronLeft size={18} /> Volver al listado
                </Link>
                <div className="flex gap-4">
                    <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#6b0000] hover:bg-white transition-all shadow-sm">
                        <Share2 size={20} />
                    </button>
                    <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                        <Star size={20} />
                    </button>
                </div>
            </div>

            {/* Immersive Gallery */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[600px] group">
                    <img
                        src={dummyImages[activeImage]}
                        alt={property.titulo}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Floating Info Over Image */}
                    <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                        <div className="max-w-2xl">
                            <div className="flex gap-2 mb-4">
                                <span className="bg-[#6b0000] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Premium</span>
                                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/30">{property.tipo}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 drop-shadow-lg">{property.titulo}</h1>
                            <p className="text-white/80 font-bold flex items-center gap-2 text-lg">
                                <MapPin size={20} className="text-[#6b0000]" /> {property.ubicacion}
                            </p>
                        </div>
                        <div className="text-left md:text-right bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 shadow-2xl">
                            <p className="text-white/60 text-xs font-black uppercase tracking-widest m-0 leading-none mb-2">Precio de Venta</p>
                            <p className="text-4xl font-black text-white m-0 tracking-tighter">${property.precio?.toLocaleString()}</p>
                            <p className="text-white/40 text-[10px] font-extrabold uppercase mt-1">Sujeto a cambios • USD</p>
                        </div>
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-4 mt-6 overflow-x-auto pb-4 no-scrollbar justify-center">
                    {dummyImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(idx)}
                            className={`flex-shrink-0 w-32 h-24 rounded-2xl overflow-hidden border-4 transition-all ${activeImage === idx ? 'border-[#6b0000] shadow-xl scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* Main Details */}
                <div className="lg:col-span-2 space-y-16">

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center justify-center text-center">
                            <Bed size={24} className="text-[#6b0000] mb-3" />
                            <p className="text-xl font-black text-gray-900 m-0">{property.habitaciones || 3}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest m-0">Habitaciones</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center justify-center text-center">
                            <Bath size={24} className="text-[#6b0000] mb-3" />
                            <p className="text-xl font-black text-gray-900 m-0">{property.banos || 2}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest m-0">Baños</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center justify-center text-center">
                            <Layout size={24} className="text-[#6b0000] mb-3" />
                            <p className="text-xl font-black text-gray-900 m-0">{property.tamano_m2 || 120}m²</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest m-0">Área Total</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center justify-center text-center">
                            <CheckCircle2 size={24} className="text-green-500 mb-3" />
                            <p className="text-xl font-black text-gray-900 m-0">Activo</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest m-0">Estado</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tighter">Sobre esta propiedad</h2>
                        <div className="prose prose-lg text-gray-500 font-medium leading-relaxed max-w-none">
                            {property.descripcion || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                        </div>
                    </div>

                    {/* Features (Dummy Icons) */}
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tighter">Amenidades</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {['Seguridad 24/7', 'Piscina Olímpica', 'Gimnasio Equipado', 'Zonas Verdes', 'Parqueadero Privado', 'Vista Panorámica'].map(feature => (
                                <div key={feature} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-[#6b0000]/5 p-2 rounded-lg text-[#6b0000]">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Sticky Panel */}
                <div className="lg:col-span-1">
                    <div className="sticky top-40 space-y-8">

                        {/* Action Card */}
                        <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <Shield className="text-[#6b0000]/10" size={100} />
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tighter relative z-10">Agenda tu próxima visita</h3>

                            <div className="space-y-4 relative z-10">
                                <button
                                    onClick={() => setShowAppointmentModal(true)}
                                    className="w-full bg-[#6b0000] text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:bg-[#4d0000] focus:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    <Calendar size={20} /> Agendar Presencial
                                </button>
                                <button
                                    onClick={() => setShowAppointmentModal(true)}
                                    className="w-full bg-white text-[#6b0000] border-2 border-[#6b0000] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-[#6b0000] hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg"
                                >
                                    <Video size={20} /> Reunión Virtual
                                </button>
                                <div className="flex gap-4 pt-4">
                                    <button className="flex-1 bg-gray-50 text-gray-900 py-4 rounded-[1.5rem] font-bold text-xs uppercase hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                                        <ShoppingCart size={16} /> Carrito
                                    </button>
                                    <button className="flex-1 bg-gray-900 text-white py-4 rounded-[1.5rem] font-bold text-xs uppercase hover:bg-black transition-all flex items-center justify-center gap-2">
                                        <CreditCard size={16} /> Apartar
                                    </button>
                                </div>
                            </div>

                            <p className="text-center text-[10px] text-gray-400 font-bold uppercase mt-8 tracking-widest">Pago 100% seguro garantizado</p>
                        </div>

                        {/* Agent Card */}
                        <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100 relative group overflow-hidden">
                            <div className="flex items-center gap-6 relative z-10">
                                <img
                                    className="h-20 w-20 rounded-[1.5rem] object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform"
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=AgenteElite"
                                    alt="Agent"
                                />
                                <div>
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Agente Asignado</p>
                                    <h4 className="text-xl font-black text-gray-900 tracking-tighter">Alexander Wright</h4>
                                    <div className="flex text-yellow-500 mt-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                                <button className="bg-white p-3 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#6b0000] shadow-sm transition-colors">
                                    <Phone size={18} />
                                </button>
                                <button className="bg-white p-3 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#6b0000] shadow-sm transition-colors">
                                    <Mail size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointment Modal */}
            {showAppointmentModal && (
                <AppointmentModal
                    property={property}
                    onClose={() => setShowAppointmentModal(false)}
                    onSubmit={handleSchedule}
                />
            )}
        </div>
    );
}
