import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Box, Building2, Users, BarChart3, ArrowRight } from "lucide-react";

export default function Home() {
    const { user, loading } = useAuth();

    if (loading) return null;

    // 🔥 Redirección limpia sin useEffect
    if (user) {
        if (user.rol === "admin") return <Navigate to="/admin/dashboard" replace />;
        if (user.rol === "user") return <Navigate to="/user/dashboard" replace />;
        if (user.rol === "agente") return <Navigate to="/agente/dashboard" replace />;
    }

    const benefits = [
        {
            title: "Visualización 3D Realista",
            description: "Permite recorrer propiedades con tecnología inmersiva.",
            icon: <Box size={32} />
        },
        {
            title: "Gestión de Propiedades",
            description: "Control total sobre inventario y estados.",
            icon: <Building2 size={32} />
        },
        {
            title: "Panel Administrativo",
            description: "Herramientas avanzadas con estadísticas.",
            icon: <Users size={32} />
        },
        {
            title: "Seguimiento de Ventas",
            description: "Optimiza tu embudo comercial.",
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

                    <p className="lead text-white-50 mb-5 mx-auto"
                        style={{ maxWidth: "700px", fontSize: "1.25rem" }}>
                        Plataforma inmobiliaria con tecnología 3D y gestión avanzada.
                    </p>

                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/registro" className="premium-btn shadow-lg">
                            Comenzar Ahora <ArrowRight size={20} />
                        </Link>

                        <Link to="/contact" className="premium-btn premium-btn-outline">
                            Saber Más
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-white" style={{ padding: "6rem 0" }}>
                <div className="section-container">
                    <div className="grid-auto">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="premium-card text-center p-5">
                                {benefit.icon}
                                <h3 className="h4 mb-3">{benefit.title}</h3>
                                <p className="text-muted">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}