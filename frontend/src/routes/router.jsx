import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts (Eagerly loaded for faster shell)
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AgenteLayout from "../layouts/AgenteLayout";

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
const ConfigurationPage = lazy(() => import("../pages/admin/ConfigurationPage"));

// User
const UserDashboard = lazy(() => import("../pages/user/DashboardUser"));
const UserProperties = lazy(() => import("../pages/user/Properties"));
const UserPropertyDetail = lazy(() => import("../pages/user/properties/PropertyDetail"));
const UserAppointments = lazy(() => import("../pages/user/appointments/AppointmentsPage"));
const UserProfile = lazy(() => import("../pages/user/Profile"));
const User3D = lazy(() => import("../pages/user/threeD/ThreeDExplorer"));

// Agente
const AgenteDashboard = lazy(() => import("../pages/agente/Dashboard"));
const AgenteCitas = lazy(() => import("../pages/agente/Citas"));
const AgenteDisponibilidad = lazy(() => import("../pages/agente/Disponibilidad"));
const AgentePerfil = lazy(() => import("../pages/agente/Perfil"));

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

      // 👥 USUARIOS
      {
        path: "usuarios",
        element: Load(UsersPage), // CRUD principal
      },
      {
        path: "usuarios/stats",
        element: Load(UserStats), // Estadísticas separadas
      },

      // 🤝 AGENTES
      {
        path: "agentes",
        element: Load(AgentesPage),
      },

      // 🧾 FACTURAS
      {
        path: "facturas",
        element: Load(FacturasPage),
      },

      // 🏠 PROPIEDADES
      {
        path: "propiedades",
        element: Load(PropiedadPage),
      },

      // 💰 VENTAS
      {
        path: "ventas",
        element: Load(VentasPage),
      },

      {
        path: "administracion",
        element: Load(Administracion),
      },
      {
        path: "configuracion",
        element: Load(ConfigurationPage),
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

  // 🤝 ZONA AGENTE
  {
    path: "/agente",
    element: (
      <ProtectedRoute allowedRoles={['agente']}>
        <AgenteLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: Load(AgenteDashboard),
      },
      {
        path: "appointments",
        element: Load(AgenteCitas),
      },
      {
        path: "disponibilidad",
        element: Load(AgenteDisponibilidad),
      },
      {
        path: "profile",
        element: Load(AgentePerfil),
      }
    ]
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
]);

export default router;
