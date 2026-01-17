import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, Icosahedron } from "@react-three/drei";

export default function Hero3DElement() {
    const meshRef = useRef<any>(null);
    const knotRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
        if (knotRef.current) {
            knotRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <group>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
                <Sphere args={[1, 100, 100]} scale={1.4}>
                    <MeshDistortMaterial
                        color="#7e22ce"
                        speed={4}
                        distort={0.45}
                        radius={1}
                        emissive="#4c1d95"
                        emissiveIntensity={0.5}
                    />
                </Sphere>
            </Float>

            <Float speed={4} rotationIntensity={3} floatIntensity={1.5}>
                <mesh scale={1.6} ref={meshRef}>
                    <torusKnotGeometry args={[0.5, 0.05, 128, 32]} />
                    <MeshWobbleMaterial
                        color="#06b6d4"
                        speed={3}
                        factor={0.4}
                        wireframe={true}
                    />
                </mesh>
            </Float>

            <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[2, 2, -2]}>
                <Icosahedron args={[0.5, 1]}>
                    <meshStandardMaterial color="#ec4899" wireframe />
                </Icosahedron>
            </Float>

            <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[-2, -2, -2]}>
                <Icosahedron args={[0.4, 0]}>
                    <meshStandardMaterial color="#f59e0b" wireframe />
                </Icosahedron>
            </Float>

            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#9333ea" />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#06b6d4" />
        </group>
    );
}
