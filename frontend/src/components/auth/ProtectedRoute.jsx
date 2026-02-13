import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * ProtectedRoute - Validación estricta por roles
 * @param {Array} allowedRoles - Roles permitidos para esta ruta
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // 1. No hay usuario -> Al login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Hay usuario pero el rol no está permitido
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    console.warn(`Acceso denegado: El usuario con rol '${user.rol}' intentó acceder a una ruta de '${allowedRoles}'`);

    // Redirección inteligente basada en el rol actual para evitar bucles o pantallas en blanco
    if (user.rol === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.rol === 'user') {
      return <Navigate to="/user/dashboard" replace />;
    } else if (user.rol === 'agente') {
      return <Navigate to="/agent/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // 3. Acceso permitido
  return children;
}
