import { useEffect, useState } from "react";
import { X, Save, Building, MapPin, DollarSign, Ruler, Tag, Info, FileText, Layout } from "lucide-react";
import "../../../styles/theme.css";

export default function PropiedadForm({ propiedad, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        ubicacion: "",
        tipo: "casa",
        estado: "disponible",
        tamano_m2: "",
        imagen: "",
        categoria_ciudad: "terciaria",
        nitInmobiliaria: "900123456-1",
    });

    useEffect(() => {
        if (propiedad) {
            setForm({
                ...propiedad,
                categoria_ciudad: propiedad.categoria_ciudad || "terciaria"
            });
        }
    }, [propiedad]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="p-4 animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="h5 fw-bold mb-1" style={{ color: "var(--primary-vino)" }}>
                        {propiedad ? "Editar Propiedad Existente" : "Registrar Nueva Propiedad"}
                    </h3>
                    <p className="text-muted small mb-0">Gestiona los detalles técnicos y comerciales del inmueble.</p>
                </div>
                <button onClick={onCancel} className="btn btn-link text-muted p-0">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-12 mt-2">
                    <h4 className="form-section-title">Información Principal</h4>
                </div>

                <div className="col-12">
                    <label className="form-label">Título de la Propiedad</label>
                    <div className="position-relative">
                        <Building size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
                        <input
                            name="titulo"
                            placeholder="Ej: Penthouse de Lujo en El Poblado"
                            value={form.titulo}
                            onChange={handleChange}
                            className="premium-input ps-5"
                            required
                        />
                    </div>
                </div>

                <div className="col-12">
                    <label className="form-label">Descripción Detallada</label>
                    <div className="position-relative">
                        <FileText size={18} className="position-absolute" style={{ left: "1rem", top: "1.2rem", color: "var(--text-muted)", opacity: 0.6 }} />
                        <textarea
                            name="descripcion"
                            placeholder="Describe las características principales, amenidades y entorno..."
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={3}
                            className="premium-input ps-5"
                        />
                    </div>
                </div>

                <div className="col-12 mt-2">
                    <h4 className="form-section-title mt-2">Especificaciones Técnicas</h4>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Precio de Venta (COP)</label>
                    <div className="position-relative">
                        <DollarSign size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--primary-vino)", opacity: 0.8 }} />
                        <input
                            name="precio"
                            type="number"
                            placeholder="0.00"
                            value={form.precio}
                            onChange={handleChange}
                            className="premium-input ps-5 fw-bold"
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Superficie Total (m²)</label>
                    <div className="position-relative">
                        <Ruler size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
                        <input
                            name="tamano_m2"
                            type="number"
                            placeholder="Ej: 85"
                            value={form.tamano_m2}
                            onChange={handleChange}
                            className="premium-input ps-5"
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Ubicación (Dirección/Barrio)</label>
                    <div className="position-relative">
                        <MapPin size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
                        <input
                            name="ubicacion"
                            placeholder="Ej: Calle 10 # 43-20, El Poblado"
                            value={form.ubicacion}
                            onChange={handleChange}
                            className="premium-input ps-5"
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Categoría de Ciudad (Para precios de cita)</label>
                    <div className="position-relative">
                        <MapPin size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6, zIndex: 1 }} />
                        <select
                            name="categoria_ciudad"
                            value={form.categoria_ciudad}
                            onChange={handleChange}
                            className="premium-input premium-select ps-5"
                            required
                        >
                            <option value="principal">Principal (Bogotá, Medellín, Cali, B/quilla)</option>
                            <option value="secundaria">Secundaria (Cartagena, Bucaramanga, Pereira, S. Marta)</option>
                            <option value="terciaria">Terciaria (Resto del país)</option>
                        </select>
                    </div>
                </div>

                <div className="col-12">
                    <label className="form-label">URL de Imagen (o Rastro en storage)</label>
                    <div className="position-relative">
                        <Layout size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6 }} />
                        <input
                            name="imagen"
                            placeholder="Ej: propiedades/casa1.jpg"
                            value={form.imagen || ""}
                            onChange={handleChange}
                            className="premium-input ps-5"
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Tipo de Inmueble</label>
                    <div className="position-relative">
                        <Layout size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6, zIndex: 1 }} />
                        <select
                            name="tipo"
                            value={form.tipo}
                            onChange={handleChange}
                            className="premium-input premium-select ps-5"
                        >
                            <option value="casa">Casa</option>
                            <option value="apartamento">Apartamento</option>
                            <option value="oficina">Oficina</option>
                            <option value="local">Local Comercial</option>
                            <option value="lote">Lote / Terreno</option>
                            <option value="finca">Finca</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Estado de Publicación</label>
                    <div className="position-relative">
                        <Tag size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", opacity: 0.6, zIndex: 1 }} />
                        <select
                            name="estado"
                            value={form.estado}
                            onChange={handleChange}
                            className="premium-input premium-select ps-5"
                        >
                            <option value="disponible">Disponible</option>
                            <option value="reservada">Reservada</option>
                            <option value="vendida">Vendida</option>
                            <option value="arrendada">Arrendada</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 mt-5 py-3 border-top d-flex gap-3">
                    <button type="button" onClick={onCancel} className="btn border-0 fw-bold text-muted px-4">
                        Descartar
                    </button>
                    <button type="submit" className="premium-btn shadow-sm flex-grow-1 justify-content-center">
                        <Save size={18} />
                        <span>{propiedad ? "Guardar Cambios" : "Publicar Propiedad"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
