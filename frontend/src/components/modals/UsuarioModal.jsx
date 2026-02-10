import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const UsuarioModal = ({ isOpen, onClose, onSave, usuario = null }) => {
    const [formData, setFormData] = useState({
        docUsuario: '',
        nombre: '',
        correo: '',
        telefono: '',
        direccion: '',
        password: '',
        idRol: 2, // Cliente por defecto
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (usuario) {
            setFormData({
                docUsuario: usuario.docUsuario || '',
                nombre: usuario.nombre || '',
                correo: usuario.correo || '',
                telefono: usuario.telefono || '',
                direccion: usuario.direccion || '',
                password: '', // No mostrar password existente
                idRol: usuario.idRol || 2,
            });
        } else {
            setFormData({
                docUsuario: '',
                nombre: '',
                correo: '',
                telefono: '',
                direccion: '',
                password: '',
                idRol: 2,
            });
        }
        setErrors({});
    }, [usuario, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.docUsuario) newErrors.docUsuario = 'Documento requerido';
        if (!formData.nombre) newErrors.nombre = 'Nombre requerido';
        if (!formData.correo) newErrors.correo = 'Correo requerido';
        if (!usuario && !formData.password) newErrors.password = 'Contraseña requerida';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Si es edición y no se cambió la contraseña, no enviarla
        const dataToSend = { ...formData };
        if (usuario && !formData.password) {
            delete dataToSend.password;
        }

        onSave(dataToSend);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{usuario ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Documento *</label>
                            <input
                                type="text"
                                name="docUsuario"
                                value={formData.docUsuario}
                                onChange={handleChange}
                                disabled={!!usuario}
                                className={errors.docUsuario ? 'error' : ''}
                            />
                            {errors.docUsuario && <span className="error-text">{errors.docUsuario}</span>}
                        </div>

                        <div className="form-group">
                            <label>Nombre *</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className={errors.nombre ? 'error' : ''}
                            />
                            {errors.nombre && <span className="error-text">{errors.nombre}</span>}
                        </div>

                        <div className="form-group">
                            <label>Correo *</label>
                            <input
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                className={errors.correo ? 'error' : ''}
                            />
                            {errors.correo && <span className="error-text">{errors.correo}</span>}
                        </div>

                        <div className="form-group">
                            <label>Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Contraseña {!usuario && '*'}</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder={usuario ? 'Dejar vacío para no cambiar' : ''}
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label>Rol *</label>
                            <select
                                name="idRol"
                                value={formData.idRol}
                                onChange={handleChange}
                            >
                                <option value={1}>Admin</option>
                                <option value={2}>Cliente</option>
                                <option value={3}>Agente</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary">
                            {usuario ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #111827;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          transition: color 0.2s;
        }

        .close-btn:hover {
          color: #111827;
        }

        form {
          padding: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        label {
          margin-bottom: 6px;
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
        }

        input, select {
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #6b0000;
        }

        input.error {
          border-color: #ef4444;
        }

        input:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }

        .error-text {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 4px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .btn-secondary, .btn-primary {
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .btn-primary {
          background: #6b0000;
          color: white;
        }

        .btn-primary:hover {
          background: #8b0000;
        }
      `}</style>
        </div>
    );
};

export default UsuarioModal;
