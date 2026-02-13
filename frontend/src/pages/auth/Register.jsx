import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/auth.service";
import { UserPlus, Mail, Lock, User, Key, Shield, Phone, MapPin, AlertCircle, ArrowLeft } from "lucide-react";
import {
  validatePassword,
  validateEmail,
  validatePhone,
  validateDocUsuario
} from "../../utils/validation";

export default function Register() {
  const [form, setForm] = useState({
    docUsuario: "",
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    password: "",
    idRol: 2,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    if (!form.password) return 0;
    let strength = 0;
    if (form.password.length >= 6) strength++;
    if (/[A-Z]/.test(form.password)) strength++;
    if (/[a-z]/.test(form.password)) strength++;
    if (/[0-9]/.test(form.password)) strength++;
    if (/[@$!%*?&]/.test(form.password)) strength++;
    return strength;
  }, [form.password]);

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "#ff4d4d";
    if (passwordStrength <= 4) return "#ffc107";
    return "#4caf50";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    const sanitized = value.trim();

    switch (name) {
      case "nombre":
        if (value !== value.trim()) {
          error = "El nombre no debe tener espacios extras al inicio o final.";
        } else if (sanitized.length < 3) {
          error = "El nombre es muy corto.";
        }
        break;
      case "docUsuario":
        if (!validateDocUsuario(sanitized)) error = "Documento inválido (máx 20 chars, sin espacios).";
        break;
      case "correo":
        if (!validateEmail(sanitized)) error = "Email inválido o contiene espacios.";
        break;
      case "telefono":
        if (!validatePhone(sanitized)) error = "El teléfono debe tener 10 dígitos.";
        break;
      case "password":
        if (!validatePassword(sanitized)) error = "La contraseña no cumple con los requisitos.";
        break;
      default:
        break;
    }

    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const hasErrors = Object.values(fieldErrors).some(err => err !== "");
    if (hasErrors) {
      setError("Por favor corrige los errores del formulario.");
      setLoading(false);
      return;
    }

    const sanitizedForm = {
      ...form,
      docUsuario: form.docUsuario.trim(),
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      telefono: form.telefono.trim(),
      direccion: form.direccion.trim(),
      password: form.password.trim()
    };

    try {
      await authService.register(sanitizedForm);
      alert("Registro exitoso. ¡Bienvenido a VisioHome!");
      navigate("/login");
    } catch (err) {
      if (err.errors) {
        setFieldErrors(prev => ({ ...prev, ...err.errors }));
        setError("Hay errores en los datos proporcionados.");
      } else {
        setError(err.message || "Error al registrar el usuario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-section d-flex align-items-center justify-content-center" style={{ minHeight: "90vh", padding: "4rem 1rem" }}>
      <div className="glass-card animate-fade-up" style={{ width: "100%", maxWidth: "800px", padding: "4rem" }}>

        <div className="text-center mb-5">
          <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ background: "rgba(255, 77, 77, 0.1)", color: "var(--accent-red)" }}>
            <UserPlus size={40} />
          </div>
          <h2 className="display-6 fw-bold text-white mb-2">Crea tu Cuenta</h2>
          <p className="text-white-50">Únete a la nueva era del real estate digital</p>
        </div>

        {error && (
          <div className="premium-card p-3 mb-5 d-flex align-items-center gap-2" style={{ background: "rgba(255, 77, 77, 0.1)", border: "1px solid rgba(255, 77, 77, 0.2)", color: "#ff4d4d", borderRadius: "10px" }}>
            <AlertCircle size={20} />
            <span className="small">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="row g-4 d-flex flex-wrap">

          <div className="col-12">
            <div className="position-relative">
              <User size={18} className="position-absolute" style={{ left: "1.2rem", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} />
              <input
                name="nombre"
                placeholder="Nombre completo"
                className={`premium-input glass-input ${fieldErrors.nombre ? 'border-danger' : ''}`}
                style={{ paddingLeft: "3.5rem" }}
                onChange={handleChange}
                value={form.nombre}
                required
              />
            </div>
            {fieldErrors.nombre && <small className="text-danger mt-1 d-block ms-2 small">{fieldErrors.nombre}</small>}
          </div>

          <div className="col-md-6">
            <div className="position-relative">
              <Key size={18} className="position-absolute" style={{ left: "1.2rem", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} />
              <input
                name="docUsuario"
                placeholder="Documento ID"
                className="premium-input glass-input"
                style={{ paddingLeft: "3.5rem" }}
                onChange={handleChange}
                value={form.docUsuario}
                required
              />
            </div>
            {fieldErrors.docUsuario && <small className="text-danger mt-1 d-block ms-2 small">{fieldErrors.docUsuario}</small>}
          </div>

          <div className="col-md-6">
            <div className="position-relative">
              <Mail size={18} className="position-absolute" style={{ left: "1.2rem", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} />
              <input
                name="correo"
                type="email"
                placeholder="Correo corporativo"
                className="premium-input glass-input"
                style={{ paddingLeft: "3.5rem" }}
                onChange={handleChange}
                value={form.correo}
                required
              />
            </div>
            {fieldErrors.correo && <small className="text-danger mt-1 d-block ms-2 small">{fieldErrors.correo}</small>}
          </div>

          <div className="col-md-6">
            <div className="position-relative">
              <Phone size={18} className="position-absolute" style={{ left: "1.2rem", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} />
              <input
                name="telefono"
                placeholder="Teléfono móvil"
                className="premium-input glass-input"
                style={{ paddingLeft: "3.5rem" }}
                onChange={handleChange}
                value={form.telefono}
                required
              />
            </div>
            {fieldErrors.telefono && <small className="text-danger mt-1 d-block ms-2 small">{fieldErrors.telefono}</small>}
          </div>

          <div className="col-md-6">
            <div className="position-relative">
              <MapPin size={18} className="position-absolute" style={{ left: "1.2rem", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} />
              <input
                name="direccion"
                placeholder="Dirección (Opcional)"
                className="premium-input glass-input"
                style={{ paddingLeft: "3.5rem" }}
                onChange={handleChange}
                value={form.direccion}
              />
            </div>
          </div>

          <div className="col-12 mt-5">
            <div className="position-relative">
              <Lock size={18} className="position-absolute" style={{ left: "1.2rem", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} />
              <input
                name="password"
                type="password"
                placeholder="Contraseña segura"
                className="premium-input glass-input"
                style={{ paddingLeft: "3.5rem" }}
                onChange={handleChange}
                value={form.password}
                required
              />
            </div>

            <div className="d-flex gap-1 mt-3">
              {[1, 2, 3, 4, 5].map(step => (
                <div
                  key={step}
                  style={{
                    height: "4px",
                    flex: 1,
                    borderRadius: "10px",
                    background: step <= passwordStrength ? getStrengthColor() : "rgba(255,255,255,0.1)",
                    transition: "var(--transition-smooth)"
                  }}
                />
              ))}
            </div>
            {fieldErrors.password && <small className="text-danger mt-1 d-block ms-2 small">{fieldErrors.password}</small>}
          </div>

          <div className="col-12 text-center mt-5">
            <button type="submit" className="premium-btn w-100 py-3 mt-3 shadow-lg" disabled={loading}>
              {loading ? "Creando Cuenta..." : (
                <>
                  <UserPlus size={20} />
                  <span>Registrarse Ahora</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-5">
          <div className="small mb-4">
            <span className="text-white-50">¿Ya eres parte de VisioHome? </span>
            <Link to="/login" className="fw-bold text-decoration-none" style={{ color: "var(--accent-red)" }}>Inicia Sesión</Link>
          </div>
          <Link to="/" className="text-white-50 text-decoration-none small d-flex align-items-center justify-content-center gap-2">
            <ArrowLeft size={14} /> Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
