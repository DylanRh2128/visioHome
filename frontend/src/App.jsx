import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardUser from "./pages/user/DashboardUser";
import Properties from "./pages/user/Properties";
import PropertyDetail from "./pages/user/properties/PropertyDetail";
import Appointments from "./pages/user/Appointments";
import Favorites from "./pages/user/Favorites";
import UserLayout from "./layouts/UserLayout";
import AgenteLayout from "./layouts/AgenteLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Admin Pages
import DashboardAdmin from "./pages/admin/Dashboard";
import UsuariosCrud from "./pages/admin/UsuariosCrud";
import AgentesPage from "./pages/admin/agentes/AgentesPage";
import PropiedadesCrud from "./pages/admin/PropiedadesCrud";

// Agente Pages
import AgenteDashboard from "./pages/agente/Dashboard";
import AgenteDisponibilidad from "./pages/agente/Disponibilidad";
import AgenteCitas from "./pages/agente/Citas";
import AgentePerfil from "./pages/agente/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Protected */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>

        {/* Admin Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="users" element={<UsuariosCrud />} />
          <Route path="agentes" element={<AgentesPage />} />
          <Route path="properties" element={<PropiedadesCrud />} />
        </Route>

        {/* Agent Protected */}
        <Route
          path="/agente"
          element={
            <ProtectedRoute allowedRoles={['agente']}>
              <AgenteLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AgenteDashboard />} />
          <Route path="appointments" element={<AgenteCitas />} />
          <Route path="disponibilidad" element={<AgenteDisponibilidad />} />
          <Route path="profile" element={<AgentePerfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
