"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Compass, Sparkles } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
  onBookVisit: () => void;
}

export function Hero({ onExplore, onBookVisit }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking across the 350vh cinematic track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Physics springs for ultra-smooth 60fps tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // 1. Camera Zoom & Push-in on the Estate
  const estateScale = useTransform(smoothProgress, [0, 0.7, 1], [1, 1.28, 1.42]);
  const estateY = useTransform(smoothProgress, [0, 1], ["0%", "-6%"]);

  // 2. The Monumental "ONYX" Lettering Mask:
  // Starts at scale 1 (framing the villa inside the letters), then expands past the screen
  const maskScale = useTransform(smoothProgress, [0, 0.2, 0.65], [1, 1.15, 14]);
  const maskOpacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.9, 0]);

  // Stroke Outline of the ONYX Wordmark:
  const strokeScale = useTransform(smoothProgress, [0, 0.25, 0.6], [1, 1.3, 8]);
  const strokeOpacity = useTransform(smoothProgress, [0, 0.35, 0.55], [0.75, 0.5, 0]);

  // 3. Natural Atmospheric Coastal Mist & Fog parting laterally
  const mistLeftX = useTransform(smoothProgress, [0, 0.6], ["0%", "-40%"]);
  const mistRightX = useTransform(smoothProgress, [0, 0.6], ["0%", "40%"]);
  const mistOpacity = useTransform(smoothProgress, [0, 0.5, 0.85], [0.85, 0.6, 0.15]);

  // 4. Revealed Headline & Dual CTAs (emerges as camera pushes through the letters)
  const contentOpacity = useTransform(smoothProgress, [0.45, 0.75], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.45, 0.75], [40, 0]);
  const contentPointerEvents = useTransform(smoothProgress, (v) => (v > 0.4 ? "auto" : "none"));

  // 5. Initial scroll prompt (visible at top, fades on scroll)
  const initialPromptOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[280vh] md:h-[350vh] bg-[#0c0d0f] text-[#f6f5f0]"
    >
      {/* Sticky 100vh Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Layer 1: Ambient Tropical Dusk Sky & Horizon Glow */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0c0d0f] via-[#15171c] to-[#0c0d0f]" />

        {/* Ambient warm sunrise/sunset illumination pulse */}
        <motion.div
          animate={{
            opacity: [0.35, 0.6, 0.35],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[55vh] rounded-full bg-radial from-[#c5a059]/25 via-[#9c8052]/10 to-transparent blur-[120px] pointer-events-none z-[1]"
        />

        {/* Layer 2: Main Estate Visual (Sampoorna Villa Dusk Elevation) */}
        <motion.div
          style={{
            scale: estateScale,
            y: estateY,
          }}
          className="absolute inset-[-5%] w-[110%] h-[110%] z-[2] will-change-transform"
        >
          <Image
            src="https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Sampoorna%20Big%20Villa%20Elevation.jpeg"
            alt="Onyx Sanctuary Villa Dusk Elevation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.62] contrast-[1.12] saturate-[0.95]"
          />

          {/* Tropical Coastal Foliage Silhouettes & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f] via-transparent to-[#0c0d0f]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0f]/75 via-transparent to-[#0c0d0f]/75" />
        </motion.div>

        {/* Layer 3: The Monumental "ONYX" Lettering Mask (FindRealEstate inspired cutout) */}
        <motion.div
          style={{
            scale: maskScale,
            opacity: maskOpacity,
          }}
          className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none will-change-transform"
        >
          {/* Giant Cutout Typography in bold architectural proportions */}
          <svg
            viewBox="0 0 1000 400"
            className="w-[85vw] max-w-[1280px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <defs>
              <mask id="onyx-cutout-mask">
                {/* White base fills everywhere */}
                <rect width="1000" height="400" fill="white" />
                {/* Black letters punch holes through the mask */}
                <text
                  x="500"
                  y="265"
                  textAnchor="middle"
                  fill="black"
                  fontFamily="var(--font-sans), system-ui, sans-serif"
                  fontWeight="900"
                  fontSize="285"
                  letterSpacing="0.04em"
                >
                  ONYX
                </text>
              </mask>
            </defs>

            {/* Dark veil that masks the scene, revealing it inside the ONYX letters */}
            <rect
              width="1000"
              height="400"
              fill="#0c0d0f"
              mask="url(#onyx-cutout-mask)"
            />
          </svg>
        </motion.div>

        {/* Layer 3b: Vector Hairline Stroke Outline of ONYX */}
        <motion.div
          style={{
            scale: strokeScale,
            opacity: strokeOpacity,
          }}
          className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none will-change-transform"
        >
          <svg
            viewBox="0 0 1000 400"
            className="w-[85vw] max-w-[1280px] h-auto pointer-events-none"
          >
            <text
              x="500"
              y="265"
              textAnchor="middle"
              fill="transparent"
              stroke="#c5a059"
              strokeWidth="2.5"
              strokeOpacity="0.85"
              fontFamily="var(--font-sans), system-ui, sans-serif"
              fontWeight="900"
              fontSize="285"
              letterSpacing="0.04em"
            >
              ONYX
            </text>
          </svg>
        </motion.div>

        {/* Layer 4: Natural Coastal Mist & Parting Fog Layers */}
        <motion.div
          style={{
            x: mistLeftX,
            opacity: mistOpacity,
          }}
          className="absolute -bottom-10 -left-20 w-[60vw] h-[50vh] z-[6] pointer-events-none will-change-transform"
        >
          <Image
            src="/assets/cloud.png"
            alt="Atmospheric Mist"
            fill
            sizes="60vw"
            className="object-contain object-left-bottom opacity-70 filter blur-[1px] mix-blend-screen"
          />
        </motion.div>

        <motion.div
          style={{
            x: mistRightX,
            opacity: mistOpacity,
          }}
          className="absolute -bottom-10 -right-20 w-[65vw] h-[55vh] z-[6] pointer-events-none will-change-transform"
        >
          <Image
            src="/assets/smoke.png"
            alt="Coastal River Mist"
            fill
            sizes="65vw"
            className="object-contain object-right-bottom opacity-65 filter blur-[2px] mix-blend-screen"
          />
        </motion.div>

        {/* Layer 5: Initial Arrival Prompt (fades out as you scroll down) */}
        <motion.div
          style={{ opacity: initialPromptOpacity }}
          className="relative z-[8] pt-28 px-6 md:px-12 flex justify-between items-start max-w-[1720px] mx-auto w-full pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#c5a059] uppercase">
              ARCHITECTURAL INTRO • UDUPI
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase block">
              COASTAL LATITUDE
            </span>
            <span className="text-xs font-mono text-white/80">
              13.3409° N, 74.7421° E
            </span>
          </div>
        </motion.div>

        {/* Layer 6: Revealed Final Hero Content & Dual Actions */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
            pointerEvents: contentPointerEvents as any,
          }}
          className="relative z-[10] max-w-[1720px] mx-auto px-6 md:px-12 w-full pb-16 flex flex-col items-center text-center will-change-transform"
        >
          <motion.div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#c5a059] text-[11px] font-mono tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ARCHITECTURAL FLAGSHIP</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-light tracking-tight leading-[0.95]">
              Bespoke Coastal Residences
            </h1>

            <p className="text-sm sm:text-lg text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
              Where architectural rigor meets coastal serenity. Crafted by Onyx
              Assets across Udupi&apos;s most sought-after riverfront and coastal
              ridges.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <motion.button
                onClick={onExplore}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group px-8 py-4 rounded-full bg-[#c5a059] text-[#121316] font-mono text-xs font-semibold uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-xl flex items-center gap-3"
              >
                <span>EXPLORE RESIDENCES</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              <motion.button
                onClick={onBookVisit}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-4 rounded-full border border-white/30 bg-black/30 hover:bg-white hover:text-[#121316] text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <span>BOOK A VISIT</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Scroll Telemetry / Cue Bar */}
        <div className="relative z-[8] max-w-[1720px] mx-auto px-6 md:px-12 w-full pb-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-white/50">
          <div className="flex items-center gap-6">
            <span>(EST. 1994)</span>
            <span className="hidden sm:inline">30+ YEARS COASTAL LEGACY</span>
          </div>

          <motion.div
            style={{ opacity: initialPromptOpacity }}
            className="flex items-center gap-2 text-[#c5a059]"
          >
            <span>SCROLL TO ENTER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
