import { useEffect, useState } from "react";
import { X, Save, Building, MapPin, DollarSign, Maximize, Ruler, Tag, Info } from "lucide-react";
import "../../styles/theme.css";

export default function PropiedadForm({ propiedad, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        ubicacion: "",
        tipo: "casa",
        estado: "disponible",
        tamano_m2: "",
        nitInmobiliaria: "900123456-1", // default valid NIT from seed
    });

    useEffect(() => {
        if (propiedad) {
            setForm(propiedad);
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
        <div style={{ padding: "1.5rem" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="m-0 font-weight-bold" style={{ color: "#fff", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <Building size={24} color="var(--accent-red)" />
                        {propiedad ? "Editar Propiedad" : "Nueva Propiedad"}
                    </h3>
                    <p className="text-muted small m-0 mt-1">Actualiza los detalles del inmueble en el catálogo.</p>
                </div>
                <button onClick={onCancel} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "0.5rem" }}>
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-12">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Título de la Propiedad</label>
                    <div className="position-relative">
                        <Building size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        <input
                            name="titulo"
                            placeholder="Ej: Penthouse Moderno con Vista al Mar..."
                            value={form.titulo}
                            onChange={handleChange}
                            className="premium-input ps-5"
                            required
                        />
                    </div>
                </div>

                <div className="col-12">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Descripción Corta</label>
                    <div className="position-relative">
                        <Info size={18} className="position-absolute" style={{ left: "1rem", top: "1.2rem", color: "var(--text-muted)" }} />
                        <textarea
                            name="descripcion"
                            placeholder="Describe brevemente las características..."
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={2}
                            className="premium-input ps-5"
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Precio (COP)</label>
                    <div className="position-relative">
                        <DollarSign size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#4ade80" }} />
                        <input
                            name="precio"
                            type="number"
                            placeholder="Monto total..."
                            value={form.precio}
                            onChange={handleChange}
                            className="premium-input ps-5"
                            style={{ fontWeight: "700" }}
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="text-muted small mb-2 uppercase font-weight-bold">Área Total (m²)</label>
                    <div className="position-relative">
                        <Ruler size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        <input
                            name="tamano_m2"
                            type="number"
                            placeholder="Ej: 150"
                            value={form.tamano_m2}
                            onChange={handleChange}
                            className="premium-input ps-5"
                        />
                    </div>
                </div>

                <div className="col-12">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Ubicación / Dirección</label>
                    <div className="position-relative">
                        <MapPin size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        <input
                            name="ubicacion"
                            placeholder="Ej: Avenida Siempre Viva 123..."
                            value={form.ubicacion}
                            onChange={handleChange}
                            className="premium-input ps-5"
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Tipo</label>
                    <select
                        name="tipo"
                        value={form.tipo}
                        onChange={handleChange}
                        className="premium-input"
                    >
                        <option value="casa">Casa</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="oficina">Oficina</option>
                        <option value="local">Local</option>
                        <option value="lote">Lote</option>
                        <option value="finca">Finca</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Estado</label>
                    <select
                        name="estado"
                        value={form.estado}
                        onChange={handleChange}
                        className="premium-input"
                    >
                        <option value="disponible">Disponible</option>
                        <option value="reservada">Reservada</option>
                        <option value="vendida">Vendida</option>
                        <option value="arrendada">Arrendada</option>
                    </select>
                </div>

                <div className="col-12 mt-4 pt-2">
                    <button
                        type="submit"
                        className="premium-btn w-100 d-flex align-items-center justify-content-center gap-3"
                    >
                        <Save size={20} />
                        {propiedad ? "Actualizar Propiedad" : "Registrar Propiedad"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="premium-btn premium-btn-secondary w-100 mt-2"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
