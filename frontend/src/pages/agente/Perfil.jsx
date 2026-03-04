import { useState, useEffect } from "react";
import { User, Mail, Phone, Lock, Save, Camera, MapPin, Award } from "lucide-react";
import api from "../../services/api";
import Swal from "sweetalert2";
import "../../styles/theme.css";

export default function AgentePerfil() {
    const [agente, setAgente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        direccion: "",
        especialidad: "",
        biografia: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get("/agente/me");
            const data = response.data;
            setAgente(data);
            setFormData({
                nombre: data.nombre || "",
                telefono: data.telefono || "",
                direccion: data.direccion || "",
                especialidad: data.agente_profile?.especialidad || "",
                biografia: data.agente_profile?.biografia || "",
                carrera: data.agente_profile?.carrera || "",
                experiencia_anos: data.agente_profile?.experiencia_anos || "0",
                password: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Error al cargar perfil:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password && formData.password !== formData.confirmPassword) {
            return Swal.fire("Error", "Las contraseñas no coinciden", "error");
        }

        try {
            await api.put(`/agentes/${agente.docUsuario}`, formData);
            Swal.fire("Éxito", "Perfil actualizado correctamente", "success");
            loadProfile();
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar el perfil", "error");
        }
    };

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando perfil...</div>;
    if (!agente) return <div style={{ padding: '50px', textAlign: 'center' }}>No se pudo cargar la información del perfil.</div>;

    return (
        <div className="perfil-page">
            <div className="crud-header">
                <h2>Mi Perfil Profesional</h2>
                <p className="text-muted">Gestiona tu información pública y credenciales de acceso.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                {/* Lado Izquierdo: Info Rápida */}
                <div className="glass-card" style={{ padding: '25px', textAlign: 'center' }}>
                    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px' }}>
                        <img
                            src={agente?.avatar_url || (agente?.avatar ? `http://127.0.0.1:8000/storage/${agente.avatar}` : "https://via.placeholder.com/150")}
                            alt="Avatar"
                            style={{ width: '100%', height: '100%', borderRadius: '60px', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        />
                        <button style={{ position: 'absolute', bottom: '0', right: '0', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}>
                            <Camera size={16} />
                        </button>
                    </div>
                    <h3 style={{ margin: '0 0 5px' }}>{agente?.nombre}</h3>
                    <p className="text-muted" style={{ fontSize: '14px', marginBottom: '15px' }}>{agente?.agente_profile?.especialidad || "Agente Inmobiliario"}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                            <Mail size={14} className="text-muted" /> {agente?.correo}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                            <MapPin size={14} className="text-muted" /> {agente?.direccion || "No especificada"}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                            <Award size={14} className="text-muted" /> {agente?.agente_profile?.experiencia_anos || 0} años de experiencia
                        </div>
                    </div>
                </div>

                {/* Lado Derecho: Formulario */}
                <div className="glass-card" style={{ padding: '30px' }}>
                    <form onSubmit={handleSubmit}>
                        <h4 style={{ marginBottom: '20px' }}>Datos Personales</h4>
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input name="nombre" value={formData.nombre} onChange={handleChange} className="premium-input" />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input name="telefono" value={formData.telefono} onChange={handleChange} className="premium-input" />
                            </div>
                            <div className="form-group">
                                <label>Especialidad</label>
                                <input name="especialidad" value={formData.especialidad} onChange={handleChange} className="premium-input" />
                            </div>
                            <div className="form-group">
                                <label>Dirección</label>
                                <input name="direccion" value={formData.direccion} onChange={handleChange} className="premium-input" />
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label>Biografía Profesional</label>
                                <textarea name="biografia" value={formData.biografia} onChange={handleChange} className="premium-input" style={{ height: '100px' }} />
                            </div>
                        </div>

                        <h4 style={{ margin: '30px 0 20px' }}>Cambiar Contraseña</h4>
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div className="form-group">
                                <label>Nueva Contraseña</label>
                                <input name="password" type="password" value={formData.password} onChange={handleChange} className="premium-input" placeholder="Min. 8 caracteres" />
                            </div>
                            <div className="form-group">
                                <label>Confirmar Contraseña</label>
                                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="premium-input" />
                            </div>
                        </div>

                        <div style={{ marginTop: '30px', textAlign: 'right' }}>
                            <button type="submit" className="premium-btn">
                                <Save size={18} /> Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
