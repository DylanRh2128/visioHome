import React, { useState, useEffect, useRef } from 'react';
import { Box, RotateCcw, Maximize2, Minimize2, RotateCw } from 'lucide-react';
import propiedadService from '../services/propiedadService';

// Lazy import to avoid loading Three.js until needed
const ModelViewer = React.lazy(() => import('./ModelViewer'));

// ─── Placeholder when no 3D model is available ───────────────────────────────
function NoModelPlaceholder() {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            borderRadius: '20px',
            color: '#888',
            gap: '16px',
        }}>
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(107,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(107,0,0,0.3)',
            }}>
                <Box size={36} color="#6b0000" />
            </div>
            <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: '#aaa', fontFamily: 'Inter, sans-serif' }}>
                    Modelo 3D no disponible
                </p>
                <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#666', fontFamily: 'Inter, sans-serif' }}>
                    Esta propiedad aún no cuenta con visualización 3D
                </p>
            </div>
        </div>
    );
}

// ─── Skeleton loader while fetching the URL ──────────────────────────────────
function ViewerSkeleton() {
    return (
        <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%)',
            backgroundSize: '400% 100%',
            animation: 'shimmer 1.5s ease-in-out infinite',
            borderRadius: '20px',
        }}>
            <style>{`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
        </div>
    );
}

// ─── Main Property3DViewer component ─────────────────────────────────────────
export default function Property3DViewer({ propertyId }) {
    const [modelUrl, setModelUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [autoRotate, setAutoRotate] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!propertyId) return;

        let cancelled = false;

        const fetchModel = async () => {
            setLoading(true);
            const data = await propiedadService.getModelo3D(propertyId);
            if (!cancelled) {
                setModelUrl(data.model_url ?? null);
                setLoading(false);
            }
        };

        fetchModel();
        return () => { cancelled = true; };
    }, [propertyId]);

    // Fullscreen toggle using the Fullscreen API
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleFsChange = () => {
            if (!document.fullscreenElement) setIsFullscreen(false);
        };
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    const viewerHeight = isFullscreen ? '100vh' : '480px';

    return (
        <div className="mb-4">
            {/* Section header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                    <Box size={20} color="#6b0000" />
                    <h3 className="fw-bold text-dark mb-0" style={{ fontSize: '1.25rem' }}>
                        Visor 3D Interactivo
                    </h3>
                    {modelUrl && (
                        <span
                            className="badge rounded-pill"
                            style={{ background: 'rgba(107,0,0,0.1)', color: '#6b0000', fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em' }}
                        >
                            BETA
                        </span>
                    )}
                </div>

                {/* Controls toolbar — only show when model exists */}
                {modelUrl && !loading && (
                    <div className="d-flex gap-2">
                        {/* Auto-rotate toggle */}
                        <button
                            onClick={() => setAutoRotate(v => !v)}
                            title={autoRotate ? 'Detener rotación' : 'Auto-rotar'}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: autoRotate ? '2px solid #6b0000' : '2px solid #dee2e6',
                                background: autoRotate ? 'rgba(107,0,0,0.08)' : '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {autoRotate
                                ? <RotateCcw size={16} color="#6b0000" />
                                : <RotateCw size={16} color="#6c757d" />}
                        </button>

                        {/* Fullscreen toggle */}
                        <button
                            onClick={toggleFullscreen}
                            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '2px solid #dee2e6',
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {isFullscreen
                                ? <Minimize2 size={16} color="#6c757d" />
                                : <Maximize2 size={16} color="#6c757d" />}
                        </button>
                    </div>
                )}
            </div>

            {/* Viewer container */}
            <div
                ref={containerRef}
                style={{
                    height: viewerHeight,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid #e9ecef',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    background: '#1a1a1a',
                    position: 'relative',
                    transition: 'height 0.3s ease',
                }}
            >
                {loading ? (
                    <ViewerSkeleton />
                ) : !modelUrl ? (
                    <NoModelPlaceholder />
                ) : (
                    <>
                        <React.Suspense fallback={<ViewerSkeleton />}>
                            <ModelViewer url={modelUrl} autoRotate={autoRotate} />
                        </React.Suspense>

                        {/* Interaction hint — fades after a few seconds */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '16px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(0,0,0,0.55)',
                                color: '#fff',
                                padding: '6px 16px',
                                borderRadius: '100px',
                                fontSize: '11px',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                letterSpacing: '0.04em',
                                pointerEvents: 'none',
                                animation: 'fadeOut 4s ease forwards 3s',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            🖱 Arrastra para rotar · Scroll para zoom
                        </div>
                        <style>{`@keyframes fadeOut { to { opacity: 0; } }`}</style>
                    </>
                )}
            </div>
        </div>
    );
}
