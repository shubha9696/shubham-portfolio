import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Hero3DElement() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !pointsRef.current || !meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth target rotation based on mouse coordinates
    const targetX = state.mouse.y * 0.7;
    const targetY = state.mouse.x * 0.7;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.05
    );

    // Subtle counter-rotations for layered depth
    pointsRef.current.rotation.y = time * 0.08;
    meshRef.current.rotation.y = -time * 0.04;
    
    // Breathing scale effect
    const scale = 1 + Math.sin(time * 1.5) * 0.03;
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef}>
      {/* Outer Point Cloud Grid (Neural Net Cluster) */}
      <points ref={pointsRef}>
        <sphereGeometry args={[1.6, 48, 48]} />
        <pointsMaterial
          color="#3b82f6"
          size={0.035}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner Wireframe Structure */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.58, 20, 20]} />
        <meshBasicMaterial
          color="#a855f7"
          wireframe={true}
          transparent={true}
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Core Glowing Node */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent={true}
          opacity={0.4}
        />
      </mesh>
      
      {/* Tiny orbital nodes */}
      <mesh position={[1.4, 0.5, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      <mesh position={[-1.2, -0.8, 0.5]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
    </group>
  );
}
