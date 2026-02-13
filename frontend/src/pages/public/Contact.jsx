import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Building2, User } from "lucide-react";
import api from "../../services/api";

export default function Contact() {
    const [inmobiliaria, setInmobiliaria] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        mensaje: ""
    });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                // Intentar obtener la primera inmobiliaria
                const res = await api.get("/inmobiliarias");
                if (res.data && res.data.length > 0) {
                    setInmobiliaria(res.data[0]);
                }
            } catch (err) {
                console.error("No se pudo cargar la info de la inmobiliaria", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);

        // Simulación de envío (o endpoint real si existiera)
        setTimeout(() => {
            setSending(false);
            setStatus("success");
            setFormData({ nombre: "", correo: "", mensaje: "" });
        }, 1500);
    };

    return (
        <div className="contact-container animate-fade-in" style={{ padding: "8rem 5% 5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "1rem" }}>Contáctanos</h1>
                <p style={{ opacity: 0.6, maxWidth: "600px", margin: "0 auto" }}>
                    ¿Tienes preguntas? Estamos aquí para ayudarte a encontrar tu próximo hogar o potenciar tu negocio.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", maxWidth: "1200px", margin: "0 auto" }}>

                {/* Info Column */}
                <div>
                    <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "2rem" }}>Información de Contacto</h2>

                    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {loading ? (
                            <p>Cargando información...</p>
                        ) : inmobiliaria ? (
                            <>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                                    <Building2 size={24} color="var(--accent-red)" style={{ marginTop: "4px" }} />
                                    <div>
                                        <strong style={{ display: "block", fontSize: "1.1rem", marginBottom: "0.3rem" }}>{inmobiliaria.nombre || "VisioHome Inmobiliaria"}</strong>
                                        <span style={{ opacity: 0.6, fontSize: "0.9rem" }}>NIT: {inmobiliaria.nit || "900.000.000-0"}</span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <MapPin size={24} color="var(--accent-red)" />
                                    <span style={{ opacity: 0.8 }}>{inmobiliaria.direccion || "Calle Principal #123, Ciudad"}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <Phone size={24} color="var(--accent-red)" />
                                    <span style={{ opacity: 0.8 }}>{inmobiliaria.telefono || "+57 300 000 0000"}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <Mail size={24} color="var(--accent-red)" />
                                    <span style={{ opacity: 0.8 }}>{inmobiliaria.correo || "info@visiohome.com"}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                                    <User size={24} color="var(--accent-red)" style={{ marginTop: "4px" }} />
                                    <div>
                                        <strong style={{ display: "block", fontSize: "1.1rem", marginBottom: "0.3rem" }}>Agente Principal VisioHome</strong>
                                        <span style={{ opacity: 0.6, fontSize: "0.9rem" }}>Atención personalizada</span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <MapPin size={24} color="var(--accent-red)" />
                                    <span style={{ opacity: 0.8 }}>Sede Central, Edificio Visio</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <Phone size={24} color="var(--accent-red)" />
                                    <span style={{ opacity: 0.8 }}>+57 311 222 3333</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <Mail size={24} color="var(--accent-red)" />
                                    <span style={{ opacity: 0.8 }}>contacto@visiohome.com</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Form Column */}
                <div className="glass-panel">
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>Envíanos un mensaje</h2>

                    {status === "success" && (
                        <div style={{ background: "rgba(76, 175, 80, 0.1)", border: "1px solid rgba(76, 175, 80, 0.3)", color: "#81c784", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem", textAlign: "center" }}>
                            ¡Mensaje enviado con éxito! Te contactaremos pronto.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ color: "#fff", opacity: 0.8, fontSize: "0.9rem" }}>Nombre</label>
                            <input
                                name="nombre"
                                className="premium-input"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                                placeholder="Tu nombre completo"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ color: "#fff", opacity: 0.8, fontSize: "0.9rem" }}>Correo Electrónico</label>
                            <input
                                name="correo"
                                type="email"
                                className="premium-input"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                                placeholder="correo@ejemplo.com"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ color: "#fff", opacity: 0.8, fontSize: "0.9rem" }}>Mensaje</label>
                            <textarea
                                name="mensaje"
                                className="premium-input"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", minHeight: "150px", resize: "vertical" }}
                                placeholder="¿En qué podemos ayudarte?"
                                value={formData.mensaje}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="premium-btn" disabled={sending} style={{ width: "100%", padding: "12px", fontSize: "1rem", marginTop: "1rem" }}>
                            {sending ? "Enviando..." : (
                                <>
                                    <span>Enviar Mensaje</span>
                                    <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
