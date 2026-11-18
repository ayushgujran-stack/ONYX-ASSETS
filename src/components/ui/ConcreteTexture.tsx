import React from "react";

interface ConcreteTextureProps {
  className?: string;
  /** "dark" for charcoal sections (#141416), "light" for cream (#fffdf1), "greige" for warm stone (#dcd9c8) */
  variant?: "dark" | "light" | "greige";
}

export function ConcreteTexture({
  className = "",
  variant = "dark",
}: ConcreteTextureProps) {
  const isDark = variant === "dark";

  // Noise opacity tuned per surface: dark needs brighter overlay, light/greige need barely-there grain
  const noiseOpacity =
    variant === "dark" ? "opacity-[0.055]" : variant === "greige" ? "opacity-[0.04]" : "opacity-[0.035]";

  // Formwork seam opacity: lighter on cream surfaces so they don't overpower
  const seamOpacity =
    variant === "dark" ? "opacity-[0.045]" : variant === "greige" ? "opacity-[0.035]" : "opacity-[0.030]";

  // Tie-rod dot opacity
  const dotOpacity =
    variant === "dark" ? "opacity-[0.12]" : variant === "greige" ? "opacity-[0.07]" : "opacity-[0.055]";

  // Seam colours
  const seamColor = isDark
    ? "rgba(255,255,255,0.3)"
    : variant === "greige"
    ? "rgba(0,0,0,0.2)"
    : "rgba(0,0,0,0.18)";

  // Dot colours
  const dotColor = isDark
    ? "rgba(255,255,255,0.6)"
    : variant === "greige"
    ? "rgba(0,0,0,0.4)"
    : "rgba(0,0,0,0.35)";

  // Vignette: dark = darker edges, light/greige = very subtle warm vignette
  const vignette = isDark
    ? "bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(20,20,22,0.65)_100%)]"
    : variant === "greige"
    ? "bg-[radial-gradient(circle_at_50%_40%,transparent_20%,rgba(190,185,165,0.30)_100%)]"
    : "bg-[radial-gradient(circle_at_50%_40%,transparent_20%,rgba(200,197,180,0.25)_100%)]";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      {/* ── Micro-aggregate mineral grain (feTurbulence fractalNoise) ── */}
      <svg
        className={`absolute inset-0 w-full h-full ${noiseOpacity}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={`concrete-grain-${variant}`} colorInterpolationFilters="linearRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#concrete-grain-${variant})`}
          style={{
            fill: isDark ? "white" : "black",
            mixBlendMode: isDark ? "overlay" : "multiply",
          }}
        />
      </svg>

      {/* ── Tadao Ando formwork seams: 420 × 260 px poured-slab grid ── */}
      <div
        className={`absolute inset-0 ${seamOpacity} bg-[size:420px_260px]`}
        style={{
          backgroundImage: `linear-gradient(to right, ${seamColor} 1px, transparent 1px), linear-gradient(to bottom, ${seamColor} 1px, transparent 1px)`,
        }}
      />

      {/* ── Tie-rod impressions at formwork intersections ── */}
      <div
        className={`absolute inset-0 ${dotOpacity} bg-[size:420px_260px]`}
        style={{
          backgroundImage: `radial-gradient(circle 2.5px at center, ${dotColor} 1px, transparent 2px)`,
        }}
      />

      {/* ── Soft ambient vignette for architectural dimensionality ── */}
      <div className={`absolute inset-0 pointer-events-none ${vignette}`} />
    </div>
  );
}
