import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, User, Send, Trash2, Edit } from "lucide-react";

const Comments = ({ idPropiedad }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/comments/${idPropiedad}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idPropiedad) fetchComments();
    }, [idPropiedad]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await axios.post("http://127.0.0.1:8000/api/user/comments", {
                idPropiedad: idPropiedad,
                comentario: newComment,
                puntuacion: rating
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setNewComment("");
            setRating(5);
            fetchComments();
        } catch (error) {
            alert("Error al enviar comentario");
        }
    };

    if (loading) return <div className="spinner-border text-danger"></div>;

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 mt-4 bg-white">
            <h4 className="fw-bold mb-4">Experiencias y Opiniones</h4>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-5 bg-light p-4 rounded-4 border-light shadow-sm">
                <div className="mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase mb-2">Tu Calificación</label>
                    <div className="d-flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={20}
                                className={`cursor-pointer transition-all ${star <= rating ? 'text-warning fill-warning' : 'text-muted'}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>
                <div className="position-relative">
                    <textarea
                        className="form-control border-0 rounded-4 shadow-none p-3 pe-5"
                        placeholder="Comparte tu experiencia..."
                        rows="3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{ resize: 'none' }}
                    ></textarea>
                    <button type="submit" className="btn btn-danger rounded-3 p-2 position-absolute bottom-0 end-0 m-2 shadow-sm" style={{ backgroundColor: '#6b0000' }}>
                        <Send size={18} />
                    </button>
                </div>
            </form>

            {/* List */}
            <div className="d-flex flex-column gap-4">
                {comments.length > 0 ? comments.map((c) => (
                    <div key={c.id} className="d-flex gap-3">
                        <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${c.usuario?.nombre || 'User'}`}
                            className="rounded-circle border"
                            style={{ width: '45px', height: '45px' }}
                        />
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 className="fw-bold mb-0">{c.usuario?.nombre || 'Usuario Anónimo'}</h6>
                                    <div className="d-flex gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={10} className={i < c.puntuacion ? 'text-warning fill-warning' : 'text-muted'} />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-muted small">Justo ahora</span>
                            </div>
                            <p className="text-muted small mb-0">{c.comentario}</p>
                        </div>
                    </div>
                )) : <p className="text-center text-muted">Aún no hay comentarios. ¡Sé el primero!</p>}
            </div>
        </div>
    );
};

export default Comments;
