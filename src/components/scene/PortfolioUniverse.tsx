import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, MeshDistortMaterial, Sparkles, Line } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';
import type { PortfolioModule } from '../../store/useStore';

// ─── About Station ───────────────────────────────────────────────────────────
function AboutStation({ isActive }: { isActive: boolean }) {
  const torusKnotRef = useRef<THREE.Mesh>(null);
  const orbitRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusKnotRef.current) {
      torusKnotRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusKnotRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.z = state.clock.elapsedTime * 0.8;
    }
  });

  const accentColor = '#ECEFF1';

  return (
    <group>
      {/* Core: rotating torus knot */}
      <mesh ref={torusKnotRef}>
        <torusKnotGeometry args={[1, 0.32, 128, 16, 2, 3]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={isActive ? 0.6 : 0.15}
          roughness={0.1}
          metalness={0.9}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting ring */}
      <mesh ref={orbitRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.04, 8, 64]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={isActive ? 2 : 0.5}
          toneMapped={false}
        />
      </mesh>

      {/* Sparkle particles around it */}
      <Sparkles count={30} scale={4} size={2} speed={0.3} color={accentColor} />

      {/* Point light for local glow */}
      <pointLight color={accentColor} intensity={isActive ? 2 : 0.5} distance={8} />
    </group>
  );
}

// ─── Skill Garden ────────────────────────────────────────────────────────────
function SkillTree({ color, offset }: { color: string; offset: [number, number, number] }) {
  const treeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + offset[0]) * 0.15;
    }
  });

  return (
    <group ref={treeRef} position={offset}>
      {/* Trunk */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 1.2, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} toneMapped={false} roughness={0.5} />
      </mesh>

      {/* Branch levels */}
      {[
        { y: 0.7, scale: 1.0 },
        { y: 1.2, scale: 0.7 },
        { y: 1.6, scale: 0.45 },
      ].map((tier, i) => (
        <mesh key={i} position={[0, tier.y, 0]}>
          <coneGeometry args={[0.55 * tier.scale, 0.7 * tier.scale, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5 + i * 0.2}
            toneMapped={false}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Glowing top gem */}
      <mesh position={[0, 2.1, 0]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} toneMapped={false} />
      </mesh>
    </group>
  );
}

function SkillGarden({ isActive }: { isActive: boolean }) {
  const trees = [
    { color: '#4FC3F7', offset: [-1.2, -0.6, 1.2] as [number, number, number] },   // Frontend
    { color: '#1565C0', offset: [ 1.2, -0.6, 1.2] as [number, number, number] },   // Backend
    { color: '#AB47BC', offset: [-1.2, -0.6,-1.2] as [number, number, number] },   // Database
    { color: '#FFA726', offset: [ 1.2, -0.6,-1.2] as [number, number, number] },   // DevOps
  ];

  return (
    <group>
      {/* Ground island */}
      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.5, 0.3, 6]} />
        <meshStandardMaterial color="#12121A" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* Glowing hex edge */}
      <mesh position={[0, -0.74, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.04, 6, 6]} />
        <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={isActive ? 3 : 1} toneMapped={false} />
      </mesh>

      {trees.map((t, i) => <SkillTree key={i} color={t.color} offset={t.offset} />)}
      <Sparkles count={25} scale={5} size={1.5} speed={0.2} color="#4FC3F7" />
      <pointLight color="#4FC3F7" intensity={isActive ? 3 : 1} distance={10} />
    </group>
  );
}

// ─── Project Solar System ─────────────────────────────────────────────────────
function OrbitingPlanet({ radius, speed, size, color, ringColor, offset }: {
  radius: number; speed: number; size: number;
  color: string; ringColor?: string; offset?: number;
}) {
  const pivotRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y = state.clock.elapsedTime * speed + (offset ?? 0);
    }
  });

  return (
    <group ref={pivotRef}>
      <group position={[radius, 0, 0]}>
        <mesh>
          <sphereGeometry args={[size, 24, 24]} />
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.3} distort={0.15} speed={2} roughness={0.4} metalness={0.6} />
        </mesh>
        {ringColor && (
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[size * 1.8, size * 0.12, 4, 32]} />
            <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={0.8} toneMapped={false} transparent opacity={0.7} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function ProjectSolarSystem({ isActive }: { isActive: boolean }) {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const orbits = [
    { r: 2.8, s: 0.4, color: '#4FC3F7', size: 0.45, ring: '#AB47BC' },
    { r: 4.2, s: 0.22, color: '#66BB6A', size: 0.65, ring: undefined },
    { r: 5.8, s: 0.14, color: '#FFA726', size: 0.5,  ring: '#FFD54F' },
    { r: 7.2, s: 0.08, color: '#EC407A', size: 0.35, ring: undefined },
  ];

  return (
    <group>
      {/* Central sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#FFD54F"
          emissive="#FFD54F"
          emissiveIntensity={isActive ? 4 : 2}
          toneMapped={false}
          roughness={0.1}
        />
      </mesh>
      <pointLight color="#FFD54F" intensity={isActive ? 8 : 3} distance={20} />

      {/* Orbit rings (static) */}
      {orbits.map((o, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[o.r, 0.01, 4, 128]} />
          <meshBasicMaterial color="#ECEFF1" transparent opacity={0.08} />
        </mesh>
      ))}

      {/* Orbiting planets */}
      {orbits.map((o, i) => (
        <OrbitingPlanet key={i} radius={o.r} speed={o.s} color={o.color} size={o.size} ringColor={o.ring} offset={i * 1.2} />
      ))}

      <Sparkles count={20} scale={12} size={1.5} speed={0.1} color="#FFD54F" />
    </group>
  );
}

