"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_VERTEX = `
  attribute float aSize;
  attribute float aAlpha;
  attribute float aSpeed;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vAlpha = aAlpha;

    vec3 pos = position;
    // Upward drift
    pos.y = mod(pos.y + uTime * aSpeed * 0.08, 4.0) - 2.0;
    // Sinusoidal horizontal sway
    pos.x += sin(uTime * 0.3 + position.z * 2.0) * 0.15 * aSpeed;
    pos.z += cos(uTime * 0.25 + position.x * 1.5) * 0.1 * aSpeed;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
  }
`;

const PARTICLE_FRAGMENT = `
  varying float vAlpha;

  void main() {
    // Soft radial gradient circle
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
    // Gold color: #b58a52 = rgb(181, 138, 82)
    gl_FragColor = vec4(0.71, 0.54, 0.32, alpha);
  }
`;

function Particles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const uniformsRef = useRef({ uTime: { value: 0 } });

  const [positions, sizes, alphas, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const al = new Float32Array(count);
    const sp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3; // z
      sz[i] = Math.random() * 3 + 1;
      al[i] = Math.random() * 0.4 + 0.1;
      sp[i] = Math.random() * 1.5 + 0.5;
    }
    return [pos, sz, al, sp];
  }, [count]);

  useFrame((state) => {
    uniformsRef.current.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aAlpha"
          count={count}
          array={alphas}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={count}
          array={speeds}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={PARTICLE_VERTEX}
        fragmentShader={PARTICLE_FRAGMENT}
        uniforms={uniformsRef.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface ParticleFieldProps {
  count?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParticleField({
  count = 200,
  className = "",
  style,
}: ParticleFieldProps) {
  return (
    <Canvas
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3], fov: 50 }}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        ...style,
      }}
    >
      <Particles count={count} />
    </Canvas>
  );
}
