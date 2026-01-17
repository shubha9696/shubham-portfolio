import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function Stars(props: any) {
    const ref = useRef<any>(null);

    const sphere = useMemo(() => {
        const points = new Float32Array(5000);
        for (let i = 0; i < points.length; i += 3) {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 1.5 * Math.pow(Math.random(), 1 / 3);
            points[i] = r * Math.sin(phi) * Math.cos(theta);
            points[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            points[i + 2] = r * Math.cos(phi);
        }
        return points;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#9333ea"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars />
            </Canvas>
        </div>
    );
}
