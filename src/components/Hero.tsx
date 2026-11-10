"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
  onBookVisit: () => void;
}

export function Hero({ onExplore, onBookVisit }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll across the full 450vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Silky spring physics matching GSAP scrub: 0.1
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });

  // ─── 1. Initial Content (Headline, Subtext, CTA) ──────────────
  // On scroll: drifts down (+20%), shrinks slightly (0.92), fades out quickly
  const contentY = useTransform(progress, [0, 0.2], ["0%", "20%"]);
  const contentScale = useTransform(progress, [0, 0.2], [1, 0.92]);
  const contentOpacity = useTransform(progress, [0, 0.14], [1, 0]);
  const contentPointerEvents = useTransform(progress, (v) => (v < 0.1 ? "auto" : "none"));

  // ─── 2. Sky Background Photo ─────────────────────────────────
  const skyScale = useTransform(progress, [0, 1], [1.04, 1.0]);

  // ─── 3. House Cutout rising from the bottom ──────────────────
  const houseY = useTransform(progress, [0, 0.85], ["0%", "-36%"]);
  const houseScale = useTransform(progress, [0, 0.85], [1, 1.34]);
  const houseOpacity = useTransform(progress, [0, 0.4, 0.75], [1, 1, 0.6]);

  // ─── 4. UNIFIED ONYX WORDMARK (Outline + Masked Image as ONE) ─
  // Both live in the EXACT same SVG container and coordinates.
  // Outline appears first, then photo fills RIGHT OVER and INSIDE that same outline.
  const onyxContainerOpacity = useTransform(progress, [0.12, 0.22, 0.68, 0.82], [0, 1, 1, 0]);
  const onyxScale = useTransform(progress, [0.12, 0.75], [0.94, 1.28]);
  const onyxY = useTransform(progress, [0.12, 0.75], ["2%", "-10%"]);

  // Stroke outline: fades in first, framing the letters
  const strokeOpacity = useTransform(progress, [0.12, 0.2, 0.62, 0.75], [0, 1, 0.9, 0]);

  // Image fill: smoothly fades in RIGHT INSIDE the outline from 18% to 32% scroll!
  const imageFillOpacity = useTransform(progress, [0.18, 0.34, 0.68, 0.82], [0, 1, 1, 0]);

  // ─── 5. Clouds Parallax (parting laterally) ──────────────────
  const cloudLeftX = useTransform(progress, [0, 0.7], ["0%", "-28%"]);
  const cloudRightX = useTransform(progress, [0, 0.7], ["0%", "28%"]);
  const cloudsOpacity = useTransform(progress, [0, 0.5, 0.85], [0.95, 0.85, 0.3]);

  // ─── 6. Smoke / Volumetric Mist ──────────────────────────────
  const smokeY = useTransform(progress, [0, 0.65], ["70%", "0%"]);
  const smokeOpacity = useTransform(progress, [0, 0.2, 0.7], [0.2, 0.85, 1]);

  // ─── 7. Bottom Sand Blend Gradient ───────────────────────────
  const bottomOverlayOpacity = useTransform(progress, [0.65, 0.95], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] md:h-[450vh] bg-[#f6f5f0] text-[#141517] overflow-clip"
    >
      {/* ─── STICKY VIEWPORT (100vh) ───────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        
        {/* Layer 0: Full-Bleed Warm Golden-Hour Sunset Sky */}
        <motion.div
          style={{ scale: skyScale }}
          className="absolute inset-0 w-full h-full z-0 will-change-transform"
        >
          <Image
            src="/assets/hero_back.jpg"
            alt="Golden Sunset Sky"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Layer 1: Left & Right Parting Clouds */}
        <motion.div
          style={{ opacity: cloudsOpacity }}
          className="absolute inset-0 z-[2] pointer-events-none"
        >
          {/* Cloud 1 (Left) */}
          <motion.div
            style={{ x: cloudLeftX }}
            className="absolute top-[18%] md:top-[22%] -left-[20vw] md:-left-[12vw] w-[70vw] md:w-[50vw] h-auto aspect-[2248/954] will-change-transform"
          >
            <Image
              src="/assets/cloud.png"
              alt="Atmospheric Cloud"
              fill
              sizes="(max-width: 768px) 70vw, 50vw"
              className="object-contain"
            />
          </motion.div>

          {/* Cloud 2 (Right) */}
          <motion.div
            style={{ x: cloudRightX }}
            className="absolute top-[12%] md:top-[16%] -right-[20vw] md:-right-[12vw] w-[65vw] md:w-[45vw] h-auto aspect-[2248/954] will-change-transform"
          >
            <Image
              src="/assets/cloud.png"
              alt="Atmospheric Cloud"
              fill
              sizes="(max-width: 768px) 65vw, 45vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Layer 2: Main Rising House Cutout at the bottom */}
        <motion.div
          style={{
            y: houseY,
            scale: houseScale,
            opacity: houseOpacity,
            transformOrigin: "bottom center",
          }}
          className="absolute top-[56vh] md:top-[58vh] left-0 right-0 h-[120vh] md:h-[165vh] z-[3] pointer-events-none will-change-transform flex justify-center"
        >
          <div className="relative w-full max-w-[1720px] h-full mx-auto px-4 md:px-12">
            <Image
              src="/assets/house.png"
              alt="Luxury Architectural Estate"
              fill
              priority
              sizes="100vw"
              className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
            />
          </div>
        </motion.div>

        {/* Layer 3: UNIFIED ONYX WORDMARK (Outline + Image Mask inside ONE single SVG) */}
        {/* The outline appears first, and over that EXACT outline the estate image fills in */}
        <motion.div
          style={{
            opacity: onyxContainerOpacity,
            scale: onyxScale,
            y: onyxY,
          }}
          className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none will-change-transform px-6"
        >
          <svg
            viewBox="0 0 1000 400"
            className="w-[88vw] max-w-[1150px] h-auto overflow-visible drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <defs>
              {/* The exact clip-path definition for the ONYX letterforms */}
              <clipPath id="onyx-unified-clip">
                <text
                  x="500"
                  y="265"
                  textAnchor="middle"
                  fontFamily="var(--font-sans), system-ui, sans-serif"
                  fontWeight="900"
                  fontSize="260"
                  letterSpacing="0.08em"
                >
                  ONYX
                </text>
                <text
                  x="500"
                  y="325"
                  textAnchor="middle"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="32"
                  letterSpacing="0.4em"
                >
                  RESIDENCE &bull; UDUPI
                </text>
              </clipPath>
            </defs>

            {/* 1. THE PICTURE FILL: Revealed directly inside the ONYX letterforms */}
            <motion.g
              style={{ opacity: imageFillOpacity }}
              clipPath="url(#onyx-unified-clip)"
            >
              <image
                href="/assets/house.png"
                x="0"
                y="-120"
                width="1000"
                height="620"
                preserveAspectRatio="xMidYMid slice"
              />
              {/* Subtle warm golden ambient grade over the image */}
              <rect
                width="1000"
                height="400"
                fill="#c5a059"
                opacity="0.12"
                style={{ mixBlendMode: "color" }}
              />
            </motion.g>

            {/* 2. THE VECTOR STROKE OUTLINE: Sits on the EXACT same coordinates, perfectly hugging the image */}
            <motion.g style={{ opacity: strokeOpacity }}>
              {/* Main ONYX letter outline */}
              <text
                x="500"
                y="265"
                textAnchor="middle"
                fill="none"
                stroke="#c5a059"
                strokeWidth="2.5"
                fontFamily="var(--font-sans), system-ui, sans-serif"
                fontWeight="900"
                fontSize="260"
                letterSpacing="0.08em"
              >
                ONYX
              </text>
              {/* Secondary white hairline for crisp luxury contrast */}
              <text
                x="500"
                y="265"
                textAnchor="middle"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeOpacity="0.8"
                fontFamily="var(--font-sans), system-ui, sans-serif"
                fontWeight="900"
                fontSize="260"
                letterSpacing="0.08em"
              >
                ONYX
              </text>

              {/* Sub-label outline */}
              <text
                x="500"
                y="325"
                textAnchor="middle"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeOpacity="0.9"
                fontFamily="var(--font-mono), monospace"
                fontSize="32"
                letterSpacing="0.4em"
              >
                RESIDENCE &bull; UDUPI
              </text>
            </motion.g>
          </svg>
        </motion.div>

        {/* Layer 4: Smoke / Rising Coastal Mist */}
        <motion.div
          style={{
            y: smokeY,
            opacity: smokeOpacity,
          }}
          className="absolute -bottom-8 left-0 right-0 h-[48vh] md:h-[62vh] z-[6] pointer-events-none will-change-transform"
        >
          <Image
            src="/assets/smoke.png"
            alt="Misty Fog"
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
        </motion.div>

        {/* Layer 5: Bottom Sand Blend Gradient (transitions seamlessly to page content) */}
        <motion.div
          style={{ opacity: bottomOverlayOpacity }}
          className="absolute left-0 right-0 bottom-0 h-44 md:h-64 z-[7] pointer-events-none bg-gradient-to-b from-transparent via-[#f6f5f0]/80 to-[#f6f5f0]"
        />

        {/* Layer 6: Foreground Content (Overlays everything at page load) */}
        <motion.div
          style={{
            y: contentY,
            scale: contentScale,
            opacity: contentOpacity,
            pointerEvents: contentPointerEvents as any,
          }}
          className="relative z-[10] h-full flex flex-col items-center justify-center px-6 md:px-12 text-center pb-24 md:pb-36 will-change-transform"
        >
          <div className="max-w-6xl mx-auto space-y-5 md:space-y-6">
            {/* Giant Display Headline */}
            <h1 className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[7.6rem] tracking-tight text-[#151717] leading-[0.96]">
              Find Your Coastal Sanctuary
            </h1>

            {/* Editorial Subtitle with 50% opacity tail */}
            <p className="text-base sm:text-2xl md:text-3xl font-medium text-[#151717] tracking-tight max-w-3xl mx-auto leading-relaxed">
              Architectural rigor. Coastal serenity.{" "}
              <span className="text-[#151717]/50">A legacy in Udupi.</span>
            </p>

            {/* Black Pill CTA Action */}
            <div className="pt-3 md:pt-4 flex items-center justify-center gap-4">
              <button
                onClick={onExplore}
                className="group px-8 md:px-10 py-4 md:py-4.5 rounded-full bg-[#151717] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#9c8052] transition-colors duration-300 shadow-xl flex items-center gap-3"
              >
                <span>EXPLORE RESIDENCES</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onBookVisit}
                className="hidden sm:flex px-7 py-4 rounded-full border border-black/15 bg-white/70 hover:bg-white text-[#151717] font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-sm backdrop-blur-sm"
              >
                <span>BOOK VISIT</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Scroll Cue */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10] flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#151717]/60 pointer-events-none"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#9c8052]" />
        </motion.div>
      </div>
    </section>
  );
}
