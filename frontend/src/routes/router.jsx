import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts (Eagerly loaded for faster shell)
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// 💤 Lazy Loading Pages
// Auth
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

// Public
const Home = lazy(() => import("../pages/public/Home"));
const Contact = lazy(() => import("../pages/public/Contact"));

// Admin
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
// const Profile = lazy(() => import("../pages/admin/Profile")); // Conflict with local var if not careful, assuming unique names
const AdminProfile = lazy(() => import("../pages/admin/Profile"));
const Administracion = lazy(() => import("../pages/admin/Administracion"));
const UsersPage = lazy(() => import("../pages/admin/users/UsersPage"));
const UserStats = lazy(() => import("../pages/admin/users/UserStats"));
const AgentesPage = lazy(() => import("../pages/admin/agentes/AgentesPage"));
const FacturasPage = lazy(() => import("../pages/admin/facturas/FacturasPage"));
const PropiedadPage = lazy(() => import("../pages/admin/propiedades/PropiedadPage"));
const VentasPage = lazy(() => import("../pages/admin/ventas/VentasPage"));

// User
const UserDashboard = lazy(() => import("../pages/user/DashboardUser"));
const UserProperties = lazy(() => import("../pages/user/properties/PropertyList"));
const UserPropertyDetail = lazy(() => import("../pages/user/properties/PropertyDetail"));
const UserAppointments = lazy(() => import("../pages/user/appointments/AppointmentsPage"));
const UserCart = lazy(() => import("../pages/user/cart/CartPage"));
const UserProfile = lazy(() => import("../pages/user/profile/ProfilePage"));
const User3D = lazy(() => import("../pages/user/threeD/ThreeDExplorer"));

// 🌀 Loading Spinner Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#6b0000]"></div>
  </div>
);

// Helper to wrap components
const Load = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  // 🌍 ZONA PÚBLICA
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: Load(Home),
      },
      {
        path: "login",
        element: Load(Login),
      },
      {
        path: "registro",
        element: Load(Register),
      },
      {
        path: "contact",
        element: Load(Contact),
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
        element: Load(UserDashboard),
      },
      {
        path: "properties",
        element: Load(UserProperties),
      },
      {
        path: "properties/:id",
        element: Load(UserPropertyDetail),
      },
      {
        path: "cart",
        element: Load(UserCart),
      },
      {
        path: "appointments",
        element: Load(UserAppointments),
      },
      {
        path: "profile",
        element: Load(UserProfile),
      },
      {
        path: "3d",
        element: Load(User3D),
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
        element: Load(Dashboard),
      },
      {
        path: "profile",
        element: Load(AdminProfile),
      },
      {
        path: "usuarios",
        element: Load(UserStats),
      },
      {
        path: "usuarios-crud",
        element: Load(UsersPage),
      },
      {
        path: "agentes",
        element: Load(AgentesPage),
      },
      {
        path: "facturas",
        element: Load(FacturasPage),
      },
      {
        path: "propiedades",
        element: Load(PropiedadPage),
      },
      {
        path: "ventas",
        element: Load(VentasPage),
      },
      {
        path: "administracion",
        element: Load(Administracion),
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
