import { useNavigate } from "react-router-dom";

export default function Administracion() {
  const navigate = useNavigate();

  const handleChange = (e) => {
    navigate(`/admin/${e.target.value}`);
  };

  return (
    <div>
      <h1>Administración</h1>

      <label>
        Selecciona módulo:&nbsp;
        <select onChange={handleChange} defaultValue="">
          <option value="" disabled>-- Seleccionar --</option>
          <option value="usuarios">Usuarios</option>
          <option value="agentes">Agentes</option>
          <option value="facturas">Facturas</option>
          <option value="ventas">Ventas</option>
        </select>
      </label>

      <p style={{ marginTop: 20 }}>
        Usa el selector para navegar entre los módulos administrativos.
      </p>
    </div>
  );
}
