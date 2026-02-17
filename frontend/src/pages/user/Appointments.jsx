import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, CheckCircle, Info, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const Appointments = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const idPropiedad = searchParams.get("idPropiedad");

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [property, setProperty] = useState(null);

    useEffect(() => {
        if (idPropiedad) {
            axios.get(`http://127.0.0.1:8000/api/propiedades/${idPropiedad}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            }).then(res => setProperty(res.data)).catch(err => console.error(err));
        }
    }, [idPropiedad]);

    const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

    const handleSchedule = async (e) => {
        e.preventDefault();
        if (!date || !time) return;

        setLoading(true);
        try {
            await axios.post("http://127.0.0.1:8000/api/citas", {
                idPropiedad: idPropiedad,
                fecha: `${date} ${time}:00`,
                estado: 'pendiente',
                canal: 'web'
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            Swal.fire({
                icon: "success",
                title: "Solicitud Enviada",
                text: "Tu cita ha sido solicitada. El agente se pondrá en contacto pronto.",
                confirmButtonColor: "#6b0000",
            }).then(() => navigate("/user/dashboard"));
        } catch (error) {
            Swal.fire("Error", "No se pudo agendar la cita. Inténtalo más tarde.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5 mt-4" style={{ maxWidth: '1000px' }}>
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="row g-0">
                    <div className="col-md-5 text-white p-5 d-flex flex-column justify-content-between position-relative" style={{ backgroundColor: '#6b0000' }}>
                        <div className="position-relative z-1">
                            <div className="bg-white bg-opacity-25 rounded-4 p-3 d-inline-block mb-4">
                                <CalendarIcon size={32} />
                            </div>
                            <h1 className="fw-bold display-5 mb-4">Agenda tu Visita</h1>
                            <p className="lead opacity-75 mb-5">Conoce cada rincón de tu próximo hogar con el acompañamiento de nuestros expertos.</p>

                            {property && (
                                <div className="card bg-white bg-opacity-10 border-0 p-3 rounded-4 backdrop-blur">
                                    <h6 className="fw-bold text-uppercase small tracking-wider mb-1 opacity-50">Propiedad Seleccionada</h6>
                                    <h5 className="mb-1 text-truncate">{property.titulo}</h5>
                                    <p className="small mb-0 opacity-75 text-truncate"><MapPin size={12} /> {property.ubicacion}</p>
                                </div>
                            )}
                        </div>
                        <div className="small opacity-50 mt-5">VisioHome Experience © {new Date().getFullYear()}</div>
                    </div>

                    <div className="col-md-7 p-5 bg-white">
                        <h3 className="fw-bold text-dark mb-4">Selecciona tu horario</h3>
                        <form onSubmit={handleSchedule}>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-muted small text-uppercase">Fecha de la cita</label>
                                <input
                                    type="date"
                                    className="form-control form-control-lg rounded-3 border-light bg-light shadow-none"
                                    min={new Date().toISOString().split("T")[0]}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-5">
                                <label className="form-label fw-bold text-muted small text-uppercase mb-3">Horas disponibles</label>
                                <div className="row g-2">
                                    {availableTimes.map(t => (
                                        <div key={t} className="col-4">
                                            <button
                                                type="button"
                                                className={`btn w-100 py-2 rounded-3 fw-bold transition-all ${time === t ? 'btn-danger border-0 shadow-sm' : 'btn-outline-light text-dark border'}`}
                                                style={time === t ? { backgroundColor: '#6b0000' } : {}}
                                                onClick={() => setTime(t)}
                                            >
                                                {t}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-3">
                                <button
                                    type="submit"
                                    className="btn btn-danger btn-lg w-100 py-3 rounded-pill fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2"
                                    style={{ backgroundColor: '#6b0000' }}
                                    disabled={loading || !date || !time}
                                >
                                    {loading ? <span className="spinner-border spinner-border-sm"></span> : <>Confirmar Cita <CheckCircle size={20} /></>}
                                </button>
                                <p className="text-center text-muted small mt-3">Recibirás un correo de confirmación con los datos del agente.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
