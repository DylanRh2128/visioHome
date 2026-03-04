import { useState } from "react";
import { X, Save, FileText, User, DollarSign, Calendar, Landmark, Hash, CreditCard, CheckCircle } from "lucide-react";
import "../../styles/theme.css";

export default function FacturasForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({
        docUsuario: "",
        idPropiedad: "",
        monto: "",
        metodoPago: "transferencia",
        estado: "pendiente",
        referencia: "",
    });

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
                        <Landmark size={24} color="var(--accent-red)" />
                        Emitir Factura
                    </h3>
                    <p className="text-muted small m-0 mt-1">Registra una nueva transacción financiera.</p>
                </div>
                <button onClick={onCancel} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "0.5rem" }}>
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-12">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Documento del Cliente</label>
                    <div className="position-relative">
                        <User size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        <input
                            name="docUsuario"
                            placeholder="Ingrese CC o NIT..."
                            value={form.docUsuario}
                            onChange={handleChange}
                            className="premium-input ps-5"
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">ID Inmueble</label>
                    <div className="position-relative">
                        <Hash size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        <input
                            name="idPropiedad"
                            placeholder="Número de ID..."
                            value={form.idPropiedad}
                            onChange={handleChange}
                            className="premium-input ps-5"
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Monto (COP)</label>
                    <div className="position-relative">
                        <DollarSign size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#4ade80" }} />
                        <input
                            name="monto"
                            type="number"
                            placeholder="Total a pagar..."
                            value={form.monto}
                            onChange={handleChange}
                            className="premium-input ps-5"
                            style={{ fontWeight: "700" }}
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Método de Pago</label>
                    <div className="position-relative">
                        <CreditCard size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        <select
                            name="metodoPago"
                            value={form.metodoPago}
                            onChange={handleChange}
                            className="premium-input ps-5"
                            style={{ appearance: "none" }}
                        >
                            <option value="transferencia">Transferencia</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="text-muted small mb-1 uppercase font-weight-bold">Referencia (Opcional)</label>
                    <div className="position-relative">
                        <FileText size={18} className="position-absolute" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        <input
                            name="referencia"
                            placeholder="FAC-000-000"
                            value={form.referencia}
                            onChange={handleChange}
                            className="premium-input ps-5"
                        />
                    </div>
                </div>

                <div className="col-12 mt-4 pt-2">
                    <button
                        type="submit"
                        className="premium-btn w-100 d-flex align-items-center justify-content-center gap-3"
                    >
                        <Save size={20} />
                        Confirmar y Emitir Factura
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
