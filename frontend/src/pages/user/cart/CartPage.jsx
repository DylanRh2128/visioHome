import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Trash2,
    ShoppingCart,
    CreditCard,
    MapPin,
    ArrowRight,
    Building2,
    ShieldCheck,
    Info,
    ChevronLeft
} from "lucide-react";
import cartService from "../../../services/cartService";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const data = await cartService.getItems();
            setCartItems(data || []);
        } catch (error) {
            console.error("Error loading cart:", error);
            // Mock for UI if backend not fully ready
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        try {
            await cartService.remove(id);
            loadCart();
        } catch (error) {
            alert("Error al eliminar item.");
        }
    };

    const totalAmount = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + (item?.propiedad?.precio || 0), 0)
        : 0;
    const reservationFee = totalAmount * 0.05; // 5% reservation fee

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
            <div className="mb-12">
                <Link to="/user/properties" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#6b0000] font-bold no-underline text-xs uppercase tracking-widest mb-6 transition-colors">
                    <ChevronLeft size={16} /> Seguir buscando
                </Link>
                <h1 className="text-4xl font-black tracking-tighter text-gray-900 mb-2">Mi Carrito de Selección</h1>
                <p className="text-lg text-gray-500 font-medium">Gestiona las propiedades que has seleccionado para apartar o comprar.</p>
            </div>

            {loading ? (
                <div className="space-y-6">
                    {[1, 2].map(i => <div key={i} className="h-40 bg-gray-50 rounded-[2.5rem] animate-pulse"></div>)}
                </div>
            ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[4rem] border border-gray-50 shadow-inner">
                    <div className="bg-[#6b0000]/5 p-10 rounded-full mb-8">
                        <ShoppingCart size={64} className="text-[#6b0000]/20" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Tu carrito está vacío</h2>
                    <p className="text-gray-400 font-bold mb-8">Parece que aún no has seleccionado ninguna propiedad.</p>
                    <Link to="/user/properties" className="btn-premium bg-[#6b0000] text-white px-10 py-4 rounded-2xl font-black no-underline hover:bg-[#4d0000] transition-all shadow-xl">
                        Explorar Catálogo
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col sm:flex-row items-center gap-8 group">
                                <div className="w-full sm:w-48 h-32 rounded-3xl overflow-hidden shadow-md">
                                    <img
                                        src={item.propiedad?.imagen || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400"}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        alt="Propiedad"
                                    />
                                </div>
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tighter">{item.propiedad?.titulo || "Nombre de Propiedad"}</h3>
                                    <p className="text-gray-400 text-sm font-bold flex items-center justify-center sm:justify-start gap-2 mb-2">
                                        <MapPin size={16} /> {item.propiedad?.ubicacion || "Ubicación"}
                                    </p>
                                    <p className="text-lg font-black text-[#6b0000]">${item.propiedad?.precio?.toLocaleString()}</p>
                                </div>
                                <div className="flex gap-4">
                                    <Link to={`/user/properties/${item.idPropiedad}`} className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#6b0000] transition-all border border-transparent hover:border-gray-100">
                                        <ArrowRight size={20} />
                                    </Link>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="p-4 bg-red-50 rounded-2xl text-red-400 hover:text-white hover:bg-red-500 transition-all border border-transparent"
                                        title="Eliminar del carrito"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl sticky top-40 overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <CreditCard size={120} />
                            </div>

                            <h3 className="text-2xl font-black tracking-tighter mb-8 flex items-center gap-3">
                                <ShieldCheck className="text-[#ffcc00]" /> Resumen de Compra
                            </h3>

                            <div className="space-y-6 mb-10 border-b border-white/10 pb-10">
                                <div className="flex justify-between items-center text-white/60 font-bold text-sm">
                                    <span>Subtotal {cartItems.length} items</span>
                                    <span className="text-white">${totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-white/60 font-bold text-sm">
                                    <span>Costo de Apartado (5%)</span>
                                    <span className="text-white">${reservationFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10 mt-6">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#ffcc00]">Total a Pagar hoy</span>
                                    <span className="text-2xl font-black tracking-tighter">${reservationFee.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button className="w-full bg-[#6b0000] text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:bg-[#4d0000] transition-all focus:scale-95 flex items-center justify-center gap-3">
                                    <CreditCard size={20} /> Pagar Apartado
                                </button>
                                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <Info className="text-[#ffcc00]" size={18} />
                                    <p className="text-[10px] text-white/40 font-bold m-0 tracking-tight leading-relaxed">
                                        El abono del 5% asegura la propiedad por 7 días calendario.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
