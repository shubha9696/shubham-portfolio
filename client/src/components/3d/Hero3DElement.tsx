import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from "@react-three/drei";

export default function Hero3DElement() {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere args={[1, 64, 64]} scale={1.2}>
                    <MeshDistortMaterial
                        color="#581c87"
                        speed={3}
                        distort={0.4}
                        radius={1}
                    />
                </Sphere>
            </Float>
            <Float speed={3} rotationIntensity={2} floatIntensity={2}>
                <mesh scale={1.5} ref={meshRef}>
                    <torusKnotGeometry args={[0.5, 0.1, 128, 32]} />
                    <MeshWobbleMaterial
                        color="#ec4899"
                        speed={2}
                        factor={0.6}
                        wireframe={true}
                    />
                </mesh>
            </Float>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1.5} />
            <pointLight position={[-2, -5, -2]} intensity={1} color="#9333ea" />
        </group>
    );
}
