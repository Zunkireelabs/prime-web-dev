"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { collections } from "@/data/collections";

const FEATURED_TILES = collections
  .filter((c) =>
    ["Porcelain", "Large Format", "Vitrified", "Special Edition"].includes(c.category)
  )
  .sort((a, b) => {
    // Breccia first
    if (a.name === "Breccia") return -1;
    if (b.name === "Breccia") return 1;
    return 0;
  });

// Preload all textures once — use HTML Image to support webp
const textureCache = new Map<string, THREE.Texture>();

function preloadTexture(url: string): Promise<THREE.Texture> {
  if (textureCache.has(url)) return Promise.resolve(textureCache.get(url)!);
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const tex = new THREE.Texture(img);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      textureCache.set(url, tex);
      resolve(tex);
    };
    img.onerror = () => {
      console.error(`Failed to load texture: ${url}`);
      resolve(new THREE.Texture());
    };
    img.src = url;
  });
}

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
  const [ready, setReady] = useState(false);

  // Load first texture
  useEffect(() => {
    const tile = FEATURED_TILES[0];
    preloadTexture(tile.image).then((tex) => {
      if (matRef.current) {
        matRef.current.map = tex;
        matRef.current.needsUpdate = true;
      }
      onTileChange?.({ name: tile.name, category: tile.category, sizes: tile.sizes });
      setReady(true);
    });
    // Preload the rest in background
    FEATURED_TILES.forEach((t, i) => { if (i > 0) preloadTexture(t.image); });
  }, []);

  // Cycle tiles — swap texture on ref, no re-render
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => {
        const next = (prev + 1) % FEATURED_TILES.length;
        const tile = FEATURED_TILES[next];
        const cached = textureCache.get(tile.image);
        if (cached && matRef.current) {
          matRef.current.map = cached;
          matRef.current.needsUpdate = true;
        }
        onTileChange?.({ name: tile.name, category: tile.category, sizes: tile.sizes });
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [ready, onTileChange]);

  // Smooth animation — no Float, no fighting
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
      {/* Single box — face texture on front, neutral sides */}
      <mesh>
        <boxGeometry args={[1.15, 1.15, 0.025]} />
        <meshStandardMaterial
          ref={matRef}
          roughness={0.18}
          metalness={0.02}
          envMapIntensity={0.6}
          color="#f5f0e8"
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
