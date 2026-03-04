import React, { useState } from "react";
import { X, Calendar, Clock, Video, Users, CheckCircle, Info, ShieldCheck } from "lucide-react";

export default function AppointmentModal({ property, onClose, onSubmit }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fecha: "",
        tipo: "presencial",
        notas: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (step === 1 && !formData.fecha) return;
        setStep(step + 1);
    };

    const handleLocalSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setStep(3); // Success state
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-fade-in">

                {/* Header */}
                <div className="p-10 pb-4 flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">Agendar Visita</h2>
                        <p className="text-gray-400 font-bold text-sm truncate max-w-[300px]">{property.titulo}</p>
                    </div>
                    <button onClick={onClose} className="p-3 text-gray-400 hover:text-gray-900 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-10 mb-8">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#6b0000] transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
                    </div>
                </div>

                <div className="px-10 pb-10">
                    {step === 1 && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Selecciona la Fecha</label>
                                <div className="relative">
                                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                                    <input
                                        type="date"
                                        name="fecha"
                                        min={new Date().toISOString().split('T')[0]}
                                        value={formData.fecha}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#6b0000] focus:bg-white rounded-2xl py-4 pl-16 pr-6 text-sm font-bold outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Tipo de Reunión</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, tipo: 'presencial' })}
                                        className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${formData.tipo === 'presencial' ? 'border-[#6b0000] bg-[#6b0000]/5 text-[#6b0000]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                                    >
                                        <Users size={32} />
                                        <span className="font-black text-xs uppercase tracking-widest">Presencial</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, tipo: 'virtual' })}
                                        className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${formData.tipo === 'virtual' ? 'border-[#6b0000] bg-[#6b0000]/5 text-[#6b0000]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                                    >
                                        <Video size={32} />
                                        <span className="font-black text-xs uppercase tracking-widest">Virtual</span>
                                    </button>
                                </div>
                            </div>

                            <button
                                disabled={!formData.fecha}
                                onClick={handleNext}
                                className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Siguiente Paso
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleLocalSubmit} className="space-y-8 animate-fade-in">
                            <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                                    <Info size={18} className="text-[#6b0000]" /> Resumen de solicitud
                                </h4>
                                <ul className="space-y-3 m-0 p-0 list-none">
                                    <li className="flex justify-between text-sm font-bold">
                                        <span className="text-gray-400">Fecha:</span>
                                        <span className="text-gray-900">{formData.fecha}</span>
                                    </li>
                                    <li className="flex justify-between text-sm font-bold">
                                        <span className="text-gray-400">Modalidad:</span>
                                        <span className="text-gray-900 uppercase tracking-widest text-[10px] bg-white px-3 py-1 rounded-full shadow-sm">{formData.tipo}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Notas Adicionales (Opcional)</label>
                                <textarea
                                    name="notas"
                                    value={formData.notas}
                                    onChange={handleChange}
                                    placeholder="Cuéntanos qué te gustaría saber específicamente..."
                                    rows={4}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#6b0000] focus:bg-white rounded-3xl py-5 px-6 text-sm font-bold outline-none transition-all"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button type="button" onClick={() => setStep(1)} className="flex-1 bg-white text-gray-400 py-5 font-black text-sm uppercase tracking-widest hover:text-gray-900 transition-colors">
                                    Atrás
                                </button>
                                <button type="submit" className="flex-[2] bg-[#6b0000] text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:bg-[#4d0000] transition-all">
                                    Confirmar Cita
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center py-10 animate-fade-in flex flex-col items-center">
                            <div className="bg-green-50 text-green-500 p-8 rounded-full mb-8">
                                <CheckCircle size={64} />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-4">¡Cita Solicitada con Éxito!</h3>
                            <p className="text-gray-500 font-bold mb-10 max-w-xs mx-auto">Nuestro equipo revisará tu solicitud y te asignará un agente inmobiliario en las próximas horas.</p>

                            <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 mb-8 w-full flex items-center gap-4">
                                <ShieldCheck size={24} className="text-[#6b0000]" />
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest m-0 text-left">Puedes gestionar tus citas desde <br /><span className="text-gray-900">Mi Perfil {'>'} Citas</span></p>
                            </div>

                            <button onClick={onClose} className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:bg-black transition-all">
                                Finalizar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
