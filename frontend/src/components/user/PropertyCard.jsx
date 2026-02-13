import { Link } from "react-router-dom";
import { Star, MapPin, ArrowRight, Bed, Bath, Layout } from "lucide-react";

export default function PropertyCard({ property }) {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col flex-grow-0">
            {/* Image Wrapper */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={property.imagen || `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800`}
                    alt={property.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/80 backdrop-blur-md text-[#6b0000] text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-sm">
                        {property.tipo || 'Casa'}
                    </span>
                    <span className="bg-[#6b0000] text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg">
                        {property.estado === 'disponible' ? 'NUEVO' : property.estado?.toUpperCase()}
                    </span>
                </div>
                <button className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white hover:text-red-500 transition-all shadow-lg border border-white/30">
                    <Star size={18} />
                </button>
            </div>

            {/* Content Wrapper */}
            <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 pr-4">
                        <h3 className="text-xl font-black text-gray-900 mb-2 truncate group-hover:text-[#6b0000] transition-colors">
                            {property.titulo}
                        </h3>
                        <p className="text-gray-400 text-sm font-semibold flex items-center gap-1.5">
                            <MapPin size={16} className="text-[#6b0000]/60" /> {property.ubicacion || "Ubicación Privada"}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-[#6b0000] m-0 tracking-tighter">
                            ${property.precio?.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-gray-400 font-black uppercase m-0 leading-none">USD / Unidad</p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-1 mb-8">
                    <div className="bg-gray-50/50 p-3 rounded-2xl flex flex-col items-center justify-center">
                        <Bed size={16} className="text-gray-400 mb-1" />
                        <p className="text-xs font-black text-gray-900 m-0">{property.habitaciones || 3}</p>
                        <p className="text-[8px] text-gray-400 font-black uppercase m-0">Cuartos</p>
                    </div>
                    <div className="bg-gray-50/50 p-3 rounded-2xl flex flex-col items-center justify-center">
                        <Bath size={16} className="text-gray-400 mb-1" />
                        <p className="text-xs font-black text-gray-900 m-0">{property.banos || 2}</p>
                        <p className="text-[8px] text-gray-400 font-black uppercase m-0">Aseos</p>
                    </div>
                    <div className="bg-gray-50/50 p-3 rounded-2xl flex flex-col items-center justify-center">
                        <Layout size={16} className="text-gray-400 mb-1" />
                        <p className="text-xs font-black text-gray-900 m-0">{property.tamano_m2 || 120}</p>
                        <p className="text-[8px] text-gray-400 font-black uppercase m-0">m² Área</p>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <Link
                        to={`/user/properties/${property.idPropiedad}`}
                        className="text-[#6b0000] text-xs font-black uppercase tracking-widest no-underline flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                        Ver Detalles <ArrowRight size={14} />
                    </Link>
                    <button className="bg-gray-50 text-gray-900 text-[10px] font-black uppercase px-5 py-2.5 rounded-xl hover:bg-[#6b0000] hover:text-white transition-all shadow-sm">
                        Apartar
                    </button>
                </div>
            </div>
        </div>
    );
}
