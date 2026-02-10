import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { LogIn, Mail, Lock, Shield } from "lucide-react";
import "../../styles/theme.css";

export default function Login() {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/login", form);
      login(res.data.usuario, res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card animate-fade-in" style={{ width: "100%", maxWidth: "400px" }}>
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
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#fff", margin: 0 }}>VisioHome</h2>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Bienvenido de nuevo</p>
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ position: "relative" }}>
            <Mail size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              name="correo"
              type="email"
              placeholder="Correo electrónico"
              className="premium-input"
              style={{ paddingLeft: "3rem" }}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ position: "relative" }}>
            <Lock size={20} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              className="premium-input"
              style={{ paddingLeft: "3rem" }}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="premium-btn" disabled={loading} style={{ width: "100%", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            {loading ? "Entrando..." : (
              <>
                <LogIn size={20} />
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem" }}>
          <span style={{ color: "var(--text-muted)" }}>¿No tienes cuenta? </span>
          <Link to="/registro" style={{ color: "#ff4d4d", fontWeight: "600", textDecoration: "none" }}>Regístrate</Link>
        </div>
      </div>
    </div>
  );
}
