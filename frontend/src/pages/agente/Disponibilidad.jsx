import { useState, useEffect } from "react";
import { Calendar, Trash2, Plus, Clock, AlertCircle } from "lucide-react";
import disponibilidadService from "../../services/disponibilidadService";
import Swal from "sweetalert2";
import "../../styles/theme.css";

const DIA_MAP = {
    "Lunes": 1, "Martes": 2, "Miércoles": 3, "Jueves": 4,
    "Viernes": 5, "Sábado": 6, "Domingo": 7
};

const REV_DIA_MAP = {
    1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves",
    5: "Viernes", 6: "Sábado", 7: "Domingo"
};

export default function AgenteDisponibilidad() {
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        dia_semana: "Lunes",
        hora_inicio: "08:00",
        hora_fin: "17:00"
    });

    useEffect(() => {
        loadDisponibilidades();
    }, []);

    const loadDisponibilidades = async () => {
        try {
            setLoading(true);
            const data = await disponibilidadService.getMia();
            setDisponibilidades(data);
        } catch (error) {
            console.error("Error al cargar disponibilidades:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convertir día a entero para el backend
            const payload = {
                ...formData,
                dia_semana: DIA_MAP[formData.dia_semana]
            };

            await disponibilidadService.create(payload);
            Swal.fire("Éxito", "Horario agregado correctamente", "success");
            loadDisponibilidades();
        } catch (error) {
            Swal.fire("Error", error.message || "No se pudo agregar el horario", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar este horario?",
            text: "No podrás deshacer esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                // El ID en el backend es idDisponibilidad
                await disponibilidadService.delete(id);
                Swal.fire("Eliminado", "Horario eliminado correctamente", "success");
                loadDisponibilidades();
            } catch (error) {
                Swal.fire("Error", "No se pudo eliminar el horario", "error");
            }
        }
    };

    return (
        <div className="disponibilidad-page">
            <div className="crud-header">
                <h2>Gestión de Disponibilidad</h2>
                <p className="text-muted">Configura tus bloques de atención semanal (Máximo 5 días, 8h por día).</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                {/* Formulario */}
                <div className="glass-card" style={{ padding: '25px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Agregar Horario</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label className="mb-2 d-block small fw-bold text-muted">Día de la semana</label>
                            <select name="dia_semana" value={formData.dia_semana} onChange={handleChange} className="premium-input">
                                {Object.keys(DIA_MAP).map(day => <option key={day}>{day}</option>)}
                            </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label className="mb-2 d-block small fw-bold text-muted">Hora Inicio</label>
                            <input type="time" name="hora_inicio" value={formData.hora_inicio} onChange={handleChange} className="premium-input" />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="mb-2 d-block small fw-bold text-muted">Hora Fin</label>
                            <input type="time" name="hora_fin" value={formData.hora_fin} onChange={handleChange} className="premium-input" />
                        </div>
                        <button type="submit" className="premium-btn w-100 py-3">
                            <Plus size={18} /> Guardar Bloque
                        </button>
                    </form>
                </div>

                {/* Lista */}
                <div className="glass-card" style={{ padding: '25px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Tus Bloques Actuales</h3>
                    {loading ? (
                        <p className="text-center py-5">Cargando...</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th className="text-muted small">Día</th>
                                        <th className="text-muted small">Horario</th>
                                        <th className="text-muted small text-center">Estado</th>
                                        <th className="text-muted small text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {disponibilidades.map((d) => (
                                        <tr key={d.idDisponibilidad}>
                                            <td className="fw-bold">{REV_DIA_MAP[d.dia_semana]}</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <Clock size={14} className="text-muted" />
                                                    {d.hora_inicio.substring(0, 5)} - {d.hora_fin.substring(0, 5)}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">Vigente</span>
                                            </td>
                                            <td className="text-end">
                                                <button
                                                    onClick={() => handleDelete(d.idDisponibilidad)}
                                                    className="btn btn-outline-danger btn-sm border-0 rounded-circle p-2"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {disponibilidades.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-5 text-muted">
                                                <Calendar size={40} className="mb-3 opacity-25 d-block mx-auto" />
                                                No tienes horarios configurados.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
