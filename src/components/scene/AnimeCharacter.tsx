import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { VRMLoaderPlugin, VRMUtils, VRMHumanBoneName } from '@pixiv/three-vrm';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

// Free sample VRM model from pixiv's three-vrm examples
const VRM_URL = 'https://pixiv.github.io/three-vrm/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm';

export function AnimeCharacter({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  const [vrm, setVrm] = useState<any>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      VRM_URL,
      (gltf) => {
        const loadedVrm = gltf.userData.vrm;
        VRMUtils.removeUnnecessaryVertices(gltf.scene);
        VRMUtils.combineSkeletons(gltf.scene);
        setVrm(loadedVrm);
      },
      undefined,
      (error) => console.error('VRM load error:', error)
    );
  }, []);

  useFrame(({ clock }) => {
    if (!vrm) return;

    const t = clock.getElapsedTime();

    // ── Breathing animation (spine oscillation) ──────────────────────────────
    const chest = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Chest);
    if (chest) {
      chest.rotation.x = Math.sin(t * 1.2) * 0.02;
    }

    // ── Head gently looking around ────────────────────────────────────────────
    const head = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Head);
    if (head) {
      head.rotation.y = Math.sin(t * 0.6) * 0.12;
      head.rotation.x = -0.1 + Math.sin(t * 0.4) * 0.04; // slightly looking up
    }

    // ── Left arm relaxed at side ─────────────────────────────────────────────
    const leftUpperArm = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.LeftUpperArm);
    if (leftUpperArm) {
      leftUpperArm.rotation.z = 0.4 + Math.sin(t * 1.2) * 0.02;
    }

    // ── Right arm raised — offering the tech cluster ─────────────────────────
    const rightUpperArm = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.RightUpperArm);
    if (rightUpperArm) {
      rightUpperArm.rotation.z = -1.1;
      rightUpperArm.rotation.x = 0.3;
    }
    const rightLowerArm = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.RightLowerArm);
    if (rightLowerArm) {
      rightLowerArm.rotation.x = -0.5;
    }
    const rightHand = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.RightHand);
    if (rightHand) {
      rightHand.rotation.x = 0.3; // palm facing up
    }

    // ── Hips subtle sway ─────────────────────────────────────────────────────
    const hips = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Hips);
    if (hips) {
      hips.rotation.y = Math.sin(t * 0.5) * 0.03;
      hips.position.y = Math.sin(t * 1.2) * 0.005 + (hips.userData._baseY ?? hips.position.y);
    }

    vrm.update(1 / 60);
  });

  if (!vrm) return null;

  return (
    <group ref={groupRef as React.RefObject<THREE.Group>} scale={1.1}>
      <primitive object={vrm.scene} />
    </group>
  );
}
