import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { StarsBackground } from './StarsBackground';
import { IdleState } from './IdleState';
import { PortfolioUniverse } from './PortfolioUniverse';
import { Suspense, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';
import gsap from 'gsap';

function SceneContent() {
  const appState = useStore((s) => s.appState);
  const setAppState = useStore((s) => s.setAppState);

  // Refs passed down to IdleState so SceneContent drives GSAP
  const techOrbitRef      = useRef<THREE.Group>(null);
  const shockwaveRef    = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (appState === 'TRANSITION') {
      const tl = gsap.timeline({ onComplete: () => setAppState('PORTFOLIO') });

      // 0s — shockwave expand & fade
      if (shockwaveRef.current) {
        tl.to(shockwaveRef.current.scale, { x: 30, y: 30, z: 30, duration: 0.6, ease: 'power2.out' }, 0);
        tl.to((shockwaveRef.current.material as THREE.MeshBasicMaterial), { opacity: 0, duration: 0.6 }, 0);
      }

      // 0.2s — TechOrbit ascends & spins into vortex
      if (techOrbitRef.current) {
        tl.to(techOrbitRef.current.position, { y: 10, duration: 2.0, ease: 'power2.inOut' }, 0.2);
        tl.to(techOrbitRef.current.rotation, { y: Math.PI * 6, duration: 2.0, ease: 'power2.inOut' }, 0.2);
        tl.to(techOrbitRef.current.scale,    { x: 0.01, y: 0.01, z: 0.01, duration: 0.8, ease: 'power3.in' }, 1.4);
      }
    }
  }, [appState, setAppState]);

  return (
    <>
      {/* Camera at back-right 45° angle — sees hacker from behind facing screens */}
      <PerspectiveCamera makeDefault position={[8, 4, 8]} fov={45} />
      <color attach="background" args={['#0A0A0F']} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 15, 5]} intensity={0.8} color="#4FC3F7" />
      <directionalLight position={[-10, -5, -10]} intensity={0.4} color="#AB47BC" />

      <StarsBackground />

      <IdleState
        techOrbitRef={techOrbitRef}
        shockwaveRef={shockwaveRef}
      />

      <PortfolioUniverse />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.6}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
      </EffectComposer>

      <Environment preset="night" />
    </>
  );
}

export function SceneManager() {
  const setAppState = useStore((s) => s.setAppState);

  useEffect(() => {
    const t = setTimeout(() => setAppState('IDLE'), 1200);
    return () => clearTimeout(t);
  }, [setAppState]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, cursor: 'pointer' }}>
      <Canvas 
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        onPointerMissed={() => {
          if (useStore.getState().appState === 'IDLE') {
            setAppState('TRANSITION');
          }
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
