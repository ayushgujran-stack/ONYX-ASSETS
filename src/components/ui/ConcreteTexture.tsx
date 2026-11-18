import React from "react";

interface ConcreteTextureProps {
  className?: string;
  variant?: "dark" | "light";
}

export function ConcreteTexture({
  className = "",
  variant = "dark",
}: ConcreteTextureProps) {
  const isDark = variant === "dark";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      {/* SVG noise filter for micro-aggregate mineral grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.055]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={`concrete-grain-${variant}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#concrete-grain-${variant})`}
          className={isDark ? "fill-white mix-blend-overlay" : "fill-black mix-blend-multiply"}
        />
      </svg>

      {/* Tadao Ando architectural formwork seams: modular 420px x 260px poured slabs */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "opacity-[0.045] bg-[linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)]"
            : "opacity-[0.05] bg-[linear-gradient(to_right,rgba(0,0,0,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.25)_1px,transparent_1px)]"
        } bg-[size:420px_260px]`}
      />

      {/* Iconic architectural tie-rod impressions at formwork intersections */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "opacity-[0.12] bg-[radial-gradient(circle_2.5px_at_center,rgba(255,255,255,0.6)_1px,transparent_2px)]"
            : "opacity-[0.10] bg-[radial-gradient(circle_2.5px_at_center,rgba(0,0,0,0.5)_1px,transparent_2px)]"
        } bg-[size:420px_260px]`}
      />

      {/* Ambient soft vignette for architectural dimensionality */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(20,20,22,0.65)_100%)]"
            : "bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(220,217,200,0.45)_100%)]"
        }`}
      />
    </div>
  );
}
