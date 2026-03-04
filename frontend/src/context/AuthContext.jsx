import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return null;
      const parsed = JSON.parse(savedUser);
      // Ensure role mapping exists even for reloads
      if (parsed && !parsed.rol && parsed.idRol) {
        parsed.rol = parsed.idRol === 1 ? 'admin' :
          parsed.idRol === 3 ? 'agente' : 'user';
      }
      return parsed;
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
        // Map idRol to rol if missing for compatibility
        if (parsedUser && !parsedUser.rol && parsedUser.idRol) {
          parsedUser.rol = parsedUser.idRol === 1 ? 'admin' :
            parsedUser.idRol === 3 ? 'agente' : 'user';
        }

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
    // Mapping role for frontend use
    const userRole = userData.rol || (userData.idRol === 1 ? 'admin' :
      userData.idRol === 3 ? 'agente' : 'user');

    const mappedUser = { ...userData, rol: userRole };

    // Persistencia segura
    localStorage.setItem("user", JSON.stringify(mappedUser));
    localStorage.setItem("token", token);

    // Actualización de estado
    setUser(mappedUser);
  };

  const updateUser = (newUserData) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, ...newUserData };

      // Re-apply role mapping if idRol changed or rol is missing
      if (!updatedUser.rol || newUserData.idRol) {
        updatedUser.rol = updatedUser.idRol === 1 ? 'admin' :
          updatedUser.idRol === 3 ? 'agente' : 'user';
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const logout = () => {
    // LIMPIEZA TOTAL
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("idRol");
    setUser(null);

    // Opcional: Redirigir al login para asegurar limpieza de otros estados de React
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
