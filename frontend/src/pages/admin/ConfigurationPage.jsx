import React, { useState, useEffect } from "react";
import { Settings, Save, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import api from "../../services/api";

const ConfigurationPage = () => {
    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchConfigs();
    }, []);

    const fetchConfigs = async () => {
        try {
            setLoading(true);
            const response = await api.get("/admin/configurations");
            setConfigs(response.data);
        } catch (error) {
            console.error("Error fetching configs:", error);
            setMessage({ type: "error", text: "No se pudieron cargar las configuraciones." });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (key, value) => {
        try {
            setSaving(true);
            await api.put(`/admin/configurations/${key}`, { value });
            setMessage({ type: "success", text: "Configuración actualizada correctamente." });
            fetchConfigs();
        } catch (error) {
            console.error("Error updating config:", error);
            setMessage({ type: "error", text: "Error al guardar el cambio." });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <RefreshCw className="animate-spin text-[#6b0000]" size={40} />
        </div>
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#6b0000] text-white rounded-2xl shadow-lg">
                    <Settings size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Configuración del Sistema</h1>
                    <p className="text-gray-500 font-medium">Ajusta los parámetros globales de la plataforma.</p>
                </div>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-fade-in ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                    }`}>
                    {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="font-bold">{message.text}</span>
                </div>
            )}

            <div className="grid gap-6">
                {configs.map((config) => (
                    <div key={config.key} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-grow">
                                <h3 className="text-lg font-black text-gray-900 mb-1 uppercase tracking-wider">
                                    {config.key.replaceAll('_', ' ')}
                                </h3>
                                <p className="text-gray-400 text-sm font-bold">
                                    Define el valor para {config.key === 'cita_precio_base' ? 'el costo de agendar una cita/reserva.' : 'este parámetro.'}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    {config.key.includes('precio') && (
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                    )}
                                    <input
                                        type="text"
                                        defaultValue={config.value}
                                        onBlur={(e) => {
                                            if (e.target.value !== config.value) {
                                                handleUpdate(config.key, e.target.value);
                                            }
                                        }}
                                        className={`bg-gray-50 border border-gray-100 rounded-2xl p-4 font-black text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6b0000]/20 focus:border-[#6b0000] transition-all ${config.key.includes('precio') ? 'pl-8' : ''
                                            }`}
                                    />
                                </div>
                                <button
                                    disabled={saving}
                                    className="p-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    <Save size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {configs.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                        <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-400 font-black uppercase tracking-widest">No hay configuraciones definidas.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfigurationPage;
