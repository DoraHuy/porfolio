import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { CodeRain } from './CodeRain';
import { DeskScene } from './DeskScene';
import { TechOrbit } from './TechOrbit';

export function IdleState({
  clusterRef,
  shockwaveRef,
}: {
  clusterRef: React.RefObject<THREE.Group | null>;
  shockwaveRef: React.RefObject<THREE.Mesh | null>;
}) {
  const appState   = useStore((s) => s.appState);

  if (appState !== 'IDLE' && appState !== 'TRANSITION') return null;

  return (
    <group>
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
      <group ref={clusterRef as React.RefObject<THREE.Group>} position={[0, 0, 0]}>
        {/* ── Scrolling code backdrop ── */}
        <CodeRain />

        {/* ── Desk + developer ── */}
        <group position={[0, -0.5, 0]}>
          <DeskScene />

          {/* Tech logos orbiting around the developer */}
          <TechOrbit />
        </group>
      </group>
    </group>
  );
}
