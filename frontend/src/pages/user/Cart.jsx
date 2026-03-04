import api from "../../services/api";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await api.get("/user/cart");
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeFromCart = async (id) => {
        try {
            await api.delete(`/user/cart/remove/${id}`);
            fetchCart();
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "Propiedad removida del carrito.",
                timer: 1000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error("Error removing from cart", error);
        }
    };

    const handleCheckout = async () => {
        try {
            await api.post("/user/checkout");
            Swal.fire({
                icon: "success",
                title: "¡Reserva Exitosa!",
                text: "Tu solicitud de reserva ha sido procesada.",
                confirmButtonColor: '#6b0000'
            });
            navigate("/user/dashboard");
        } catch (error) {
            Swal.fire("Error", "No se pudo procesar la reserva.", "error");
        }
    };

    if (loading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-danger" role="status"></div>
        </div>
    );

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="container py-5 text-center mt-5">
                <div className="bg-light p-5 rounded-circle d-inline-block mb-4 shadow-sm">
                    <ShoppingBag size={64} className="text-muted" />
                </div>
                <h2 className="fw-bold text-dark">Tu carrito está vacío</h2>
                <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>Parece que aún no has agregado ninguna propiedad a tu lista de interés para reserva.</p>
                <Link to="/user/properties" className="btn btn-danger btn-lg rounded-pill px-5 fw-bold" style={{ backgroundColor: '#6b0000' }}>
                    Explorar Propiedades
                </Link>
            </div>
        );
    }

    const total = cart.items.reduce((acc, item) => acc + (Number(item.propiedad?.precio || 0) * 0.05), 0);

    return (
        <div className="container py-5">
            <h1 className="fw-bold text-dark mb-5 border-start border-danger border-5 ps-3">Tu Carrito de Reservas</h1>

            <div className="row g-5">
                <div className="col-lg-8">
                    <div className="d-flex flex-column gap-4">
                        {cart.items.map((item) => (
                            <div key={item.id} className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-3">
                                        <div style={{ height: '160px' }}>
                                            <img
                                                src={item.propiedad?.imagen_principal || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.propiedad?.titulo}`}
                                                className="img-fluid w-100 h-100 object-fit-cover"
                                                alt={item.propiedad?.titulo}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body p-4">
                                            <h5 className="fw-bold mb-1">{item.propiedad?.titulo}</h5>
                                            <p className="text-muted small mb-2"><MapPin size={12} className="me-1" /> {item.propiedad?.ubicacion}</p>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="text-danger fw-bold h5 mb-0">${Number(item.propiedad?.precio || 0).toLocaleString()}</span>
                                                <span className="badge bg-light text-dark fw-normal rounded-pill">Reserva (5%): ${(Number(item.propiedad?.precio || 0) * 0.05).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 p-4 text-center border-start shadow-sm bg-light bg-opacity-10">
                                        <div className="d-flex flex-column gap-2">
                                            <button
                                                onClick={() => removeFromCart(item.idPropiedad)}
                                                className="btn btn-outline-danger btn-sm rounded-pill fw-bold"
                                            >
                                                <Trash2 size={14} className="me-1" /> Eliminar
                                            </button>
                                            <button
                                                onClick={() => navigate(`/user/properties/${item.idPropiedad}`)}
                                                className="btn btn-dark btn-sm rounded-pill fw-bold"
                                            >
                                                Ver Detalles
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                        <h4 className="fw-bold text-dark mb-4">Resumen de Reserva</h4>
                        <div className="space-y-3 mb-4">
                            <div className="d-flex justify-content-between text-muted mb-2">
                                <span>Propiedades</span>
                                <span className="fw-bold">{cart.items.length}</span>
                            </div>
                            <div className="d-flex justify-content-between text-muted mb-3">
                                <span>Total Reservas (5% c/u)</span>
                                <span className="fw-bold">${total.toLocaleString()}</span>
                            </div>
                            <hr className="my-3" />
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="fw-bold h5 mb-0">Total a Pagar</span>
                                <span className="fw-extrabold text-danger h3 mb-0" style={{ color: '#6b0000' }}>${total.toLocaleString()}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="btn btn-danger btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                            style={{ backgroundColor: '#6b0000' }}
                        >
                            Proceder al Pago <ArrowRight size={20} />
                        </button>
                        <p className="text-center text-muted small mt-3 px-3">
                            Al proceder, aceptas que el 5% de reserva no es reembolsable y se descontará del precio final.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
