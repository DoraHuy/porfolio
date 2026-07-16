import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';



// ─── Hacker Developer (Hoodie + Headphones) ──────────────────────────────────
function HackerDeveloper() {
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 1.5) * 0.01;
    }
    if (headRef.current) {
      // Bobbing head slightly to music
      headRef.current.rotation.x = -0.15 + Math.sin(t * 3) * 0.02;
      headRef.current.rotation.z = Math.sin(t * 1.5) * 0.02;
    }
  });

  const hoodieColor = '#0F121C';
  const pantsColor = '#080A10';
  const skinColor = '#E2B897';

  return (
    <group ref={bodyRef}>
      {/* ── Upper Body (Hoodie) ── */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.65, 0.75, 0.45]} />
        <meshStandardMaterial color={hoodieColor} roughness={0.7} />
      </mesh>
      
      {/* Hoodie Front Pocket */}
      <mesh position={[0, 0.7, 0.23]}>
        <boxGeometry args={[0.4, 0.25, 0.05]} />
        <meshStandardMaterial color={hoodieColor} roughness={0.7} />
      </mesh>

      {/* ── Head & Hood ── */}
      <group ref={headRef} position={[0, 1.35, 0]}>
        {/* Hood covering the head */}
        <mesh position={[0, 0.1, -0.05]}>
          <boxGeometry args={[0.45, 0.5, 0.45]} />
          <meshStandardMaterial color={hoodieColor} roughness={0.8} />
        </mesh>
        
        {/* Face (mostly hidden in shadow) */}
        <mesh position={[0, 0.05, 0.15]}>
          <boxGeometry args={[0.35, 0.35, 0.3]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>

        {/* Cyberpunk Visor / Glasses glowing */}
        <mesh position={[0, 0.15, 0.31]}>
          <boxGeometry args={[0.38, 0.08, 0.02]} />
          <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={2} toneMapped={false} />
        </mesh>

        {/* ── Headphones ── */}
        <group position={[0, 0.1, 0]}>
          {/* Headband over the hood */}
          <mesh position={[0, 0.26, 0]}>
            <boxGeometry args={[0.5, 0.04, 0.1]} />
            <meshStandardMaterial color="#111" roughness={0.3} />
          </mesh>
          <mesh position={[-0.23, 0.15, 0]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[0.04, 0.25, 0.1]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <mesh position={[0.23, 0.15, 0]} rotation={[0, 0, -0.5]}>
            <boxGeometry args={[0.04, 0.25, 0.1]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          
          {/* Ear cups */}
          <mesh position={[-0.26, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0.26, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.4} metalness={0.6} />
          </mesh>
          
          {/* Glowing rings on ear cups */}
          <mesh position={[-0.31, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <torusGeometry args={[0.08, 0.015, 16, 32]} />
            <meshStandardMaterial color="#AB47BC" emissive="#AB47BC" emissiveIntensity={2} toneMapped={false} />
          </mesh>
          <mesh position={[0.31, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <torusGeometry args={[0.08, 0.015, 16, 32]} />
            <meshStandardMaterial color="#AB47BC" emissive="#AB47BC" emissiveIntensity={2} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* ── Arms (Hoodie Sleeves) typing ── */}
      {[-0.4, 0.4].map((x, i) => (
        <group key={i}>
          {/* Upper arm */}
          <mesh position={[x, 0.95, 0]} rotation={[0, 0, x > 0 ? -0.2 : 0.2]}>
            <capsuleGeometry args={[0.09, 0.4, 4, 8]} />
            <meshStandardMaterial color={hoodieColor} roughness={0.7} />
          </mesh>
          {/* Forearm reaching to keyboard */}
          <mesh position={[x + (x > 0 ? 0.05 : -0.05), 0.72, -0.25]} rotation={[-0.8, 0, x > 0 ? -0.1 : 0.1]}>
            <capsuleGeometry args={[0.08, 0.45, 4, 8]} />
            <meshStandardMaterial color={hoodieColor} roughness={0.7} />
          </mesh>
          {/* Hands */}
          <mesh position={[x > 0 ? 0.35 : -0.35, 0.53, -0.52]}>
            <boxGeometry args={[0.12, 0.06, 0.12]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* ── Lower Body (Seated) ── */}
      <mesh position={[0, 0.14, 0.1]}>
        <boxGeometry args={[0.62, 0.28, 0.45]} />
        <meshStandardMaterial color={pantsColor} roughness={0.8} />
      </mesh>
      {[-0.18, 0.18].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0.0, 0.4]} rotation={[Math.PI / 2.1, 0, 0]}>
            <capsuleGeometry args={[0.11, 0.4, 4, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.8} />
          </mesh>
          <mesh position={[x, -0.3, 0.62]} rotation={[-0.5, 0, 0]}>
            <capsuleGeometry args={[0.09, 0.5, 4, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.8} />
          </mesh>
          {/* Sneaker */}
          <mesh position={[x, -0.6, 0.7]}>
            <boxGeometry args={[0.18, 0.12, 0.32]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
          {/* Sneaker accent */}
          <mesh position={[x, -0.6, 0.86]}>
            <boxGeometry args={[0.19, 0.04, 0.04]} />
            <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={1} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Monitor (facing +Z toward character who faces -Z) ───────────────────────
function Monitor() {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!screenRef.current) return;
    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.65 + Math.sin(clock.getElapsedTime() * 2.5) * 0.05;
  });

  return (
    <group position={[0, 0.03, -0.2]}>
      {/* Monitor stand */}
      <mesh position={[0, 0.25, -0.1]}>
        <boxGeometry args={[0.07, 0.5, 0.07]} />
        <meshStandardMaterial color="#12121A" roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.02, -0.1]}>
        <boxGeometry args={[0.32, 0.04, 0.28]} />
        <meshStandardMaterial color="#12121A" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Bezel */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[1.85, 1.1, 0.05]} />
        <meshStandardMaterial color="#0C0C18" roughness={0.4} metalness={0.75} />
      </mesh>

      {/* Screen — facing +Z (toward character) */}
      <mesh ref={screenRef} position={[0, 0.65, 0.028]}>
        <boxGeometry args={[1.72, 0.98, 0.008]} />
        <meshStandardMaterial
          color="#040C1E"
          emissive="#1040A0"
          emissiveIntensity={0.65}
          roughness={0}
        />
      </mesh>

      {/* Code line bars on screen */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 1.07 - i * 0.075;
        const palette = ['#4FC3F7','#AB47BC','#66BB6A','#90A4AE','#FFD54F','#EC407A'];
        const c = palette[i % palette.length];
        const w = 0.25 + Math.abs(Math.sin(i * 1.9)) * 0.75;
        const indent = Math.sin(i * 2.3 + 1) * 0.1 + 0.1;
        return (
          <mesh key={i} position={[-0.82 + indent + w / 2, y, 0.04]}>
            <boxGeometry args={[w, 0.028, 0.003]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.2} toneMapped={false} />
          </mesh>
        );
      })}

      {/* Blinking cursor */}
      <mesh position={[-0.55, 0.61, 0.04]}>
        <boxGeometry args={[0.013, 0.055, 0.003]} />
        <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={3} toneMapped={false} />
      </mesh>

      {/* Screen glow facing character */}
      <pointLight color="#1840B0" intensity={2} distance={3} position={[0, 0.65, 0.5]} />
    </group>
  );
}

// ─── Desk ────────────────────────────────────────────────────────────────────
function Desk() {
  return (
    <group>
      {/* Desk surface */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 0.06, 1.2]} />
        <meshStandardMaterial color="#0C0F1C" roughness={0.35} metalness={0.55} />
      </mesh>

      {/* Front glow edge (faces camera) */}
      <mesh position={[0, 0.034, 0.6]}>
        <boxGeometry args={[2.8, 0.018, 0.01]} />
        <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Desk legs */}
      {([[-1.3, -0.6, -0.5], [-1.3, -0.6, 0.5], [1.3, -0.6, -0.5], [1.3, -0.6, 0.5]] as [number,number,number][]).map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.055, 1.15, 0.055]} />
          <meshStandardMaterial color="#181828" roughness={0.3} metalness={0.85} />
        </mesh>
      ))}

      {/* Keyboard */}
      <mesh position={[0, 0.048, 0.1]}>
        <boxGeometry args={[0.78, 0.022, 0.28]} />
        <meshStandardMaterial color="#090912" roughness={0.5} metalness={0.7} />
      </mesh>
      {/* KB RGB strip */}
      <mesh position={[0, 0.06, -0.03]}>
        <boxGeometry args={[0.78, 0.006, 0.008]} />
        <meshStandardMaterial color="#AB47BC" emissive="#AB47BC" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.55, 0.048, 0.1]}>
        <capsuleGeometry args={[0.038, 0.095, 4, 8]} />
        <meshStandardMaterial color="#111118" roughness={0.4} metalness={0.75} />
      </mesh>

      {/* Coffee cup */}
      <mesh position={[1.1, 0.095, 0.15]}>
        <cylinderGeometry args={[0.06, 0.05, 0.13, 10]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.65} metalness={0.25} />
      </mesh>

      {/* Small plant */}
      <mesh position={[-1.1, 0.09, 0.15]}>
        <cylinderGeometry args={[0.055, 0.047, 0.1, 8]} />
        <meshStandardMaterial color="#1A0900" roughness={0.85} />
      </mesh>
      <mesh position={[-1.1, 0.2, 0.15]}>
        <sphereGeometry args={[0.085, 8, 8]} />
        <meshStandardMaterial color="#173020" roughness={0.9} />
      </mesh>

      {/* Note pad */}
      <mesh position={[-0.7, 0.043, 0.25]}>
        <boxGeometry args={[0.22, 0.01, 0.3]} />
        <meshStandardMaterial color="#ECF0F1" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ─── Chair ───────────────────────────────────────────────────────────────────
