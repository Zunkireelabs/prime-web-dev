"use client";

import { useEffect, useRef, useState } from "react";
import { Play, ArrowRight, Crosshair, MapPin } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const VR_MASK_PATH = [
  "M 100,20 H 565",
  "Q 645,20 645,100",
  "C 645,180 755,180 755,100",
  "Q 755,20 835,20",
  "H 1300 Q 1380,20 1380,100",
  "V 300 Q 1380,380 1300,380",
  "H 835 Q 755,380 755,300",
  "C 755,220 645,220 645,300",
  "Q 645,380 565,380",
  "H 100 Q 20,380 20,300",
  "V 100 Q 20,20 100,20 Z",
].join(" ");

const INVERTED_MASK = `M -10,-10 H 1410 V 410 H -10 Z ${VR_MASK_PATH}`;

export default function VirtualShowroom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth easing for mouse coordinates
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      smoothMouse.current.x += (mousePos.x - smoothMouse.current.x) * 0.1;
      smoothMouse.current.y += (mousePos.y - smoothMouse.current.y) * 0.1;

      if (containerRef.current) {
        // Frame Rotation
        const rotateX = smoothMouse.current.y * 12;
        const rotateY = smoothMouse.current.x * -12;
        
        // Inner Image Pan
        const panX = smoothMouse.current.x * 30;
        const panY = smoothMouse.current.y * 30;

        // Apply styles via CSS variables for performance
        containerRef.current.style.setProperty("--rx", `${rotateX}deg`);
        containerRef.current.style.setProperty("--ry", `${rotateY}deg`);
        containerRef.current.style.setProperty("--px", `${panX}px`);
        containerRef.current.style.setProperty("--py", `${panY}px`);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    // Normalize coordinates between -1 and 1
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x: x * 2, y: y * 2 }); // Range -1 to 1
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="bg-surface-dark overflow-hidden relative" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
      {/* Dynamic Background Glow - follows mouse slightly */}
      <div 
        className="absolute w-[1000px] h-[1000px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          opacity: isHovering ? 0.12 : 0.05,
          left: `calc(70% + ${mousePos.x * 50}px)`,
          top: `calc(50% + ${mousePos.y * 50}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center" style={{ gap: "64px", columnGap: "80px" }}>
          
          {/* ─── LEFT: Typography & Interface ─── */}
          <div className="lg:col-span-5 relative z-20">
            <FadeIn>
              <div className="flex items-center" style={{ gap: "16px", marginBottom: "24px" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <p className="eyebrow text-accent-light">
                  VR INTERFACE // ACTIVE
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-serif font-light italic text-white leading-[1.05] tracking-[-0.025em]" style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", marginBottom: "40px" }}>
                Virtual <br /> <span className="text-accent-light not-italic">Showroom</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="border-l-2 border-accent/30 bg-gradient-to-r from-white/5 to-transparent rounded-r-lg" style={{ paddingLeft: "32px", marginBottom: "48px", paddingTop: "24px", paddingBottom: "24px" }}>
                <p className="body-lg text-white/90 max-w-md leading-relaxed font-light">
                  Step inside our spaces before they exist. 
                  Experience Prime Ceramics through an immersive, high-fidelity lens. 
                  Inspect textures in 360° with architectural precision.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center" style={{ gap: "32px" }}>
                <a href="/dealers" className="group relative inline-flex items-center gap-4 px-8 py-4 bg-accent text-white overflow-hidden transition-all duration-500 hover:pr-12">
                  <span className="relative z-10 flex items-center gap-4 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
                    <Play size={14} fill="currentColor" /> Initialize 360°
                  </span>
                  <ArrowRight size={16} className="absolute right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10" />
                </a>
                
                <a href="/catalog" className="link-arrow text-white/70 hover:text-white text-[0.7rem] font-medium border-b border-white/20 pb-1">
                  Technical Specifications <ArrowRight size={14} />
                </a>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="grid grid-cols-2 border-t border-white/10" style={{ marginTop: "48px", gap: "48px", paddingTop: "32px" }}>
                <div>
                  <p className="text-[0.55rem] uppercase tracking-[0.3em] text-accent-light mb-2 flex items-center gap-2 font-bold">
                    <MapPin size={10}/> COORDINATES
                  </p>
                  <p className="font-serif text-white text-lg tracking-wider">27.7172° N, 85.3240° E</p>
                </div>
                <div>
                  <p className="text-[0.55rem] uppercase tracking-[0.3em] text-accent-light mb-2 flex items-center gap-2 font-bold">
                    <Crosshair size={10}/> RENDER MODE
                  </p>
                  <p className="font-serif text-white text-lg tracking-wider">ULTRA-HD RT</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ─── RIGHT: Interactive VR Parallax ─── */}
          <div className="lg:col-span-7 relative pt-10 lg:pt-0">
            <FadeIn delay={0.2} direction="left">
              <div 
                ref={containerRef}
                className="relative w-full aspect-[21/9] md:aspect-[24/9] lg:aspect-[2/1] cursor-crosshair perspective-[1500px]"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  "--rx": "0deg",
                  "--ry": "0deg",
                  "--px": "0px",
                  "--py": "0px",
                } as React.CSSProperties}
              >
                {/* Outter Glass Glow */}
                <div className={`absolute inset-[-20px] rounded-[60px] blur-[40px] transition-opacity duration-700 bg-accent ${isHovering ? "opacity-20" : "opacity-0"}`} />

                {/* 3D Wrapper */}
                <div 
                  className="absolute inset-0 w-full h-full transform-gpu transition-transform duration-150 ease-out"
                  style={{
                    transform: `rotateX(var(--rx)) rotateY(var(--ry)) ${isHovering ? "scale3d(1.08, 1.08, 1.08)" : "scale3d(1,1,1)"}`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  
                  {/* The Inner Image (Pans opposite to mouse) */}
                  <div className="absolute inset-[2px] overflow-hidden rounded-[40px]" style={{ transform: "translateZ(0px)" }}>
                     <img
                        src="/images/spaces/vr-showroom.jpg"
                        alt="Immersive Interior"
                        loading="lazy"
                        className="absolute inset-[-15%] w-[130%] h-[130%] object-cover transform-gpu transition-transform duration-150 ease-out"
                        style={{
                          transform: "translate3d(var(--px), var(--py), 0)",
                          filter: isHovering ? "brightness(1.1) contrast(1.1) saturate(1.1)" : "brightness(0.7) contrast(1.2) grayscale(0.2)",
                        }}
                     />
                  </div>

                  {/* The Mask (Hides outside of VR lenses) */}
                  <svg
                    viewBox="0 0 1400 400"
                    className="absolute inset-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ transform: "translateZ(1px)" }}
                  >
                    <defs>
                      <linearGradient id="lensGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                      </linearGradient>
                      
                      <filter id="hudGlow">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Solid Dark Border around lenses - perfectly matched to bg-dark */}
                    <path d={INVERTED_MASK} fill="var(--color-surface-dark)" fillRule="evenodd" />
                    
                    {/* Lens Reflective Layer */}
                    <path d={VR_MASK_PATH} fill="url(#lensGradient)" />

                    {/* Main Headset Outline - Sharp & Clean */}
                    <path
                      d={VR_MASK_PATH}
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="4"
                    />
                    
                    {/* Accent Outline - The "Active" Glow */}
                    <path
                      d={VR_MASK_PATH}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      style={{ 
                        opacity: isHovering ? 0.8 : 0.3,
                        filter: "url(#hudGlow)",
                        transition: "opacity 0.5s ease" 
                      }}
                    />

                    {/* HUD Elements - Left Lens */}
                    <g className={`transition-all duration-500 ${isHovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                      {/* Reticle */}
                      <circle cx="350" cy="200" r="30" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" strokeDasharray="2 6" />
                      <path d="M 335 200 L 365 200 M 350 185 L 350 215" stroke="var(--color-accent)" strokeWidth="1" />
                      <text x="310" y="245" fill="var(--color-accent)" fontSize="8" fontFamily="monospace" fontWeight="bold">LOCK_ON // P-01</text>
                    </g>

                    {/* HUD Elements - Right Lens */}
                    <g className={`transition-all duration-500 ${isHovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                      {/* Technical brackets */}
                      <path d="M 1000 120 L 1050 120 M 1000 120 L 1000 140" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                      <path d="M 1150 280 L 1100 280 M 1150 280 L 1150 260" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                      
                      {/* Data Stream */}
                      <rect x="1030" y="240" width="80" height="2" fill="rgba(255,255,255,0.1)" />
                      <rect x="1030" y="240" width="45" height="2" fill="var(--color-accent)">
                         <animate attributeName="width" values="0;80;45" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <text x="1030" y="235" fill="white" fontSize="9" fontFamily="monospace" opacity="0.6">TILE_DENSITY_SCAN</text>
                    </g>

                    {/* Center 360 Badge */}
                    <g className="transition-transform duration-500" style={{ transform: isHovering ? "translateY(-5px)" : "none" }}>
                      <circle cx="700" cy="360" r="22" fill="rgba(0,0,0,0.8)" stroke="var(--color-accent)" strokeWidth="1" />
                      <text x="700" y="364" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" letterSpacing="0.05em">360°</text>
                    </g>
                  </svg>
                  
                  {/* Digital Interference / Static (Subtle) */}
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isHovering ? "opacity-10" : "opacity-0"}`} 
                       style={{ 
                         backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                         filter: "invert(1)"
                       }} />
                  
                </div>

                {/* Corner Tech Brackets */}
                {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                  <div
                    key={pos}
                    className="absolute pointer-events-none z-30 transition-all duration-700 ease-out"
                    style={{
                      width: 45,
                      height: 45,
                      ...(pos.includes("t") ? { top: isHovering ? -20 : -5 } : { bottom: isHovering ? -20 : -5 }),
                      ...(pos.includes("l") ? { left: isHovering ? -20 : -5 } : { right: isHovering ? -20 : -5 }),
                      opacity: isHovering ? 1 : 0.3,
                    }}
                  >
                    <span
                      className="absolute bg-accent"
                      style={{
                        height: 2,
                        width: 30,
                        ...(pos.includes("t") ? { top: 0 } : { bottom: 0 }),
                        ...(pos.includes("l") ? { left: 0 } : { right: 0 }),
                      }}
                    />
                    <span
                      className="absolute bg-accent"
                      style={{
                        width: 2,
                        height: 30,
                        ...(pos.includes("t") ? { top: 0 } : { bottom: 0 }),
                        ...(pos.includes("l") ? { left: 0 } : { right: 0 }),
                      }}
                    />
                  </div>
                ))}

              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
