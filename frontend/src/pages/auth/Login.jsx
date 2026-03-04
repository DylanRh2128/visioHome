import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/auth.service";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { LogIn, Mail, Lock, Shield, AlertCircle, Clock, ArrowLeft } from "lucide-react";
import { validateNoInternalSpaces } from "../../utils/validation";

export default function Login() {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blockInfo, setBlockInfo] = useState(null);

  const navigate = useNavigate();
  const { login, user } = useAuth();

  /* ======================================================
     REDIRECCIÓN CONTROLADA (ANTI LOOP)
  ====================================================== */
  useEffect(() => {
    if (!user) return;

    if (user.idRol === 1) {
      navigate("/admin/dashboard", { replace: true });
    } else if (user.idRol === 2) {
      navigate("/user/dashboard", { replace: true });
    } else if (user.idRol === 3) {
      navigate("/agente/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setBlockInfo(null);
    setLoading(true);

    const sanitizedForm = {
      correo: form.correo.trim(),
      password: form.password.trim()
    };

    if (
      !validateNoInternalSpaces(sanitizedForm.correo) ||
      !validateNoInternalSpaces(sanitizedForm.password)
    ) {
      setError("El correo y la contraseña no pueden contener espacios.");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.login(
        sanitizedForm.correo,
        sanitizedForm.password
      );

      /* ===============================
         GUARDAR EN CONTEXTO
         (La redirección la hace el useEffect)
      =============================== */
      login(response.usuario, response.token);

    } catch (err) {
      if (err.intentosRestantes !== undefined) {
        setError(
          `Credenciales incorrectas. Te quedan ${err.intentosRestantes} intentos antes de bloquear la cuenta.`
        );
      } else if (err.bloqueadoHasta) {
        setBlockInfo({
          until: new Date(err.bloqueadoHasta).toLocaleString(),
          minutes: err.minutosRestantes
        });
        setError("Cuenta bloqueada temporalmente.");
      } else {
        setError(
          err?.response?.data?.message ||
          err.message ||
          "Error al intentar iniciar sesión."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="hero-section d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="glass-card animate-fade-up"
        style={{ width: "100%", maxWidth: "450px", padding: "3.5rem" }}
      >
        <div className="text-center mb-5">
          <div
            className="d-inline-flex p-3 rounded-circle mb-3"
            style={{
              background: "rgba(255, 77, 77, 0.1)",
              color: "var(--accent-red)"
            }}
          >
            <Shield size={40} />
          </div>
          <h2 className="display-6 fw-bold text-white mb-2">VisioHome</h2>
          <p className="text-white-50">Ingresa a tu ecosistema digital</p>
        </div>

        {error && (
          <div
            className="premium-card p-3 mb-4 d-flex align-items-center gap-3"
            style={{
              background: "rgba(255, 77, 77, 0.1)",
              border: "1px solid rgba(255, 77, 77, 0.2)",
              color: "#ff4d4d",
              borderRadius: "10px"
            }}
          >
            <AlertCircle size={20} />
            <span className="small">{error}</span>
          </div>
        )}

        {blockInfo && (
          <div
            className="premium-card p-3 mb-4"
            style={{
              background: "rgba(255, 193, 7, 0.1)",
              border: "1px solid rgba(255, 193, 7, 0.2)",
              color: "#ffc107",
              borderRadius: "10px"
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-2 small">
              <Clock size={16} />
              Acceso Restringido
            </div>
            <p className="small mb-0">
              Disponible en: <strong>{blockInfo.until}</strong>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <div className="position-relative">
            <Mail size={18} className="position-absolute"
              style={{ left: "1.2rem", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
            />
            <input
              name="correo"
              type="email"
              placeholder="Correo electrónico"
              className="premium-input glass-input"
              style={{ paddingLeft: "3.5rem" }}
              onChange={handleChange}
              value={form.correo}
              required
              autoComplete="email"
            />
          </div>

          <div className="position-relative">
            <Lock size={18} className="position-absolute"
              style={{ left: "1.2rem", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              className="premium-input glass-input"
              style={{ paddingLeft: "3.5rem" }}
              onChange={handleChange}
              value={form.password}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="premium-btn w-100 py-3 mt-3 shadow-lg"
            disabled={loading}
          >
            {loading ? "Verificando..." : (
              <>
                <LogIn size={20} />
                <span>Iniciar Sesión</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-5">
          <div className="small mb-4">
            <span className="text-white-50">¿No tienes cuenta? </span>
            <Link
              to="/registro"
              className="fw-bold text-decoration-none"
              style={{ color: "var(--accent-red)" }}
            >
              Regístrate
            </Link>
          </div>

          <Link
            to="/"
            className="text-white-50 text-decoration-none small d-flex align-items-center justify-content-center gap-2"
          >
            <ArrowLeft size={14} /> Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}