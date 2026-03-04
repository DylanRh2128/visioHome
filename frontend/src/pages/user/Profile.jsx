import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Clock, Home, Edit2, Save } from "lucide-react";
import Swal from "sweetalert2";

const Profile = () => {
    // Mock User Data
    const [user, setUser] = useState({
        name: "Carlos Martinez",
        email: "carlos.m@example.com",
        phone: "+503 7000-0000",
        address: "San Salvador, El Salvador",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("citas"); // citas | reservas

    // Mock History Data
    const appointments = [
        { id: 1, property: "Casa en San Benito", date: "2024-03-20", time: "10:00 AM", status: "Confirmada" },
        { id: 2, property: "Apartamento Lomas", date: "2024-03-25", time: "02:00 PM", status: "Pendiente" },
    ];

    const reservations = [
        { id: 1, property: "Penthouse Zona Rosa", date: "2024-02-15", amount: "$500", status: "Pagado" },
    ];

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
        Swal.fire({
            icon: "success",
            title: "Perfil Actualizado",
            text: "Tus datos han sido guardados correctamente.",
            timer: 1500,
            showConfirmButton: false,
        });
    };

    return (
        <div className="user-container">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Profile Sidebar */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 p-8 text-center sticky top-28">
                        <div className="relative inline-block mb-6">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-50 shadow-lg"
                            />
                            <button className="absolute bottom-0 right-0 p-2 bg-[#6b0000] rounded-full text-white shadow-md hover:bg-[#500000] transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>

                        {!isEditing ? (
                            <>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                                <p className="text-gray-500 text-sm mb-6">{user.email}</p>

                                <div className="space-y-4 text-left">
                                    <div className="flex items-center gap-3 text-gray-600 p-3 bg-gray-50 rounded-xl">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 p-3 bg-gray-50 rounded-xl">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <span>{user.address}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-full mt-8 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:border-[#6b0000] hover:text-[#6b0000] transition-all flex items-center justify-center gap-2"
                                >
                                    Editar Perfil
                                </button>
                            </>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-4 text-left">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">Nombre</label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6b0000]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">Teléfono</label>
                                    <input
                                        type="text"
                                        value={user.phone}
                                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6b0000]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">Dirección</label>
                                    <input
                                        type="text"
                                        value={user.address}
                                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6b0000]"
                                    />
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-2 text-gray-500 font-bold hover:bg-gray-50 rounded-lg"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2 bg-[#6b0000] text-white font-bold rounded-lg hover:bg-[#500000]"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 p-8 min-h-[500px]">
                        <div className="flex gap-8 border-b border-gray-100 mb-8">
                            <button
                                onClick={() => setActiveTab("citas")}
                                className={`pb-4 text-lg font-bold transition-all relative ${activeTab === "citas" ? "text-[#6b0000]" : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                Mis Citas
                                {activeTab === "citas" && <span className="absolute bottom-0 left-0 w-full h-1 bg-[#6b0000] rounded-full"></span>}
                            </button>
                            <button
                                onClick={() => setActiveTab("reservas")}
                                className={`pb-4 text-lg font-bold transition-all relative ${activeTab === "reservas" ? "text-[#6b0000]" : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                Reservas & Pagos
                                {activeTab === "reservas" && <span className="absolute bottom-0 left-0 w-full h-1 bg-[#6b0000] rounded-full"></span>}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {activeTab === "citas" ? (
                                appointments.length > 0 ? (
                                    appointments.map((appt) => (
                                        <div key={appt.id} className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                            <div className="w-12 h-12 bg-[#6b0000]/10 rounded-xl flex items-center justify-center text-[#6b0000] mr-4">
                                                <Calendar className="w-6 h-6" />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-gray-900">{appt.property}</h4>
                                                <div className="flex gap-3 text-sm text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {appt.date}</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {appt.time}</span>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${appt.status === "Confirmada" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {appt.status}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-400">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No tienes citas programadas.</p>
                                    </div>
                                )
                            ) : (
                                reservations.length > 0 ? (
                                    reservations.map((res) => (
                                        <div key={res.id} className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4">
                                                <Home className="w-6 h-6" />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-gray-900">{res.property}</h4>
                                                <div className="flex gap-3 text-sm text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1">Fecha: {res.date}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-[#6b0000]">{res.amount}</p>
                                                <span className="text-xs text-green-600 font-bold uppercase">{res.status}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-400">
                                        <Home className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No tienes reservas activas.</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
