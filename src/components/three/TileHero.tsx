"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// Local tile images for 3D hero — same-origin, no CORS issues
const TILES = [
  { name: "Breccia", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "/images/tiles/breccia.webp" },
  { name: "Botticino", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "/images/tiles/bottichino.webp" },
  { name: "Onyx", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "/images/tiles/onyx.webp" },
  { name: "Carrara White", category: "Marble Look", sizes: ["600×1200 mm"], image: "/images/tiles/carrara-white.webp" },
  { name: "Smoky Grey", category: "Stone Look", sizes: ["600×600 mm"], image: "/images/tiles/smoky-grey.webp" },
  { name: "Driftwood", category: "Wood Look", sizes: ["600×600 mm"], image: "/images/tiles/driftwood.webp" },
  { name: "Sand Beige", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "/images/tiles/sand-beige.webp" },
  { name: "Armani Bianca", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "/images/tiles/armani-bianca.webp" },
  { name: "3D Glass", category: "Special Edition", sizes: ["600×600 mm"], image: "/images/tiles/3d-glass.webp" },
  { name: "Spirit of Nepal", category: "Cultural Heritage", sizes: ["300×600 mm"], image: "/images/tiles/spirit-of-nepal.webp" },
];

function FloatingTile({
  scrollProgress,
  onTileChange,
}: {
  scrollProgress: React.MutableRefObject<number>;
  onTileChange?: (tile: { name: string; category: string; sizes: string[] }) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Load texture for current tile
  useEffect(() => {
    const tile = TILES[currentIdx];
    if (!tile) return;

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    loader.load(
      tile.image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        if (matRef.current) {
          matRef.current.map = tex;
          matRef.current.color.set("#ffffff");
          matRef.current.needsUpdate = true;
        }
      },
      undefined,
      (err) => {
        console.error(`Failed to load tile texture: ${tile.image}`, err);
      }
    );

    onTileChange?.({ name: tile.name, category: tile.category, sizes: tile.sizes });
  }, [currentIdx, onTileChange]);

  // Cycle tiles every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % TILES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Smooth animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollProgress.current;

    groupRef.current.rotation.y = t * 0.15 + scroll * 0.5;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.06 + scroll * 0.05;
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.025;

    const s = 1 - scroll * 0.08;
    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.15, 1.15, 0.025]} />
        <meshStandardMaterial
          ref={matRef}
          roughness={0.18}
          metalness={0.02}
          envMapIntensity={0.6}
          color="#ffffff"
        />
      </mesh>
    </group>
  );
}

interface TileHeroProps {
  scrollProgress: React.MutableRefObject<number>;
  onTileChange?: (tile: { name: string; category: string; sizes: string[] }) => void;
}

export default function TileHero({ scrollProgress, onTileChange }: TileHeroProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.4], fov: 32 }}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "48%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#fff8f0" />
      <directionalLight position={[-2, 1, 3]} intensity={0.4} color="#e8e4f0" />
      <spotLight position={[-1, 3, -2]} intensity={0.6} color="#b58a52" angle={0.5} penumbra={1} />
      <Environment preset="studio" environmentIntensity={0.35} />
      <FloatingTile scrollProgress={scrollProgress} onTileChange={onTileChange} />
    </Canvas>
  );
}
