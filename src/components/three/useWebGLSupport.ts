"use client";

import { useState, useEffect } from "react";

export type WebGLTier = "high" | "medium" | "low" | "none";

export function useWebGLSupport(): WebGLTier {
  const [tier, setTier] = useState<WebGLTier>("none");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setTier("none");
        return;
      }

      const isWebGL2 = gl instanceof WebGL2RenderingContext;
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : "";

      const isMobile =
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        window.innerWidth < 768;

      // Detect low-end GPUs
      const isLowEnd =
        /SwiftShader|llvmpipe|Mesa/i.test(renderer) ||
        (!isWebGL2 && isMobile);

      if (isLowEnd) {
        setTier("low");
      } else if (isMobile) {
        setTier("medium");
      } else {
        setTier("high");
      }

      canvas.remove();
    } catch {
      setTier("none");
    }
  }, []);

  return tier;
}
