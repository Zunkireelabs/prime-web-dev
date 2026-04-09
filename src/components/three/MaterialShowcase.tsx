"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function TileSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const mousePos = useRef(new THREE.Vector3(0, 0, 2));
  const smoothPos = useRef(new THREE.Vector3(0, 0, 2));
  const { camera, size } = useThree();

  // Procedural tile texture
  const tileTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    // Rich warm marble base
    const grad = ctx.createRadialGradient(512, 512, 0, 512, 512, 600);
    grad.addColorStop(0, "#f0e8da");
    grad.addColorStop(0.4, "#e6dbc8");
    grad.addColorStop(0.7, "#ddd0b8");
    grad.addColorStop(1, "#d4c5ac");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Marble veins
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 15; i++) {
      ctx.strokeStyle = i % 3 === 0 ? "#a08060" : "#c0a880";
      ctx.lineWidth = Math.random() * 2 + 0.5;
      ctx.beginPath();
      let x = Math.random() * 1024;
      let y = Math.random() * 1024;
      ctx.moveTo(x, y);
      for (let j = 0; j < 6; j++) {
        x += (Math.random() - 0.5) * 300;
        y += (Math.random() - 0.5) * 300;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const handlePointerMove = useCallback(
    (e: THREE.Event) => {
      // Project mouse to 3D plane
      const ndc = new THREE.Vector2(
        ((e as any).clientX / size.width) * 2 - 1,
        -((e as any).clientY / size.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);

      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersect = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersect);
      if (intersect) {
        mousePos.current.set(intersect.x, intersect.y, 1.5);
      }
    },
    [camera, size]
  );

  useFrame(() => {
    // Smooth light follow
    smoothPos.current.lerp(mousePos.current, 0.08);
    if (lightRef.current) {
      lightRef.current.position.copy(smoothPos.current);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        rotation={[-0.15, 0.1, 0]}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry args={[3.2, 3.2, 1, 1]} />
        <meshPhysicalMaterial
          map={tileTexture}
          roughness={0.15}
          metalness={0}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          reflectivity={0.6}
          envMapIntensity={0.4}
          color="#f2ece2"
        />
      </mesh>

      {/* Mouse-following spotlight */}
      <pointLight
        ref={lightRef}
        color="#fff5e6"
        intensity={3}
        distance={5}
        decay={2}
      />
    </group>
  );
}

interface MaterialShowcaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function MaterialShowcase({
  className = "",
  style,
}: MaterialShowcaseProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.5], fov: 30 }}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "2px",
        ...style,
      }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[2, 4, 3]}
        intensity={0.8}
        color="#fff8f0"
      />
      <Environment preset="studio" environmentIntensity={0.2} />
      <TileSurface />
    </Canvas>
  );
}
