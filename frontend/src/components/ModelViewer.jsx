import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Environment, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Loading indicator inside canvas ─────────────────────────────────────────
function CanvasLoader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#6b0000',
                fontFamily: 'Inter, sans-serif',
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #6b0000',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    marginBottom: '12px',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>
                    {Math.round(progress)}%
                </span>
            </div>
        </Html>
    );
}

// ─── The actual 3D model renderer ────────────────────────────────────────────
function GLBModel({ url, autoRotate }) {
    const { scene } = useGLTF(url);
    const modelRef = useRef();

    useEffect(() => {
        if (!scene) return;

        // Auto-center and scale to fit a 2-unit bounding box
        const box = new THREE.Box3().setFromObject(scene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        scene.scale.setScalar(scale);

        // Center geometry
        const center = new THREE.Vector3();
        box.getCenter(center);
        scene.position.sub(center.multiplyScalar(scale));

        // Enable shadows
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return <primitive ref={modelRef} object={scene} />;
}

// ─── Main ModelViewer component ───────────────────────────────────────────────
export default function ModelViewer({ url, autoRotate = false }) {
    return (
        <Canvas
            camera={{ position: [3, 2, 5], fov: 50 }}
            shadows
            gl={{ antialias: true, preserveDrawingBuffer: true }}
            style={{ width: '100%', height: '100%' }}
            onCreated={({ gl }) => {
                gl.setClearColor(new THREE.Color('#f8f8f8'));
            }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[5, 10, 7]}
                intensity={1.2}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-5, 5, -5]} intensity={0.4} />
            <pointLight position={[0, 5, 0]} intensity={0.3} />

            {/* Model */}
            <Suspense fallback={<CanvasLoader />}>
                <Center>
                    <GLBModel url={url} autoRotate={autoRotate} />
                </Center>
                <Environment preset="city" />
            </Suspense>

            {/* Controls */}
            <OrbitControls
                autoRotate={autoRotate}
                autoRotateSpeed={1.5}
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={1}
                maxDistance={15}
                makeDefault
            />
        </Canvas>
    );
}
