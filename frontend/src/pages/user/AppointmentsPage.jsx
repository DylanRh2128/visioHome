import React, { useState, useEffect } from "react";
import {
    Calendar,
    Clock,
    Video,
    Users,
    ChevronRight,
    MapPin,
    XCircle,
    CheckCircle2,
    AlertCircle,
    Building2,
    CalendarDays
} from "lucide-react";
import appointmentService from "../../services/appointmentService";

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            const data = await appointmentService.getMyAppointments();
            setAppointments(data || []);
        } catch (error) {
            console.error("Error loading appointments:", error);
            // Fallback for demo/empty state
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas cancelar esta cita?")) return;
        try {
            await appointmentService.cancel(id);
            loadAppointments();
        } catch (error) {
            alert("No se pudo cancelar la cita.");
        }
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            pendiente: "bg-yellow-50 text-yellow-600 border-yellow-100",
            confirmada: "bg-green-50 text-green-600 border-green-100",
            cancelada: "bg-red-50 text-red-600 border-red-100",
            completada: "bg-gray-50 text-gray-600 border-gray-100"
        };
        return (
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.pendiente}`}>
                {status || 'pendiente'}
            </span>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-gray-900 mb-2">Mi Agenda de Citas</h1>
                    <p className="text-lg text-gray-500 font-medium">Gestiona tus visitas presenciales y reuniones virtuales.</p>
                </div>
                <div className="bg-white px-6 py-4 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
                    <CalendarDays className="text-[#6b0000]" size={24} />
                    <div>
                        <p className="text-2xl font-black text-gray-900 m-0">{appointments.length}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest m-0">Total programadas</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-gray-50 h-32 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-gray-50 shadow-inner">
                    <div className="bg-gray-50 p-10 rounded-full mb-8">
                        <Calendar className="text-gray-200" size={64} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">No tienes citas programadas</h2>
                    <p className="text-gray-400 font-bold mb-8">Comienza a explorar propiedades y agenda tu primera visita.</p>
                    <Link to="/user/properties" className="btn-premium bg-[#6b0000] text-white px-10 py-4 rounded-xl font-bold no-underline hover:bg-[#4d0000] transition-all">
                        Explorar Catálogo
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {appointments.map(apt => (
                        <div key={apt.idCita} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-center gap-8">

                            {/* Date Badge */}
                            <div className="bg-gray-50 p-6 rounded-[2rem] min-w-[120px] text-center border border-gray-100 group-hover:bg-[#6b0000] group-hover:text-white transition-colors">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{new Date(apt.fecha).toLocaleDateString('es-ES', { month: 'short' })}</p>
                                <p className="text-4xl font-black leading-none">{new Date(apt.fecha).getDate()}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-2">{new Date(apt.fecha).getFullYear()}</p>
                            </div>

                            {/* Info */}
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-3">
                                    <StatusBadge status={apt.estado} />
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        {apt.tipo === 'virtual' ? <Video size={14} /> : <Users size={14} />} {apt.tipo}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight flex items-center gap-2">
                                    <Building2 size={20} className="text-[#6b0000]/40" /> {apt.propiedad?.titulo || "Propiedad VisioHome"}
                                </h3>
                                <p className="text-gray-400 text-sm font-bold flex items-center gap-2 m-0">
                                    <MapPin size={16} /> {apt.propiedad?.ubicacion || "Ubicación pendiente"}
                                </p>
                            </div>

                            {/* Agent Info (If exists) */}
                            <div className="hidden lg:flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 min-w-[200px]">
                                {apt.agente ? (
                                    <>
                                        <img className="h-10 w-10 rounded-xl" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.agente.nombre}`} alt="Agent" />
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest m-0">Asesor Asignado</p>
                                            <p className="text-sm font-black text-gray-900 m-0">{apt.agente.nombre}</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <AlertCircle size={20} />
                                        <p className="text-[10px] font-black uppercase tracking-widest m-0 line-clamp-1">Agente por asignar</p>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <Link to={`/user/properties/${apt.idPropiedad}`} className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#6b0000] hover:bg-white shadow-sm transition-all border border-transparent hover:border-gray-100">
                                    <ChevronRight size={20} />
                                </Link>
                                {apt.estado !== 'cancelada' && (
                                    <button
                                        onClick={() => handleCancel(apt.idCita)}
                                        className="p-4 bg-red-50 rounded-2xl text-red-400 hover:text-white hover:bg-red-500 shadow-sm transition-all border border-transparent"
                                        title="Cancelar Cita"
                                    >
                                        <XCircle size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