function Chair() {
  return (
    <group position={[0, -0.5, 0.75]}>
      <mesh>
        <boxGeometry args={[0.62, 0.065, 0.58]} />
        <meshStandardMaterial color="#0C1524" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.38, -0.26]}>
        <boxGeometry args={[0.60, 0.68, 0.065]} />
        <meshStandardMaterial color="#0C1524" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Lumbar accent */}
      <mesh position={[0, 0.2, -0.22]}>
        <boxGeometry args={[0.48, 0.055, 0.038]} />
        <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={0.8} toneMapped={false} />
      </mesh>
      {/* Arm rests */}
      {([-0.34, 0.34] as number[]).map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0.18, 0]}>
            <boxGeometry args={[0.055, 0.28, 0.055]} />
            <meshStandardMaterial color="#181828" roughness={0.4} metalness={0.7} />
          </mesh>
          <mesh position={[x, 0.32, 0.06]}>
            <boxGeometry args={[0.065, 0.045, 0.26]} />
            <meshStandardMaterial color="#101018" roughness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.55, 8]} />
        <meshStandardMaterial color="#181828" roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, -0.58, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.36, 0.055, 5]} />
        <meshStandardMaterial color="#111118" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
}

// ─── Full Scene ───────────────────────────────────────────────────────────────
export function DeskScene() {
  return (
    // Character faces -Z (toward monitor). Camera is at 45° left-side to see face.
    <group>
      {/* Desk at origin */}
      <Desk />

      {/* Monitor in front of character at -Z */}
      <Monitor />

      {/* Developer sits centered, slightly behind desk, rotated to face -Z (the monitor) */}
      <group position={[0, -0.45, 0.65]} rotation={[0, Math.PI, 0]}>
        <HackerDeveloper />
      </group>

      <Chair />

      {/* Scene lighting */}
      <pointLight color="#1840B0" intensity={1.8} distance={5} position={[0, 1.5, 0]} />
      <pointLight color="#ECEFF1" intensity={0.5} distance={6} position={[0, 4, 2]}  />
    </group>
  );
}
