import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Constants for the 5,000 particles
const PARTICLE_COUNT = 4000;

function FlowFieldPoints() {
  const pointsRef = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();

  // Mouse coords tracker
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Map screen coordinates to normalized device coordinates (-1 to 1)
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate target shapes coordinate pools
  const { torusKnotPos, spherePos, gridPos, spiralPos } = useMemo(() => {
    const torus = new Float32Array(PARTICLE_COUNT * 3);
    const sphere = new Float32Array(PARTICLE_COUNT * 3);
    const grid = new Float32Array(PARTICLE_COUNT * 3);
    const spiral = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // 1. Torus Knot Position
      const t = (i / PARTICLE_COUNT) * Math.PI * 2 * 20; // Multiple wraps
      const p = 2; // Torus knot parameters
      const q = 3;
      const r = 1.2 + Math.sin(t * 10) * 0.1; // Add noise
      const xT = r * (2 + Math.cos(q * t)) * Math.cos(p * t);
      const yT = r * (2 + Math.cos(q * t)) * Math.sin(p * t);
      const zT = r * Math.sin(q * t);
      torus[i3] = xT * 0.5;
      torus[i3 + 1] = yT * 0.5;
      torus[i3 + 2] = zT * 0.5;

      // 2. Sphere (Brain) Position
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const rad = 1.8 + Math.sin(theta * 5) * Math.cos(phi * 5) * 0.2; // Brain lobes noise
      sphere[i3] = rad * Math.sin(phi) * Math.cos(theta);
      sphere[i3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      sphere[i3 + 2] = rad * Math.cos(phi);

      // 3. Grid Position
      const cols = 80;
      const col = i % cols;
      const row = Math.floor(i / cols);
      grid[i3] = (col / cols - 0.5) * 6;
      grid[i3 + 1] = (row / (PARTICLE_COUNT / cols) - 0.5) * 6;
      grid[i3 + 2] = Math.sin(col * 0.2) * Math.cos(row * 0.2) * 0.5;

      // 4. Galaxy Spiral Position
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 * 8; // Spiral wraps
      const dist = (i / PARTICLE_COUNT) * 3;
      const spiralNoiseX = (Math.random() - 0.5) * 0.25;
      const spiralNoiseY = (Math.random() - 0.5) * 0.25;
      spiral[i3] = Math.cos(angle) * dist + spiralNoiseX;
      spiral[i3 + 1] = Math.sin(angle) * dist + spiralNoiseY;
      spiral[i3 + 2] = (Math.random() - 0.5) * 0.2;
    }

    return { torusKnotPos, spherePos, gridPos, spiralPos };
  }, []);

  // Initialize active vertex arrays
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    // Initial fill matching Torus shape
    for (let i = 0; i < pos.length; i++) {
      pos[i] = torusKnotPos[i];
    }

    // Glowing cyan/violet gradient colors
    const color1 = new THREE.Color("#3b82f6"); // Cyan Blue
    const color2 = new THREE.Color("#a855f7"); // Violet Purple
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const mixRatio = i / PARTICLE_COUNT;
      const finalColor = color1.clone().lerp(color2, mixRatio);
      col[i3] = finalColor.r;
      col[i3 + 1] = finalColor.g;
      col[i3 + 2] = finalColor.b;
    }

    return [pos, col];
  }, [torusKnotPos]);

  // Main rendering loop updates
  useFrame((state) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    const time = state.clock.getElapsedTime();

    // 1. Calculate scroll percentage (0.0 to 1.0)
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;

    // 2. Interpolate mouse positions smoothly
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, 0.05);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, 0.05);

    // 3. Interpolate particle targets based on scroll segments
    let targetPool = torusKnotPos;
    let transitionProgress = 0;

    if (scrollPercent <= 0.33) {
      // Transition Torus -> Sphere
      const ratio = scrollPercent / 0.33;
      for (let i = 0; i < posAttr.count; i++) {
        const i3 = i * 3;
        posAttr.setX(i, THREE.MathUtils.lerp(posAttr.getX(i), torusKnotPos[i3] * (1 - ratio) + spherePos[i3] * ratio, 0.08));
        posAttr.setY(i, THREE.MathUtils.lerp(posAttr.getY(i), torusKnotPos[i3+1] * (1 - ratio) + spherePos[i3+1] * ratio, 0.08));
        posAttr.setZ(i, THREE.MathUtils.lerp(posAttr.getZ(i), torusKnotPos[i3+2] * (1 - ratio) + spherePos[i3+2] * ratio, 0.08));
      }
    } else if (scrollPercent <= 0.66) {
      // Transition Sphere -> Grid
      const ratio = (scrollPercent - 0.33) / 0.33;
      for (let i = 0; i < posAttr.count; i++) {
        const i3 = i * 3;
        posAttr.setX(i, THREE.MathUtils.lerp(posAttr.getX(i), spherePos[i3] * (1 - ratio) + gridPos[i3] * ratio, 0.08));
        posAttr.setY(i, THREE.MathUtils.lerp(posAttr.getY(i), spherePos[i3+1] * (1 - ratio) + gridPos[i3+1] * ratio, 0.08));
        posAttr.setZ(i, THREE.MathUtils.lerp(posAttr.getZ(i), spherePos[i3+2] * (1 - ratio) + gridPos[i3+2] * ratio, 0.08));
      }
    } else {
      // Transition Grid -> Galaxy Spiral
      const ratio = (scrollPercent - 0.66) / 0.34;
      for (let i = 0; i < posAttr.count; i++) {
        const i3 = i * 3;
        posAttr.setX(i, THREE.MathUtils.lerp(posAttr.getX(i), gridPos[i3] * (1 - ratio) + spiralPos[i3] * ratio, 0.08));
        posAttr.setY(i, THREE.MathUtils.lerp(posAttr.getY(i), gridPos[i3+1] * (1 - ratio) + spiralPos[i3+1] * ratio, 0.08));
        posAttr.setZ(i, THREE.MathUtils.lerp(posAttr.getZ(i), gridPos[i3+2] * (1 - ratio) + spiralPos[i3+2] * ratio, 0.08));
      }
    }

    // 4. Wave physics & Mouse Interaction (Curl Noise simulation)
    const mousePos = new THREE.Vector3(
      mouseRef.current.x * viewport.width * 0.5,
      mouseRef.current.y * viewport.height * 0.5,
      0
    );

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);

      // Add atmospheric curl wave motion
      const waveX = Math.sin(y * 1.5 + time) * 0.012;
      const waveY = Math.cos(x * 1.5 + time) * 0.012;
      
      posAttr.setX(i, x + waveX);
      posAttr.setY(i, y + waveY);

      // Mouse attraction/repulsion dynamics
      const pPos = new THREE.Vector3(x, y, z);
      const dist = pPos.distanceTo(mousePos);
      if (dist < 1.2) {
        const force = (1.2 - dist) * 0.06;
        const dir = pPos.clone().sub(mousePos).normalize();
        
        posAttr.setX(i, x + dir.x * force);
        posAttr.setY(i, y + dir.y * force);
        posAttr.setZ(i, z + dir.z * force);
      }
    }

    // Global rotation
    pointsRef.current.rotation.z = time * 0.03;
    pointsRef.current.rotation.y = time * 0.015;

    posAttr.needsUpdate = true;
  });

  // Create a glowing circular texture on the fly (saving asset load latency)
  const dotTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        map={dotTexture}
        vertexColors={true}
        transparent={true}
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function CosmicFlowfield() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-slate-950/20">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <FlowFieldPoints />
      </Canvas>
    </div>
  );
}
