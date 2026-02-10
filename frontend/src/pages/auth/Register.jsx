import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { UserPlus, Mail, Lock, User, Key, Shield } from "lucide-react";
import "../../styles/theme.css";

export default function Register() {
  const [form, setForm] = useState({
    docUsuario: "",
    nombre: "",
    correo: "",
    password: "",
    idRol: 2,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/register", form);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      setError("Error al registrar el usuario. Asegúrate de que el correo y el documento no estén en uso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card animate-fade-in" style={{ width: "100%", maxWidth: "450px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex",
            padding: "1rem",
            background: "rgba(107, 0, 0, 0.2)",
            borderRadius: "50%",
            marginBottom: "1rem"
          }}>
            <Shield size={40} color="#ff4d4d" />
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#fff", margin: 0 }}>Crea tu Cuenta</h2>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Únete a VisioHome hoy mismo</p>
        </div>

        {error && (
          <div style={{
            background: "rgba(255, 77, 77, 0.1)",
            border: "1px solid rgba(255, 77, 77, 0.3)",
            color: "#ff4d4d",
            padding: "0.8rem",
            borderRadius: "10px",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ gridColumn: "span 2", position: "relative" }}>
            <User size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              name="nombre"
              placeholder="Nombre completo"
              className="premium-input"
              style={{ paddingLeft: "3rem" }}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ position: "relative" }}>
            <Key size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              name="docUsuario"
              placeholder="Documento ID"
              className="premium-input"
              style={{ paddingLeft: "3rem" }}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ position: "relative" }}>
            <Mail size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              name="correo"
              type="email"
              placeholder="Correo"
              className="premium-input"
              style={{ paddingLeft: "3rem" }}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ gridColumn: "span 2", position: "relative" }}>
            <Lock size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              name="password"
              type="password"
              placeholder="Establece una contraseña"
              className="premium-input"
              style={{ paddingLeft: "3rem" }}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="premium-btn" disabled={loading} style={{ gridColumn: "span 2", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            {loading ? "Registrando..." : (
              <>
                <UserPlus size={20} />
                <span>Registrarse</span>
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem" }}>
          <span style={{ color: "var(--text-muted)" }}>¿Ya tienes cuenta? </span>
          <Link to="/login" style={{ color: "#ff4d4d", fontWeight: "600", textDecoration: "none" }}>Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
}
