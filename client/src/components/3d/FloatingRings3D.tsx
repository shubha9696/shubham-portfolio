import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Torus } from "@react-three/drei";

function Ring({ position, color, size, speed }: any) {
    const ref = useRef<any>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.getElapsedTime() * speed;
            ref.current.rotation.y = state.clock.getElapsedTime() * (speed * 0.8);
        }
    });

    return (
        <Float speed={speed * 2} rotationIntensity={1} floatIntensity={1} position={position}>
            <Torus ref={ref} args={[size, 0.02, 16, 100]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </Torus>
        </Float>
    );
}

export default function FloatingRings3D() {
    return (
        <group>
            <Ring position={[-3, 1, -2]} color="#9333ea" size={1.2} speed={0.2} />
            <Ring position={[3, -2, -3]} color="#ec4899" size={0.8} speed={0.3} />
            <Ring position={[2, 3, -4]} color="#3b82f6" size={1.5} speed={0.1} />
            <Ring position={[-4, -3, -5]} color="#f59e0b" size={1.0} speed={0.25} />
        </group>
    );
}
