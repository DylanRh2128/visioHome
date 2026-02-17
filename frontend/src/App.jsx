import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardUser from "./pages/user/DashboardUser";
import Properties from "./pages/user/Properties";
import PropertyDetail from "./pages/user/properties/PropertyDetail";
import Cart from "./pages/user/Cart";
import Appointments from "./pages/user/Appointments";
import Checkout from "./pages/user/Checkout";
import UserLayout from "./layouts/UserLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
