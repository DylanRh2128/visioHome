import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
    User,
    Mail,
    Phone,
    Lock,
    Camera,
    History,
    CreditCard,
    ShieldCheck,
    Save,
    ChevronRight,
    MapPin,
    Star
} from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('info');
    const [formData, setFormData] = useState({
        nombre: user?.nombre || "",
        correo: user?.correo || "",
        telefono: user?.telefono || "",
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-16 items-start">

                {/* Left: Sidebar Tabs */}
                <div className="w-full md:w-80 space-y-4">
                    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl flex flex-col items-center text-center mb-8">
                        <div className="relative mb-6">
                            <img
                                src={user?.avatar ? `http://127.0.0.1:8000/${user.avatar}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.nombre}`}
                                className="w-32 h-32 rounded-[2rem] object-cover shadow-2xl border-4 border-[#6b0000]/10"
                                alt="Profile"
                            />
                            <button className="absolute bottom-0 right-0 p-2.5 bg-[#6b0000] text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                                <Camera size={18} />
                            </button>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-1">{user?.nombre}</h2>
                        <span className="bg-gray-50 text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-gray-100">Cliente Prime</span>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-3 space-y-1">
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all ${activeTab === 'info' ? 'bg-[#6b0000] text-white shadow-xl translate-x-1' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <User size={20} />
                                <span className="font-black text-sm uppercase tracking-widest">Información</span>
                            </div>
                            <ChevronRight size={16} className={activeTab === 'info' ? 'opacity-100' : 'opacity-20'} />
                        </button>
                        <button
                            onClick={() => setActiveTab('payments')}
                            className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all ${activeTab === 'payments' ? 'bg-[#6b0000] text-white shadow-xl translate-x-1' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <CreditCard size={20} />
                                <span className="font-black text-sm uppercase tracking-widest">Mis Pagos</span>
                            </div>
                            <ChevronRight size={16} className={activeTab === 'payments' ? 'opacity-100' : 'opacity-20'} />
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all ${activeTab === 'security' ? 'bg-[#6b0000] text-white shadow-xl translate-x-1' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <ShieldCheck size={20} />
                                <span className="font-black text-sm uppercase tracking-widest">Seguridad</span>
                            </div>
                            <ChevronRight size={16} className={activeTab === 'security' ? 'opacity-100' : 'opacity-20'} />
                        </button>
                    </div>
                </div>

                {/* Right: Content Area */}
                <div className="flex-grow max-w-3xl">
                    {activeTab === 'info' && (
                        <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl animate-fade-in relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                                <User size={200} />
                            </div>

                            <div className="mb-12 relative z-10">
                                <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Información Personal</h3>
                                <p className="text-gray-400 font-bold mb-0">Actualiza tus datos para mejorar tu experiencia inmobiliaria.</p>
                            </div>

                            <form className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Nombre Completo</label>
                                        <div className="relative">
                                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                                            <input
                                                type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#6b0000] focus:bg-white rounded-[1.5rem] py-4 pl-16 pr-6 text-sm font-bold outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Correo Electrónico</label>
                                        <div className="relative">
                                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                                            <input
                                                type="email" name="correo" value={formData.correo} onChange={handleChange}
                                                className="w-full bg-gray-50/50 border-2 border-transparent text-gray-400 rounded-[1.5rem] py-4 pl-16 pr-6 text-sm font-bold outline-none cursor-not-allowed"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Teléfono de Contacto</label>
                                        <div className="relative">
                                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                                            <input
                                                type="text" name="telefono" value={formData.telefono} onChange={handleChange}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#6b0000] focus:bg-white rounded-[1.5rem] py-4 pl-16 pr-6 text-sm font-bold outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Región / Ciudad</label>
                                        <div className="relative text-left">
                                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                                            <span className="w-full bg-gray-50 border-2 border-transparent rounded-[1.5rem] py-4 pl-16 pr-6 text-sm font-bold block">Bogotá D.C., Colombia</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 mt-8 border-t border-gray-100 flex justify-end">
                                    <button type="button" className="bg-[#6b0000] text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:bg-[#4d0000] transition-all flex items-center gap-3">
                                        <Save size={20} /> Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'payments' && (
                        <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl animate-fade-in">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-12">Historial de Transacciones</h3>
                            <div className="space-y-6">
                                {[1].map(i => (
                                    <div key={i} className="flex items-center justify-between p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="bg-white p-4 rounded-2xl shadow-sm text-[#6b0000]">
                                                <History size={24} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 mb-1">Apartado: Penthouse El Poblado</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">12 de Octubre, 2025 • #TX8822</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-green-500 m-0 leading-none">$45,000</p>
                                            <span className="text-[9px] font-black uppercase bg-green-100 text-green-600 px-3 py-1 rounded-full mt-2 inline-block tracking-widest border border-green-200">Completado</span>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-12 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                                    <p className="text-sm text-gray-400 font-bold m-0">No hay pagos pendientes por procesar.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl animate-fade-in">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-12">Configuración de Seguridad</h3>
                            <div className="space-y-8">
                                <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100 flex items-center gap-6">
                                    <div className="bg-blue-600 text-white p-4 rounded-[1.5rem] shadow-xl">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-gray-900 mb-1 tracking-tight">Tu cuenta está protegida</p>
                                        <p className="text-xs font-bold text-gray-500 leading-relaxed">Hemos verificado tu identidad correctamente. Te recomendamos cambiar tu contraseña periódicamente.</p>
                                    </div>
                                </div>

                                <button className="w-full flex items-center justify-between p-8 bg-gray-50 rounded-[2.5rem] hover:bg-gray-100 transition-all group">
                                    <div className="flex items-center gap-6">
                                        <Lock className="text-gray-400" size={24} />
                                        <span className="font-black text-sm uppercase tracking-[0.2em]">Cambiar Contraseña</span>
                                    </div>
                                    <ChevronRight className="text-gray-300 group-hover:text-gray-900" size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
