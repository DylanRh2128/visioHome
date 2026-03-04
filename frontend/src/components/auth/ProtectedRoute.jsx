import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * ProtectedRoute - Validación estricta por roles
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 🔥 Esperar validación completa
  if (loading) return null;

  // 1️⃣ No hay usuario
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2️⃣ Rol no permitido
  if (allowedRoles && !allowedRoles.includes(user.rol)) {

    console.warn(
      `Acceso denegado: rol '${user.rol}' intentó acceder a ruta de '${allowedRoles}'`
    );

    // 🔥 Redirección correcta según rol REAL
    if (user.rol === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (user.rol === "user") {
      return <Navigate to="/user/dashboard" replace />;
    }

    if (user.rol === "agente") {
      return <Navigate to="/agente/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  // 3️⃣ Acceso permitido
  return children;
}