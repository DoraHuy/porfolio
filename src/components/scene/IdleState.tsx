import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { CodeRain } from './CodeRain';
import { DeskScene } from './DeskScene';
import { TechOrbit } from './TechOrbit';

export function IdleState({
  techOrbitRef,
  shockwaveRef,
}: {
  techOrbitRef: React.RefObject<THREE.Group | null>;
  shockwaveRef: React.RefObject<THREE.Mesh | null>;
}) {
  const appState   = useStore((s) => s.appState);
  const setAppState = useStore((s) => s.setAppState);

  useLayoutEffect(() => {
    // When the IdleState mounts (e.g., returning from Portfolio),
    // animate ONLY the TechOrbit flying back in.
    if (techOrbitRef.current && appState === 'IDLE') {
      techOrbitRef.current.position.y = 10;
      techOrbitRef.current.scale.set(0.01, 0.01, 0.01);
      techOrbitRef.current.rotation.y = Math.PI * -6;

      gsap.to(techOrbitRef.current.position, { y: 0, duration: 1.5, ease: 'power2.out' });
      gsap.to(techOrbitRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.out' });
      gsap.to(techOrbitRef.current.rotation, { y: 0, duration: 1.5, ease: 'power2.out' });
    }
  }, [appState, techOrbitRef]);

  if (appState !== 'IDLE' && appState !== 'TRANSITION') return null;

  return (
    <group 
      onClick={(e) => {
        // Catch clicks on the desk/character/tech meshes
        if (appState === 'IDLE') {
          e.stopPropagation();
          setAppState('TRANSITION');
        }
      }}
    >
      {/* Ensure camera points at the developer and allows user to orbit */}
      <OrbitControls
        target={[0, 0.5, 0]}
        minDistance={3}
        maxDistance={15}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2 + 0.15}
        makeDefault
      />

      {/* GSAP refs — invisible anchor meshes */}
      <mesh ref={shockwaveRef} position={[0, 0, 2]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <ringGeometry args={[0.8, 1.1, 64]} />
        <meshBasicMaterial color="#4FC3F7" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Main animated cluster */}
      <group position={[0, 0, 0]}>
        {/* ── Scrolling code backdrop ── */}
        <CodeRain />

        {/* ── Desk + developer ── */}
        <group position={[0, -0.5, 0]}>
          <DeskScene />

          {/* Tech logos orbiting around the developer — ONLY this will spin up */}
          <group ref={techOrbitRef as React.RefObject<THREE.Group>}>
            <TechOrbit />
          </group>
        </group>
      </group>
    </group>
  );
}
