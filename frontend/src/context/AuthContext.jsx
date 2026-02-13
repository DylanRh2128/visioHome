import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.clear();
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validación de integridad al iniciar
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (!parsedUser || !parsedUser.rol) {
          throw new Error("Invalid user data");
        }
        setUser(parsedUser);
      } catch (e) {
        console.error("Integrity check failed, clearing session");
        logout();
      }
    } else if (!token || !savedUser) {
      // Si falta uno de los dos, limpiamos por seguridad
      if (token || savedUser) logout();
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    // LIMPIEZA ATÓMICA ANTES DE NUEVO LOGIN
    localStorage.clear();

    // Persistencia segura
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    // Actualización de estado
    setUser(userData);
  };

  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // LIMPIEZA TOTAL
    localStorage.clear();
    setUser(null);
    // Forzar recarga si es necesario para limpiar estados de otros contextos
    // window.location.href = "/login"; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
