import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export function StarsBackground() {
  const starsRef = useRef<THREE.Points>(null);

  useFrame((_state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y -= delta * 0.02;
      starsRef.current.rotation.x -= delta * 0.01;
    }
  });

  return (
    <Stars 
      ref={starsRef}
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0} 
      fade 
      speed={1} 
    />
  );
}
