import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Star,
    Zap,
    Layers,
    Maximize2,
    ChevronRight,
    Search
} from "lucide-react";

export default function ThreeDExplorer() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen animate-fade-in overflow-hidden relative">

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6b0000]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

            {/* Main Content */}
            <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-[#6b0000]/5 px-6 py-2 rounded-full border border-[#6b0000]/10 mb-10 group hover:scale-105 transition-transform cursor-default">
                    <Zap size={16} className="text-[#6b0000]" fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6b0000]">Inmuebles Inmersivos</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-8 leading-[0.9]">
                    Explora el Futuro <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b0000] to-gray-400">en 3D</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-500 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
                    Estamos construyendo una experiencia revolucionaria. Recorre cualquier propiedad, cambia materiales en tiempo real y siente tu nuevo hogar antes de que se construya.
                </p>

                {/* Futurist Placeholder Card */}
                <div className="relative group perspective-1000">
                    <div className="aspect-[21/9] bg-gray-900 rounded-[4rem] shadow-2xl relative overflow-hidden border-[12px] border-white group-hover:shadow-[0_40px_100px_-20px_rgba(107,0,0,0.3)] transition-all duration-700">
                        <img
                            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600"
                            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms]"
                            alt="3D Visualization"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 mb-6 group-hover:scale-110 transition-transform shadow-2xl">
                                <Maximize2 size={40} className="animate-pulse" />
                            </div>
                            <h2 className="text-4xl font-black tracking-tighter mb-2">Próximamente</h2>
                            <p className="text-[#ffcc00] font-black uppercase tracking-[0.4em] text-sm">Versión Beta 2026</p>
                        </div>
                    </div>

                    {/* Feature Highlights beneath */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                            <Star className="text-[#6b0000] mb-4" size={28} />
                            <h4 className="font-black text-gray-900 mb-2">Realidad Virtual</h4>
                            <p className="text-sm text-gray-500 font-medium">Compatible con cualquier visor VR para una inmersión total.</p>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                            <Layers className="text-[#6b0000] mb-4" size={28} />
                            <h4 className="font-black text-gray-900 mb-2">Personalización</h4>
                            <p className="text-sm text-gray-500 font-medium">Cambia pisos, paredes y muebles con un solo toque.</p>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                            <Box className="text-[#6b0000] mb-4" size={28} />
                            <h4 className="font-black text-gray-900 mb-2">Planos 3D</h4>
                            <p className="text-sm text-gray-500 font-medium">Visualiza la estructura interna y tuberías de la vivienda.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-24 pt-10 border-t border-gray-100 max-w-2xl mx-auto flex flex-col items-center">
                    <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-8">¿Quieres ser el primero en probarlo?</p>
                    <div className="flex w-full max-w-md gap-4">
                        <input
                            type="email"
                            placeholder="Tu correo corporativo..."
                            className="flex-grow bg-white border-2 border-transparent focus:border-[#6b0000] rounded-2xl py-4 px-6 text-sm font-bold outline-none shadow-sm transition-all"
                        />
                        <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                            Unirse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
