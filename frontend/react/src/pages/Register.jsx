import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    docUsuario: "",
    nombre: "",
    correo: "",
    password: "",
    idRol: 2,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/register", form);
      alert("Usuario registrado");
    } catch (err) {
      alert("Error al registrar");
    }
  };

  return (
    <div>
      <h2>Registro</h2>

      <form onSubmit={handleSubmit}>
        <input name="docUsuario" placeholder="Documento" onChange={handleChange} />
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="correo" placeholder="Correo" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <button>Registrarse</button>
      </form>
    </div>
  );
}
