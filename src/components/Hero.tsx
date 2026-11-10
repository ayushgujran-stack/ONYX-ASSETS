"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
  onBookVisit: () => void;
}

// Geometric, monumental display paths for O N Y X in viewBox 0 0 1000 320
// Bold stroke widths ensure rich visibility of the V4 Greens architecture inside each letter.
const ONYX_PATHS = [
  // O (evenodd punches inner oval cleanly in both mask and stroke outline)
  "M 150 30 C 215 30 255 75 255 160 C 255 245 215 290 150 290 C 85 290 45 245 45 160 C 45 75 85 30 150 30 Z M 150 86 C 122 86 103 108 103 160 C 103 212 122 234 150 234 C 178 234 197 212 197 160 C 197 108 178 86 150 86 Z",
  // N
  "M 295 290 L 295 30 L 354 30 L 436 198 L 436 30 L 495 30 L 495 290 L 436 290 L 354 122 L 354 290 Z",
  // Y
  "M 525 30 L 590 30 L 630 135 L 670 30 L 735 30 L 658 185 L 658 290 L 602 290 L 602 185 Z",
  // X
  "M 760 30 L 826 30 L 857.5 106 L 889 30 L 955 30 L 891 160 L 955 290 L 889 290 L 857.5 214 L 826 290 L 760 290 L 824 160 Z",
];

// Build single self-contained SVG data URI using exact geometric coordinates (zero font mismatch)
const ONYX_MASK_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='320' viewBox='0 0 1000 320'>${ONYX_PATHS.map(
  (d) => `<path d='${d}' fill='black' fill-rule='evenodd'/>`
).join("")}</svg>`;

const ONYX_MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(ONYX_MASK_SVG)}")`;

