 import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Box, BarChart3, Users, Building2, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
    const { user } = useAuth();

    if (user) {
        if (user.rol === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.rol === 'user') return <Navigate to="/user/dashboard" replace />;
        if (user.rol === 'agente') return <Navigate to="/agent/dashboard" replace />;
    }
    const benefits = [
        {
            title: "Visualización 3D Realista",
            description: "Permite a tus clientes recorrer propiedades desde cualquier lugar con tecnología inmersiva de última generación.",
            icon: <Box size={32} />
        },
        {
            title: "Gestión de Propiedades",
            description: "Control total sobre tu inventario, estados y documentación en una plataforma centralizada y segura.",
            icon: <Building2 size={32} />
        },
        {
            title: "Panel Administrativo",
            description: "Herramientas avanzadas para agentes y administradores con estadísticas en tiempo real y reportes detallados.",
            icon: <Users size={32} />
        },
        {
            title: "Seguimiento de Ventas",
            description: "Optimiza tu embudo de ventas y mantén un registro preciso de cada interacción con potenciales compradores.",
            icon: <BarChart3 size={32} />
        }
    ];

    return (
        <div className="animate-fade-up">
            <section className="hero-section">
                <div className="section-container">
                    <h1 className="section-title text-white" style={{ fontSize: "3.5rem" }}>
                        <span style={{ color: "var(--accent-red)" }}>VisioHome</span><br />
                        Nuevas Experiencias Digitales Inmobiliarias
                    </h1>
                    <p className="lead text-white-50 mb-5 mx-auto" style={{ maxWidth: "700px", fontSize: "1.25rem" }}>
                        La plataforma definitiva para inmobiliarias que buscan destacar con tecnología 3D, gestión eficiente y analítica avanzada.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/registro" className="premium-btn shadow-lg" style={{ padding: "15px 40px", fontSize: "1.1rem" }}>
                            Comenzar Ahora <ArrowRight size={20} />
                        </Link>
                        <Link to="/contact" className="premium-btn premium-btn-outline" style={{ padding: "15px 40px", fontSize: "1.1rem", border: "1px solid rgba(255,255,255,0.2)", color: "#fff !important" }}>
                            Saber Más
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-white" style={{ padding: "6rem 0" }}>
                <div className="section-container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Por qué elegir nuestra plataforma</h2>
                        <p className="text-muted">Innovación y elegancia integradas en cada detalle.</p>
                    </div>

                    <div className="grid-auto">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="premium-card text-center p-5">
                                <div className="mb-4 d-inline-block p-3 rounded-circle" style={{ background: "rgba(107, 0, 0, 0.05)", color: "var(--primary-vino)" }}>
                                    {benefit.icon}
                                </div>
                                <h3 className="h4 font-weight-bold mb-3">{benefit.title}</h3>
                                <p className="text-muted line-height-lg">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ background: "var(--bg-dark)", padding: "100px 0", color: "#fff" }}>
                <div className="section-container">
                    <div className="glass-card p-5 overflow-hidden position-relative">
                        <div className="position-absolute top-0 end-0 p-5 opacity-10">
                            <Building2 size={300} />
                        </div>
                        <div className="row align-items-center position-relative">
                            <div className="col-lg-8">
                                <h2 className="display-4 fw-bold mb-4">¿Listo para transformar tu inmobiliaria?</h2>
                                <p className="lead text-white-50 mb-5">Únete a cientos de empresas que ya están usando VisioHome para vender más rápido.</p>
                                <div className="d-flex gap-4">
                                    <div className="d-flex align-items-center gap-2 small"><CheckCircle color="var(--accent-red)" /> Soporte 24/7</div>
                                    <div className="d-flex align-items-center gap-2 small"><CheckCircle color="var(--accent-red)" /> Configuración Rápida</div>
                                </div>
                            </div>
                            <div className="col-lg-4 text-center mt-5 mt-lg-0">
                                <Link to="/registro" className="premium-btn text-uppercase px-5 py-3 ls-1">Solicitar Demo</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
