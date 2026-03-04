import api from "../../services/api";

const Checkout = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
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
        fetchCart();
    }, []);

    const handleProcessPayment = async () => {
        setProcessing(true);
        try {
            await api.post("/user/checkout");
            Swal.fire({
                icon: 'success',
                title: '¡Pago Exitoso!',
                text: 'Tus propiedades han sido reservadas. En breve recibirás un comprobante.',
                confirmButtonColor: '#6b0000'
            }).then(() => navigate("/user/dashboard"));
        } catch (error) {
            Swal.fire('Error', 'No se pudo procesar el pago. Revisa tu saldo.', 'error');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="container py-5 text-center"><div className="spinner-border text-danger"></div></div>;

    const total = cart?.items?.reduce((acc, item) => acc + (Number(item.propiedad.precio) * 0.05), 0) || 0;

    return (
        <div className="container py-5 mt-4">
            <h1 className="fw-bold text-dark mb-5 border-start border-danger border-5 ps-3">Finalizar Reserva</h1>

            <div className="row g-5">
                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                        <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                            <CreditCard className="text-danger" /> Información de Pago
                        </h4>
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label small fw-bold text-muted text-uppercase">Nombre en la tarjeta</label>
                                <input type="text" className="form-control form-control-lg rounded-3 border-light bg-light shadow-none" placeholder="JUAN PEREZ" />
                            </div>
                            <div className="col-12">
                                <label className="form-label small fw-bold text-muted text-uppercase">Número de tarjeta</label>
                                <div className="input-group input-group-lg border-light bg-light rounded-3 shadow-none overflow-hidden">
                                    <span className="input-group-text bg-transparent border-0"><CreditCard size={18} /></span>
                                    <input type="text" className="form-control bg-transparent border-0" placeholder="XXXX XXXX XXXX XXXX" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-muted text-uppercase">Vencimiento</label>
                                <input type="text" className="form-control form-control-lg rounded-3 border-light bg-light shadow-none" placeholder="MM/YY" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-muted text-uppercase">CVV</label>
                                <input type="password" className="form-control form-control-lg rounded-3 border-light bg-light shadow-none" placeholder="***" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-success bg-opacity-10 p-3 rounded-4 border border-success border-opacity-25 d-flex align-items-center gap-3">
                        <ShieldCheck className="text-success" />
                        <span className="text-success small fw-bold">Tus transacciones están protegidas por encriptación SSL de 256 bits.</span>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                        <h4 className="fw-bold text-dark mb-4">Resumen del Pedido</h4>
                        <div className="d-flex flex-column gap-3 mb-4">
                            {cart?.items?.length > 0 ? cart.items.map(item => (
                                <div key={item.id} className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="bg-light p-2 rounded-2"><Package size={16} /></div>
                                        <div>
                                            <p className="small fw-bold mb-0 text-truncate" style={{ maxWidth: '180px' }}>{item.propiedad.titulo}</p>
                                            <small className="text-muted">Reserva (5%)</small>
                                        </div>
                                    </div>
                                    <span className="fw-bold small">${(Number(item.propiedad.precio) * 0.05).toLocaleString()}</span>
                                </div>
                            )) : <p className="text-center text-muted">No hay items en el carrito</p>}
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <span className="fw-bold h5 mb-0">Total a Pagar</span>
                            <span className="fw-extrabold text-danger h3 mb-0">${total.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={handleProcessPayment}
                            disabled={processing || !cart?.items?.length}
                            className="btn btn-danger btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                            style={{ backgroundColor: '#6b0000' }}
                        >
                            {processing ? <span className="spinner-border spinner-border-sm"></span> : <>Confirmar Pago <CheckCircle size={20} /></>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