export function Hero({ onExplore, onBookVisit }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll across the 450vh sticky sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring scrub physics
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.0005,
  });

  // ─── 1. Foreground Headline & CTA ─────────────────────────────
  // Visible at top of page, shrinks and fades cleanly as you start scrolling
  const contentY = useTransform(progress, [0, 0.18], ["0%", "18%"]);
  const contentScale = useTransform(progress, [0, 0.18], [1, 0.92]);
  const contentOpacity = useTransform(progress, [0, 0.13], [1, 0]);
  const contentPointerEvents = useTransform(progress, (v) =>
    v < 0.1 ? "auto" : "none"
  );

  // ─── 2. Sky Background ────────────────────────────────────────
  const skyScale = useTransform(progress, [0, 1], [1.04, 1.0]);

  // ─── 3. Shared House Transform (Pixel-Locked for Unmasked + Masked) ─
  // Starts peeking at bottom behind text (y: 34%), rises behind center ONYX outline (y: 2%), then drifts gently
  const houseY = useTransform(progress, [0, 0.36, 1], ["34%", "4%", "-4%"]);
  const houseScale = useTransform(progress, [0, 0.36, 1], [0.92, 1.08, 1.15]);

  // Unmasked full house: visible initially as it rises behind the hollow outline,
  // then disappears (0.36 -> 0.50) leaving ONLY the portion trapped inside the ONYX mask!
  const unmaskedHouseOpacity = useTransform(progress, [0, 0.36, 0.5], [1, 1, 0]);

  // Masked copy: sits at identical coordinates and activates smoothly BEFORE unmasked fades out,
  // ensuring zero visual jump when the background house disappears.
  const maskedHouseOpacity = useTransform(
    progress,
    [0.24, 0.32, 0.9, 1],
    [0, 1, 1, 0.9]
  );

  // ─── 4. Hollow ONYX Vector Outline ────────────────────────────
  // Appears & draws its strokes OVER the rising house (0.14 -> 0.30).
  // Remains hollow showing the real house behind it, then frames the trapped masked house!
  const outlineOpacity = useTransform(progress, [0.12, 0.2, 0.9, 1], [0, 1, 1, 0.9]);
  const outlinePathLength = useTransform(progress, [0.12, 0.32], [0, 1]);

  // Subtle subtitle stamp beneath the trapped ONYX outline after capture
  const badgeOpacity = useTransform(progress, [0.46, 0.56, 0.92, 1], [0, 1, 1, 0.85]);

  // ─── 5. Parting Clouds ────────────────────────────────────────
  const cloudLeftX = useTransform(progress, [0, 0.7], ["0%", "-26%"]);
  const cloudRightX = useTransform(progress, [0, 0.7], ["0%", "26%"]);
  const cloudsOpacity = useTransform(progress, [0, 0.5, 0.9], [0.9, 0.8, 0.45]);

  // ─── 6. Rising Mist / Smoke at Bottom ─────────────────────────
  const smokeY = useTransform(progress, [0, 0.7], ["65%", "5%"]);
  const smokeOpacity = useTransform(progress, [0, 0.2, 0.7], [0.25, 0.75, 0.95]);

  // ─── 7. Seamless Sand Footer Blend into #f6f5f0 Section Below ─
  const bottomOverlayOpacity = useTransform(progress, [0.68, 0.98], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] md:h-[440vh] bg-[#f6f5f0] text-[#141517] overflow-clip"
    >
      {/* ─── STICKY 100vh VIEWPORT ───────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* Layer 0: Warm Golden Sunset Sky */}
        <motion.div
          style={{ scale: skyScale }}
          className="absolute inset-0 w-full h-full z-0 will-change-transform"
        >
          <Image
            src="/assets/hero_back.jpg"
            alt="Golden Coastal Dusk Sky"
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
          <motion.div
            style={{ x: cloudLeftX }}
            className="absolute top-[16%] md:top-[20%] -left-[22vw] md:-left-[12vw] w-[72vw] md:w-[50vw] h-auto aspect-[2248/954] will-change-transform"
          >
            <Image
              src="/assets/cloud.png"
              alt="Atmospheric Cloud Left"
              fill
              sizes="(max-width: 768px) 72vw, 50vw"
              className="object-contain"
              style={{ mixBlendMode: "screen" }}
            />
          </motion.div>

          <motion.div
            style={{ x: cloudRightX }}
            className="absolute top-[12%] md:top-[15%] -right-[22vw] md:-right-[12vw] w-[66vw] md:w-[46vw] h-auto aspect-[2248/954] will-change-transform"
          >
            <Image
              src="/assets/cloud.png"
              alt="Atmospheric Cloud Right"
              fill
              sizes="(max-width: 768px) 66vw, 46vw"
              className="object-contain"
              style={{ mixBlendMode: "screen" }}
            />
          </motion.div>
        </motion.div>

        {/* Layer 2: Unmasked Full V4 Greens Villa Cutout */}
        {/* Rises behind the hollow outline, then vanishes leaving only what is captured inside ONYX */}
        <motion.div
          style={{
            opacity: unmaskedHouseOpacity,
            y: houseY,
            scale: houseScale,
            transformOrigin: "center bottom",
          }}
          className="absolute inset-0 z-[3] flex items-end justify-center pointer-events-none will-change-transform"
        >
          <div className="relative w-[96vw] md:w-[78vw] max-w-[1240px] h-[74vh] md:h-[86vh]">
            <Image
              src="/assets/v4_greens_cutout.png"
              alt="Onyx V4 Greens Architectural Cutout"
              fill
              priority
              sizes="(max-width: 768px) 96vw, 78vw"
              className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.28)]"
            />
          </div>
        </motion.div>

        {/* Layer 3: Masked Copy of V4 Greens Villa (EXACT pixel-locked sibling of Layer 2) */}
        {/* Static center viewport mask reveals ONLY the pixels of Layer 2 sitting behind the ONYX letters */}
        <motion.div
          style={{
            opacity: maskedHouseOpacity,
            WebkitMaskImage: ONYX_MASK_URL,
            WebkitMaskPosition: "center center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "min(86vw, 1080px) calc(min(86vw, 1080px) * 0.32)",
            maskImage: ONYX_MASK_URL,
            maskPosition: "center center",
            maskRepeat: "no-repeat",
            maskSize: "min(86vw, 1080px) calc(min(86vw, 1080px) * 0.32)",
          }}
          className="absolute inset-0 z-[4] pointer-events-none"
        >
          {/* Identical animated building inside the stationary stencil mask */}
          <motion.div
            style={{
              y: houseY,
              scale: houseScale,
              transformOrigin: "center bottom",
            }}
            className="absolute inset-0 flex items-end justify-center will-change-transform"
          >
            <div className="relative w-[96vw] md:w-[78vw] max-w-[1240px] h-[74vh] md:h-[86vh]">
              <Image
                src="/assets/v4_greens_cutout.png"
                alt="V4 Greens Architectural Texture Inside ONYX"
                fill
                priority
                sizes="(max-width: 768px) 96vw, 78vw"
                className="object-contain object-bottom brightness-[1.06] contrast-[1.05]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 4: Crisp Hollow Vector Outline of ONYX (Matches Mask Box Pixel-for-Pixel) */}
        <motion.div
          style={{ opacity: outlineOpacity }}
          className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"
        >
          <svg
            viewBox="0 0 1000 320"
            className="w-[86vw] max-w-[1080px] aspect-[1000/320] overflow-visible"
          >
            {ONYX_PATHS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: outlinePathLength }}
                className="drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
              />
            ))}
            {/* Subtle warm gold hairline accent */}
            {ONYX_PATHS.map((d, i) => (
              <motion.path
                key={`gold-${i}`}
                d={d}
                fill="none"
                stroke="#c5a059"
                strokeWidth="1.2"
                strokeOpacity="0.85"
                style={{ pathLength: outlinePathLength }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Caption stamped smoothly below the centered ONYX outline (positioned absolutely so it never shifts SVG center) */}
        <motion.div
          style={{ opacity: badgeOpacity }}
          className="absolute inset-x-0 top-[calc(50%+min(15vw,190px))] z-[5] flex justify-center pointer-events-none"
        >
          <div className="flex items-center gap-3 text-[11px] md:text-xs font-mono uppercase tracking-[0.35em] text-[#151717]/80 bg-white/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/50 shadow-sm">
            <span>RESIDENCE COLLECTION</span>
            <span className="text-[#9c8052]">&bull;</span>
            <span>UDUPI, KARNATAKA</span>
          </div>
        </motion.div>

        {/* Layer 5: Rising White Atmospheric Mist */}
        <motion.div
          style={{
            y: smokeY,
            opacity: smokeOpacity,
          }}
          className="absolute -bottom-8 left-0 right-0 h-[44vh] md:h-[58vh] z-[6] pointer-events-none will-change-transform"
        >
          <Image
            src="/assets/smoke.png"
            alt="Rising Coastal Mist"
            fill
            sizes="100vw"
            className="object-cover object-top"
            style={{ mixBlendMode: "screen" }}
          />
        </motion.div>

        {/* Layer 6: Seamless Bottom Blend into Sand Background (#f6f5f0) */}
        <motion.div
          style={{ opacity: bottomOverlayOpacity }}
          className="absolute left-0 right-0 bottom-0 h-44 md:h-64 z-[7] pointer-events-none bg-gradient-to-b from-transparent via-[#f6f5f0]/85 to-[#f6f5f0]"
        />

        {/* Layer 7: Foreground Hero Headline & Actions (Scrolls away smoothly) */}
        <motion.div
          style={{
            y: contentY,
            scale: contentScale,
            opacity: contentOpacity,
            pointerEvents: contentPointerEvents as any,
          }}
          className="relative z-[10] h-full flex flex-col items-center justify-center px-6 md:px-12 text-center pb-28 md:pb-40 will-change-transform"
        >
          <div className="max-w-6xl mx-auto space-y-5 md:space-y-6">
            <h1 className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight text-[#151717] leading-[0.96]">
              Find Your Coastal Sanctuary
            </h1>

            <p className="text-base sm:text-2xl md:text-3xl font-medium text-[#151717] tracking-tight max-w-3xl mx-auto leading-relaxed">
              Architectural rigor. Coastal serenity.{" "}
              <span className="text-[#151717]/50">A legacy in Udupi.</span>
            </p>

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
                className="hidden sm:flex px-7 py-4 rounded-full border border-black/15 bg-white/75 hover:bg-white text-[#151717] font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-sm backdrop-blur-sm"
              >
                <span>BOOK VISIT</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Scroll Cue */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10] flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#151717]/65 pointer-events-none"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#9c8052]" />
        </motion.div>
      </div>
    </section>
  );
}
