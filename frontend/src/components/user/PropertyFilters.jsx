import React from "react";
import { Filter, Search, MapPin } from "lucide-react";

const PropertyFilters = ({ onFilterChange }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#6b0000]" />
                <h3 className="font-bold text-gray-900">Filtros de Búsqueda</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Ubicación */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Ubicación
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ej. San Salvador"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6b0000] transition-shadow"
                        />
                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                </div>

                {/* Tipo de Propiedad */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Tipo
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6b0000] transition-shadow appearance-none">
                        <option value="">Cualquiera</option>
                        <option value="casa">Casa</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="terreno">Terreno</option>
                        <option value="local">Local Comercial</option>
                    </select>
                </div>

                {/* Precio */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Rango de Precio
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6b0000] transition-shadow"
                        />
                        <span className="text-gray-300">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6b0000] transition-shadow"
                        />
                    </div>
                </div>

                {/* Habitaciones/Baños */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Características
                    </label>
                    <div className="flex gap-2">
                        <select className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6b0000] transition-shadow appearance-none">
                            <option value="">Hab.</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                        <select className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6b0000] transition-shadow appearance-none">
                            <option value="">Baños</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyFilters;
