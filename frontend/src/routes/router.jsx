import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/admin/Dashboard";
import Profile from "../pages/admin/Profile";
import Administracion from "../pages/admin/Administracion";

import UsersPage from "../pages/users/UsersPage";
import AgentesPage from "../pages/agentes/AgentesPage";
import FacturasPage from "../pages/facturas/FacturasPage";
import PropiedadPage from "../pages/propiedades/PropiedadPage";

// CRUD Pages
import UsuariosCrud from "../pages/admin/UsuariosCrud";
import FacturasCrud from "../pages/admin/FacturasCrud";
import AgentesCrud from "../pages/admin/AgentesCrud";
import PropiedadesCrud from "../pages/admin/PropiedadesCrud";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/layout/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Register />,
  },

  // 🔒 ZONA ADMIN (CON LAYOUT)
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "perfil",
        element: <Profile />,
      },
      {
        path: "usuarios",
        element: <UsersPage />,
      },
      {
        path: "agentes",
        element: <AgentesPage />, // ✅ AQUÍ VA
      },
      {
        path: "facturas",
        element: <FacturasPage />,
      },
      {
        path: "propiedades",
        element: <PropiedadPage />,
      },
      {
        path: "ventas",
        element: <div>Ventas</div>,
      },
      {
        path: "administracion",
        element: <Administracion />,
      },
      // 🔥 CRUD ROUTES
      {
        path: "crud/usuarios",
        element: <UsuariosCrud />,
      },
      {
        path: "crud/facturas",
        element: <FacturasPage />,
      },
      {
        path: "crud/agentes",
        element: <AgentesCrud />,
      },
      {
        path: "crud/propiedades",
        element: <PropiedadPage />,
      },
      // Placeholder for 3D view
      {
        path: "3d",
        element: <div style={{ padding: "20px" }}>Vista 3D - Próximamente</div>,
      },
    ],
  },
]);

export default router;