// ─── Education Constellation ──────────────────────────────────────────────────
function EducationConstellation({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  const stars = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], size: 0.35, label: 'CS Degree', color: '#FFD54F' },
    { pos: [2.5, 1, 0.5] as [number, number, number], size: 0.22, label: 'AWS Cert', color: '#FFA726' },
    { pos: [-2, 1.5, 1] as [number, number, number], size: 0.2,  label: 'Docker',   color: '#4FC3F7' },
    { pos: [1, -1.5, 2] as [number, number, number], size: 0.18, label: 'Spring',   color: '#66BB6A' },
    { pos: [-1, -1, -2] as [number, number, number], size: 0.17, label: 'React',    color: '#AB47BC' },
    { pos: [3, -0.5, -1] as [number, number, number], size: 0.16, label: 'DevOps',  color: '#EC407A' },
  ], []);

  // Build connection lines (pairs of star indices)
  const connections = [[0,1],[0,2],[0,3],[0,4],[1,5],[2,4]];

  const linePoints = useMemo(() =>
    connections.map(([a, b]) => [
      new THREE.Vector3(...stars[a].pos),
      new THREE.Vector3(...stars[b].pos),
    ]), [stars]);

  return (
    <group ref={groupRef}>
      {/* Constellation lines */}
      {linePoints.map((pts, i) => (
        <Line key={i} points={pts} color="#4FC3F7" transparent opacity={0.25} lineWidth={1} />
      ))}

      {/* Stars */}
      {stars.map((s, i) => (
        <group key={i} position={s.pos}>
          {/* Outer glow sphere */}
          <mesh>
            <sphereGeometry args={[s.size * 1.6, 12, 12]} />
            <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.4} toneMapped={false} transparent opacity={0.18} />
          </mesh>
          {/* Star core — octahedron */}
          <mesh>
            <octahedronGeometry args={[s.size, 0]} />
            <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={isActive ? 3 : 1.2} toneMapped={false} roughness={0.1} metalness={0.9} />
          </mesh>
          <pointLight color={s.color} intensity={0.8} distance={4} />
        </group>
      ))}
      <Sparkles count={35} scale={8} size={2} speed={0.15} color="#AB47BC" />
      <pointLight color="#AB47BC" intensity={isActive ? 2 : 0.5} distance={12} />
    </group>
  );
}

// ─── Main Module Component ────────────────────────────────────────────────────
const MODULE_DEFS = [
  { id: 'ABOUT'     as PortfolioModule, position: [0, 0, -18] as [number,number,number], label: 'About Station',         color: '#ECEFF1' },
  { id: 'SKILLS'    as PortfolioModule, position: [-18, 0, 0] as [number,number,number], label: 'Skill Garden',          color: '#4FC3F7' },
  { id: 'PROJECTS'  as PortfolioModule, position: [18, 0, 0]  as [number,number,number], label: 'Project Solar System',  color: '#FFD54F' },
  { id: 'EDUCATION' as PortfolioModule, position: [0, 0, 18]  as [number,number,number], label: 'Education Constellation', color: '#AB47BC' },
];

export function PortfolioUniverse() {
  const appState    = useStore((s) => s.appState);
  const activeModule = useStore((s) => s.activeModule);
  const setActiveModule = useStore((s) => s.setActiveModule);
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  const handleModuleClick = (id: PortfolioModule, pos: [number, number, number]) => {
    setActiveModule(id);
    const dir = new THREE.Vector3(...pos).normalize();
    const camTarget = new THREE.Vector3(...pos).addScaledVector(dir, 12);
    gsap.to(camera.position, { x: camTarget.x, y: pos[1] + 6, z: camTarget.z, duration: 2.0, ease: 'power3.inOut' });
    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, { x: pos[0], y: pos[1], z: pos[2], duration: 2.0, ease: 'power3.inOut' });
    }
  };

  useEffect(() => {
    // When entering the Portfolio Universe, automatically zoom into the ABOUT station
    // so the user immediately sees their intro portfolio page.
    if (appState === 'PORTFOLIO' && !activeModule) {
      const aboutDef = MODULE_DEFS.find((m) => m.id === 'ABOUT');
      if (aboutDef) {
        // slight delay to ensure controls are mounted and scene is ready
        setTimeout(() => {
          handleModuleClick(aboutDef.id, aboutDef.position);
        }, 100);
      }
    }
  }, [appState, activeModule]);

  if (appState !== 'PORTFOLIO') return null;

  return (
    <group>
      <OrbitControls ref={controlsRef} enablePan={false} maxDistance={55} minDistance={8} />

      {/* Outer orbit ring connecting all modules */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[18, 0.05, 4, 128]} />
        <meshBasicMaterial color="#4FC3F7" transparent opacity={0.15} />
      </mesh>

      {MODULE_DEFS.map((mod) => {
        const isActive = activeModule === mod.id;
        return (
          <group
            key={mod.id ?? mod.label}
            position={mod.position}
            onClick={(e) => { e.stopPropagation(); handleModuleClick(mod.id, mod.position); }}
          >
            {mod.id === 'ABOUT'     && <AboutStation isActive={isActive} />}
            {mod.id === 'SKILLS'    && <SkillGarden  isActive={isActive} />}
            {mod.id === 'PROJECTS'  && <ProjectSolarSystem isActive={isActive} />}
            {mod.id === 'EDUCATION' && <EducationConstellation isActive={isActive} />}

            {/* Label */}
            <Text
              position={[0, 3.8, 0]}
              fontSize={1.1}
              color={isActive ? '#FFFFFF' : mod.color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.06}
              outlineColor="#000000"
              font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gozuPa.woff2"
            >
              {mod.label}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
