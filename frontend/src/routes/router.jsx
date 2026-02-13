import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/public/Home";
import Contact from "../pages/public/Contact";

import PublicLayout from "../layouts/PublicLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import Profile from "../pages/admin/Profile";
import Administracion from "../pages/admin/Administracion";

import UsersPage from "../pages/admin/users/UsersPage";
import UserStats from "../pages/admin/users/UserStats";
import AgentesPage from "../pages/admin/agentes/AgentesPage";
import FacturasPage from "../pages/admin/facturas/FacturasPage";
import PropiedadPage from "../pages/admin/propiedades/PropiedadPage";
import VentasPage from "../pages/admin/ventas/VentasPage";

import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../pages/user/Dashboard";
import UserProperties from "../pages/user/PropertyBrowser";
import UserPropertyDetail from "../pages/user/PropertyDetails";
import UserAppointments from "../pages/user/AppointmentsPage";
import UserCart from "../pages/user/CartPage";
import UserProfile from "../pages/user/ProfilePage";
import User3D from "../pages/user/ThreeDExplorer";

const router = createBrowserRouter([
  // 🌍 ZONA PÚBLICA
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registro",
        element: <Register />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ]
  },

  // 👤 ZONA USUARIO (CLIENTE)
  {
    path: "/user",
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "properties",
        element: <UserProperties />,
      },
      {
        path: "properties/:id",
        element: <UserPropertyDetail />,
      },
      {
        path: "cart",
        element: <UserCart />,
      },
      {
        path: "appointments",
        element: <UserAppointments />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "3d",
        element: <User3D />,
      }
    ]
  },

  // 🔒 ZONA ADMIN (CON LAYOUT)
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "usuarios",
        element: <UserStats />,
      },
      {
        path: "usuarios-crud",
        element: <UsersPage />,
      },
      {
        path: "agentes",
        element: <AgentesPage />,
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
        element: <VentasPage />,
      },
      {
        path: "administracion",
        element: <Administracion />,
      },
      {
        path: "3d",
        element: <div style={{ padding: "20px" }}>Vista 3D - Próximamente</div>,
      },
      {
        path: "*",
        element: <Navigate to="dashboard" replace />,
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
]);

export default router;
