import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus, MeshDistortMaterial, Environment, Sphere } from "@react-three/drei";

function GeometricScene() {
    return (
        <group>
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
                <Icosahedron args={[1, 0]} position={[0, 0, 0]} scale={0.8}>
                    <MeshDistortMaterial
                        color="#8b5cf6"
                        envMapIntensity={0.8}
                        clearcoat={1}
                        transparent
                        opacity={0.8}
                        distort={0.4}
                        speed={2}
                    />
                </Icosahedron>
            </Float>

            <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
                <Torus args={[1.8, 0.1, 16, 100]} position={[0, 0, 0]} rotation={[1, 1, 0]}>
                    <meshStandardMaterial color="#ec4899" wireframe />
                </Torus>
            </Float>

            <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[0.3, 32, 32]} position={[2, 1, -1]}>
                    <meshStandardMaterial color="#06b6d4" roughness={0.2} metalness={0.8} />
                </Sphere>
            </Float>

            <Float speed={1} rotationIntensity={1} floatIntensity={1}>
                <Sphere args={[0.2, 32, 32]} position={[-2, -1.5, 0]}>
                    <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
                </Sphere>
            </Float>
        </group>
    );
}

export default function Hero3DElement() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <GeometricScene />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
