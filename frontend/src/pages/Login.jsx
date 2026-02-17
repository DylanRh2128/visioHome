import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();   // 🔑
  const { login } = useAuth();      // 🔑

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post("/login", form);

      console.log("Login exitoso:", res.data);

      // 🔥 ESTO ES LO IMPORTANTE
      login(res.data.usuario);      // guarda sesión
      navigate("/dashboard");       // redirige

    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="correo"
          placeholder="Correo"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
