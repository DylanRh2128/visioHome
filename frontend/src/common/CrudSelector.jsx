import { useNavigate, useLocation } from "react-router-dom";

export default function CrudSelector() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value) navigate(value);
  };

  return (
    <select
      value={location.pathname}
      onChange={handleChange}
      style={styles.select}
    >
      <option value="">Administración</option>
      <option value="/admin/usuarios">Usuarios</option>
      <option value="/admin/propiedades">Propiedades</option>
      <option value="/admin/agentes">Agentes</option>
      <option value="/admin/facturas">Facturas</option>
    </select>
  );
}

const styles = {
  select: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    cursor: "pointer",
  },
};
