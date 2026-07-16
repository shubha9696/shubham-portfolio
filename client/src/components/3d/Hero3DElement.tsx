import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Hero3DElement() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth interactive rotation based on mouse coordinates + time
    const targetX = state.mouse.y * 0.8;
    const targetY = state.mouse.x * 0.8;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetX + time * 0.05,
      0.03
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetY + time * 0.08,
      0.03
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      {/* @ts-ignore */}
      <meshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.45}
        speed={2.2}
        roughness={0.15}
        metalness={0.9}
      />
    </mesh>
  );
}
