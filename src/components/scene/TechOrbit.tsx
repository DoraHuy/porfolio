import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard, Image } from '@react-three/drei';
import * as THREE from 'three';

// ── Tech stack data ──────────────────────────────────────────────────────────
const TECH_STACK = [
  // Inner orbit (fast, small radius)
  { name: 'React',      color: '#61DAFB', orbit: 0, angle: 0,    radius: 3.2, speed: 0.5,  size: 0.28, inc: 0.3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Java',       color: '#F89820', orbit: 0, angle: 2.1,  radius: 3.2, speed: 0.5,  size: 0.3,  inc: 0.3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Spring',     color: '#6DB33F', orbit: 0, angle: 4.2,  radius: 3.2, speed: 0.5,  size: 0.26, inc: 0.3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },

  // Middle orbit (medium)
  { name: 'TypeScript', color: '#3178C6', orbit: 1, angle: 0,    radius: 4.5, speed: 0.32, size: 0.26, inc: -0.5, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Next.js',    color: '#FFFFFF', orbit: 1, angle: 1.57, radius: 4.5, speed: 0.32, size: 0.25, inc: -0.5, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Docker',     color: '#2496ED', orbit: 1, angle: 3.14, radius: 4.5, speed: 0.32, size: 0.27, inc: -0.5, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Redis',      color: '#DC382D', orbit: 1, angle: 4.71, radius: 4.5, speed: 0.32, size: 0.25, inc: -0.5, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },

  // Outer orbit (slow, large radius, different tilt)
  { name: 'PostgreSQL', color: '#336791', orbit: 2, angle: 0,    radius: 6.0, speed: 0.18, size: 0.26, inc: 0.8, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL',      color: '#00758F', orbit: 2, angle: 1.26, radius: 6.0, speed: 0.18, size: 0.24, inc: 0.8, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'Prisma',     color: '#5A67D8', orbit: 2, angle: 2.51, radius: 6.0, speed: 0.18, size: 0.24, inc: 0.8, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg' },
  { name: 'Tailwind',   color: '#06B6D4', orbit: 2, angle: 3.77, radius: 6.0, speed: 0.18, size: 0.26, inc: 0.8, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'GitHub',     color: '#FFFFFF', orbit: 2, angle: 5.03, radius: 6.0, speed: 0.18, size: 0.25, inc: 0.8, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
];

// Each orbiting tech logo
function TechBadge({ tech }: { tech: typeof TECH_STACK[0] }) {
  const pivotRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!pivotRef.current) return;
    const t = clock.getElapsedTime();
    // Rotate the pivot around the Y axis
    pivotRef.current.rotation.y = tech.angle + t * tech.speed;
  });

  return (
    // Outer group matches the inclination of the orbit ring
    <group rotation={[tech.inc * 0.4, 0, 0]}>
      {/* Pivot group that actually spins around the Y axis over time */}
      <group ref={pivotRef}>
        {/* The actual tech badge positioned at the radius */}
        <group position={[tech.radius, 0, 0]}>
          
          {/* Point light for local glow */}
          <pointLight color={tech.color} intensity={0.6} distance={2.5} />

          {/* Tech logo image centered */}
          <Billboard position={[0, 0, 0]}>
            <Image url={tech.icon} transparent scale={tech.size * 2} toneMapped={false} />
          </Billboard>

          {/* Tech name label floating just below the logo */}
          <Billboard position={[0, -tech.size * 1.5, 0]}>
            <Text
              fontSize={0.22}
              color={tech.color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.04}
              outlineColor="#000000"
            >
              {tech.name}
            </Text>
          </Billboard>
        </group>
      </group>
    </group>
  );
}



export function TechOrbit() {
  return (
    <group>
      {/* Tech logos */}
      {TECH_STACK.map((tech) => (
        <TechBadge key={tech.name} tech={tech} />
      ))}
    </group>
  );
}
