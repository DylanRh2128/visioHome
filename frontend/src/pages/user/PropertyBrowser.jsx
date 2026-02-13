import React, { useState, useEffect } from "react";
import {
    Search,
    Filter,
    SlidersHorizontal,
    X,
    Building2,
    Home,
    Grid2X2,
    LayoutList,
    ChevronDown,
    RefreshCcw
} from "lucide-react";
import PropertyCard from "../../components/user/PropertyCard";
import propiedadService from "../../services/propiedadService";

export default function PropertyBrowser() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filter State
    const [filters, setFilters] = useState({
        search: "",
        minPrice: "",
        maxPrice: "",
        type: "",
        rooms: "",
        bathrooms: "",
        minArea: "",
        orderBy: "newest"
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            loadProperties();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [filters]);

    const loadProperties = async () => {
        try {
            setLoading(true);
            const data = await propiedadService.getAll(filters);
            setProperties(data || []);
        } catch (error) {
            console.error("Error loading properties:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            search: "",
            minPrice: "",
            maxPrice: "",
            type: "",
            rooms: "",
            bathrooms: "",
            minArea: "",
            orderBy: "newest"
        });
    };

    return (
        <div className="bg-[#fcfcfc] min-h-screen pb-24">
            {/* Search Header */}
            <div className="bg-white border-b border-gray-100 py-12 sticky top-20 z-40 transition-shadow duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                        <div className="flex-grow group relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#6b0000] transition-colors" size={24} />
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Busca por ubicación, título o palabras clave..."
                                className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#6b0000] focus:bg-white rounded-[2rem] py-5 pl-16 pr-8 text-lg font-semibold outline-none transition-all shadow-sm focus:shadow-xl"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-3 px-8 py-5 rounded-[2rem] font-bold transition-all border-2 ${showFilters ? 'bg-[#6b0000] text-white border-[#6b0000] shadow-xl' : 'bg-white text-gray-900 border-gray-100 hover:border-[#6b0000] shadow-sm'}`}
                        >
                            {showFilters ? <X size={20} /> : <SlidersHorizontal size={20} />}
                            <span>{showFilters ? 'Cerrar Filtros' : 'Filtros Avanzados'}</span>
                        </button>
                    </div>

                    {/* Expandable Filters Panel */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[800px] opacity-100 mt-10' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Rango de Precio (USD)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange}
                                        placeholder="Min" className="w-1/2 bg-white border border-gray-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:border-[#6b0000]"
                                    />
                                    <input
                                        type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange}
                                        placeholder="Max" className="w-1/2 bg-white border border-gray-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:border-[#6b0000]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Tipo de Propiedad</label>
                                <select
                                    name="type" value={filters.type} onChange={handleFilterChange}
                                    className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:border-[#6b0000] appearance-none"
                                >
                                    <option value="">Cualquier Tipo</option>
                                    <option value="casa">Casa</option>
                                    <option value="apartamento">Apartamento</option>
                                    <option value="oficina">Oficina</option>
                                    <option value="lote">Lote / Terreno</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Habitaciones & Baños</label>
                                <div className="flex gap-2">
                                    <select
                                        name="rooms" value={filters.rooms} onChange={handleFilterChange}
                                        className="w-1/2 bg-white border border-gray-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:border-[#6b0000]"
                                    >
                                        <option value="">Hab.</option>
                                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+</option>)}
                                    </select>
                                    <select
                                        name="bathrooms" value={filters.bathrooms} onChange={handleFilterChange}
                                        className="w-1/2 bg-white border border-gray-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:border-[#6b0000]"
                                    >
                                        <option value="">Baños</option>
                                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#6b0000] ml-2">Área Mínima (m²)</label>
                                <input
                                    type="number" name="minArea" value={filters.minArea} onChange={handleFilterChange}
                                    placeholder="Ej: 50" className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:border-[#6b0000]"
                                />
                            </div>

                            <div className="col-span-full pt-6 flex justify-between items-center">
                                <button
                                    onClick={clearFilters}
                                    className="text-gray-400 hover:text-[#6b0000] text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
                                >
                                    <RefreshCcw size={14} /> Restaurar Filtros
                                </button>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Ordenar por:</span>
                                    <select
                                        name="orderBy" value={filters.orderBy} onChange={handleFilterChange}
                                        className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none text-[#6b0000]"
                                    >
                                        <option value="newest">Más Recientes</option>
                                        <option value="price-asc">Menor Precio</option>
                                        <option value="price-desc">Mayor Precio</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="flex justify-between items-center mb-10">
                    <p className="m-0 text-sm font-bold text-gray-500">
                        Mostrando <span className="text-gray-900">{properties.length}</span> resultados encontrados
                    </p>
                    <div className="flex bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                        <button className="p-2 bg-gray-50 text-[#6b0000] rounded-lg shadow-sm">
                            <Grid2X2 size={20} />
                        </button>
                        <button className="p-2 text-gray-300 hover:text-gray-600">
                            <LayoutList size={20} />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-[3rem] h-[550px]"></div>
                        ))}
                    </div>
                ) : properties.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[4rem] border border-gray-50 shadow-sm">
                        <div className="bg-[#6b0000]/5 p-10 rounded-full mb-8">
                            <Search size={64} className="text-[#6b0000]/20" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">No encontramos coincidencias</h2>
                        <p className="text-gray-400 font-bold max-w-sm text-center">Intenta ajustar tus filtros para encontrar lo que buscas.</p>
                        <button onClick={clearFilters} className="mt-8 text-[#6b0000] font-black uppercase tracking-widest text-xs py-4 px-10 border-2 border-[#6b0000] rounded-2xl hover:bg-[#6b0000] hover:text-white transition-all">
                            Ver todo el catálogo
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {properties.map(prop => (
                            <PropertyCard key={prop.idPropiedad} property={prop} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
