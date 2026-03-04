import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import usuarioService from "../../services/usuarioService";
import { Save, User, Mail, Phone, MapPin, Shield, Camera, Edit2, X, CheckCircle, Lock } from "lucide-react";
import "../../styles/theme.css";

export default function Profile() {
  const { user: authUser, updateUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    password: "",
    password_confirmation: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (authUser) {
      loadUserProfile();
    }
  }, [authUser]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const data = await usuarioService.getProfile();
      setUser(data);
      setFormData({
        nombre: data.nombre || "",
        telefono: data.telefono || "",
        direccion: data.direccion || "",
        password: "",
        password_confirmation: "",
      });
      // Usar avatar_url si viene del backend, o construirla manualmente
      if (data.avatar_url) {
        setPreviewUrl(data.avatar_url);
      } else if (data.avatar) {
        setPreviewUrl(`http://127.0.0.1:8000/storage/${data.avatar}`);
      } else {
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      setErrorMsg("No se pudo cargar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validación básica en frontend
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Formato no válido. Usa JPG, PNG, GIF o WebP.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setErrorMsg("La imagen no debe superar 3 MB.");
      return;
    }

    setErrorMsg("");
    setSelectedFile(file);

    // Preview local inmediato
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validar confirmación de contraseña si se ingresó
    if (formData.password && formData.password !== formData.password_confirmation) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    try {
      setSaving(true);

      // 1. Subir avatar si se seleccionó uno nuevo
      if (selectedFile) {
        const avatarRes = await usuarioService.uploadAvatar(selectedFile);
        // Actualizar preview con la URL definitiva del servidor
        if (avatarRes.avatar_url) {
          setPreviewUrl(avatarRes.avatar_url);
        }
        // ✅ Sincronizar el sidebar inmediatamente
        if (avatarRes.avatar) {
          updateUser({ avatar: avatarRes.avatar });
        }
        setSelectedFile(null);
      }

      // 2. Actualizar datos del perfil (sin correo, sin avatar)
      const profileData = {
        nombre: formData.nombre,
        telefono: formData.telefono,
        direccion: formData.direccion,
      };
      if (formData.password) {
        profileData.password = formData.password;
        profileData.password_confirmation = formData.password_confirmation;
      }

      const response = await usuarioService.updateProfile(profileData);

      // Sincronizar contexto global (sidebar, navbar, etc.)
      if (response?.user) {
        updateUser(response.user);
      }

      setIsEditing(false);
      setSuccessMsg("Perfil actualizado correctamente.");
      await loadUserProfile();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      const msg = error?.errors
        ? Object.values(error.errors).flat().join(" | ")
        : error?.message || "Error al actualizar el perfil.";
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setErrorMsg("");
    setSuccessMsg("");
    // Restaurar preview al avatar guardado
    if (user?.avatar_url) setPreviewUrl(user.avatar_url);
    else if (user?.avatar) setPreviewUrl(`http://127.0.0.1:8000/storage/${user.avatar}`);
    else setPreviewUrl(null);
    // Restaurar formData
    setFormData({
      nombre: user?.nombre || "",
      telefono: user?.telefono || "",
      direccion: user?.direccion || "",
      password: "",
      password_confirmation: "",
    });
  };

  const avatarSrc = previewUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.nombre || "Admin"}`;

  if (loading) return (
    <div className="crud-container">
      <div className="glass-card" style={{ textAlign: "center", padding: "50px" }}>
        <p style={{ color: "var(--text-muted)" }}>Cargando perfil...</p>
      </div>
    </div>
  );

  return (
    <div className="crud-container">
      <div className="crud-header">
        <div>
          <h2 style={{ fontSize: "28px", color: "var(--primary-red)" }}>Mi Perfil</h2>
          <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "14px" }}>
            Visualiza y actualiza tu información de cuenta
          </p>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="premium-btn">
            <Edit2 size={18} />
            Editar Perfil
          </button>
        )}
      </div>

      {/* Mensajes de feedback */}
      {successMsg && (
        <div style={{ background: "#d4edda", color: "#155724", padding: "12px 20px", borderRadius: "10px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ background: "#f8d7da", color: "#721c24", padding: "12px 20px", borderRadius: "10px", marginBottom: "16px" }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <div className="profile-grid">
        {/* Lateral: Avatar y Resumen */}
        <div className="glass-card" style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto 24px" }}>
            <img
              src={avatarSrc}
              alt="Avatar"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid var(--bg-content)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
              }}
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.nombre || "Admin"}`;
              }}
            />
            {isEditing && (
              <>
                <label
                  htmlFor="profile-upload"
                  title="Cambiar foto de perfil"
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    background: "var(--primary-red)",
                    color: "white",
                    borderRadius: "50%",
                    width: "45px",
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                  }}
                >
                  <Camera size={20} />
                </label>
                <input
                  id="profile-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>

          {selectedFile && (
            <p style={{ fontSize: "12px", color: "#10b981", marginBottom: "8px" }}>
              ✓ Nueva imagen lista para guardar
            </p>
          )}

          <h3 style={{ margin: "0 0 10px", fontSize: "24px", fontWeight: "800", color: "#1a1a1a" }}>
            {user?.nombre}
          </h3>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            background: "rgba(107, 0, 0, 0.1)",
            color: "var(--primary-red)",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "20px"
          }}>
            {user?.nombreRol || "Administrador"}
          </div>

          <div style={{ textAlign: "left", marginTop: "30px", borderTop: "1px solid var(--border-grey)", paddingTop: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
              <div style={{ color: "var(--primary-red)", background: "rgba(107,0,0,0.05)", padding: "8px", borderRadius: "8px" }}>
                <Shield size={18} />
              </div>
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>Estado de Cuenta</p>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#10b981", margin: 0 }}>Verificada</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ color: "var(--primary-red)", background: "rgba(107,0,0,0.05)", padding: "8px", borderRadius: "8px" }}>
                <User size={18} />
              </div>
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>Documento / ID</p>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>{user?.docUsuario}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Principal: Información / Formulario */}
        <div className="glass-card" style={{ minHeight: "520px" }}>
          {isEditing ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <h4 style={{ margin: 0, fontWeight: "800", fontSize: "20px" }}>Configuración de Perfil</h4>
                <button
                  onClick={handleCancelEdit}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <X size={18} /> Cancelar
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  {/* Nombre */}
                  <div className="form-group">
                    <label><User size={14} style={{ marginRight: "6px" }} />Nombre Completo *</label>
                    <input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="premium-input"
                      required
                    />
                  </div>

                  {/* Correo — SOLO LECTURA */}
                  <div className="form-group">
                    <label>
                      <Mail size={14} style={{ marginRight: "6px" }} />
                      Correo Electrónico
                      <span title="El correo no se puede modificar" style={{ marginLeft: "6px", color: "#999" }}>
                        <Lock size={12} />
                      </span>
                    </label>
                    <input
                      name="correo"
                      type="email"
                      value={user?.correo || ""}
                      className="premium-input"
                      disabled
                      style={{ opacity: 0.6, cursor: "not-allowed" }}
                      title="El correo electrónico no se puede modificar"
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="form-group">
                    <label><Phone size={14} style={{ marginRight: "6px" }} />Teléfono de Contacto</label>
                    <input
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="premium-input"
                    />
                  </div>

                  {/* Nueva contraseña */}
                  <div className="form-group">
                    <label><Shield size={14} style={{ marginRight: "6px" }} />Nueva Contraseña</label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="premium-input"
                      placeholder="Dejar vacío para no cambiar"
                      autoComplete="new-password"
                    />
                  </div>

                  {/* Confirmar contraseña */}
                  {formData.password && (
                    <div className="form-group">
                      <label><Shield size={14} style={{ marginRight: "6px" }} />Confirmar Contraseña</label>
                      <input
                        name="password_confirmation"
                        type="password"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="premium-input"
                        placeholder="Repite la nueva contraseña"
                        autoComplete="new-password"
                      />
                    </div>
                  )}

                  {/* Dirección */}
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label><MapPin size={14} style={{ marginRight: "6px" }} />Dirección Residencial / Oficina</label>
                    <input
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      className="premium-input"
                    />
                  </div>
                </div>

                <div style={{ marginTop: "40px", borderTop: "1px solid var(--border-grey)", paddingTop: "25px" }}>
                  <button type="submit" className="premium-btn" disabled={saving} style={{ width: "100%" }}>
                    <Save size={18} />
                    {saving ? "Guardando cambios..." : "Actualizar Información"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h4 style={{ marginBottom: "30px", fontWeight: "800", fontSize: "20px", color: "#1a1a1a" }}>
                Información de la Cuenta
              </h4>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                <div className="info-item">
                  <label style={{ color: "var(--text-muted)", display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600" }}>Nombre Completo</label>
                  <p style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", margin: 0 }}>{user?.nombre}</p>
                </div>
                <div className="info-item">
                  <label style={{ color: "var(--text-muted)", display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600" }}>Correo de Contacto</label>
                  <p style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", margin: 0 }}>{user?.correo}</p>
                </div>
                <div className="info-item">
                  <label style={{ color: "var(--text-muted)", display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600" }}>Teléfono Móvil</label>
                  <p style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", margin: 0 }}>{user?.telefono || "No registrado"}</p>
                </div>
                <div className="info-item">
                  <label style={{ color: "var(--text-muted)", display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600" }}>Rol del Usuario</label>
                  <p style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", margin: 0 }}>{user?.nombreRol || "Administrador"}</p>
                </div>
                <div className="info-item" style={{ gridColumn: "1 / -1" }}>
                  <label style={{ color: "var(--text-muted)", display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600" }}>Ubicación / Dirección</label>
                  <p style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", margin: 0 }}>{user?.direccion || "Sin dirección especificada"}</p>
                </div>
              </div>

              <div style={{
                marginTop: "60px",
                padding: "24px",
                background: "rgba(16, 185, 129, 0.05)",
                borderRadius: "15px",
                border: "1px solid rgba(16, 185, 129, 0.15)",
                display: "flex",
                alignItems: "center",
                gap: "18px"
              }}>
                <div style={{ background: "#10b981", color: "white", width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle size={22} />
                </div>
                <div>
                  <h5 style={{ margin: "0 0 4px", color: "#064e3b", fontWeight: "800" }}>Datos Conectados</h5>
                  <p style={{ margin: 0, fontSize: "13px", color: "#047857" }}>
                    La información mostrada proviene directamente del registro oficial en el sistema VisioHome.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
