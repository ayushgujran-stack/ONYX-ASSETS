"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

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

// Single self-contained SVG data URI using exact geometric coordinates (zero font mismatch)
const ONYX_MASK_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='320' viewBox='0 0 1000 320'>${ONYX_PATHS.map(
  (d) => `<path d='${d}' fill='black' fill-rule='evenodd'/>`
).join("")}</svg>`;

const ONYX_MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(ONYX_MASK_SVG)}")`;

export function Hero({ onExplore, onBookVisit }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track scroll across the 440vh sticky sequence
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
  // Visible at top of page, sinks down behind the rising house cutout on scroll
  const contentY = useTransform(progress, [0, 0.28], ["0%", "26%"]);
  const contentScale = useTransform(progress, [0, 0.28], [1, 0.9]);
  const contentOpacity = useTransform(progress, [0.06, 0.22], [1, 0]);
  const cueOpacity = useTransform(progress, [0, 0.08], [1, 0]);
  const contentPointerEvents = useTransform(progress, (v) =>
    v < 0.08 ? "auto" : "none"
  );

  // ─── 2. Nature + Sky Scenic Background ────────────────────────
  const bgScale = useTransform(progress, [0, 1], [1.06, 1.0]);

  // Atmospheric twilight darkening scrim that fades in as the exterior house
  // dissolves, creating deep contrast so the hollow ONYX letters & captured house pop clearly.
  const darkBackdropOpacity = useTransform(
    progress,
    [0.2, 0.38, 0.9, 1],
    [0, 0.84, 0.86, 0.82]
  );

  // ─── 3. Shared House Transform (Pixel-Locked for Unmasked + Masked) ─
  // Starts peeking at bottom below CTA buttons (y: 38%), rises in front of sinking text (y: 4%), then drifts gently
  const houseY = useTransform(progress, [0, 0.36, 1], ["38%", "4%", "-4%"]);
  const houseScale = useTransform(progress, [0, 0.36, 1], [0.92, 1.08, 1.15]);

  // Unmasked full house: visible initially as it rises behind the hollow outline,
  // then disappears (0.36 -> 0.50) leaving ONLY the portion trapped inside the ONYX mask!
  const unmaskedHouseOpacity = useTransform(progress, [0, 0.36, 0.5], [1, 1, 0]);

  // Masked copy: sits at identical coordinates and activates smoothly BEFORE unmasked fades out,
  // ensuring zero visual jump when the background house disappears.
  const maskedHouseOpacity = useTransform(
    progress,
    [0.24, 0.32, 0.9, 1],
    [0, 1, 1, 0.92]
  );

  // ─── 4. Hollow ONYX Vector Outline ────────────────────────────
  // Appears & draws its strokes OVER the rising house (0.12 -> 0.32).
  // Remains hollow showing the real house behind it, then frames the trapped masked house!
  const outlineOpacity = useTransform(progress, [0.12, 0.2, 0.9, 1], [0, 1, 1, 0.95]);
  const outlinePathLength = useTransform(progress, [0.12, 0.32], [0, 1]);

  // Subtitle stamp beneath the trapped ONYX outline after capture
  const badgeOpacity = useTransform(progress, [0.44, 0.54, 0.92, 1], [0, 1, 1, 0.9]);

  // ─── 5. High-Altitude Soft Clouds (gentle upper-sky atmosphere) ─
  const cloudLeftX = useTransform(progress, [0, 0.7], ["0%", "-24%"]);
  const cloudRightX = useTransform(progress, [0, 0.7], ["0%", "24%"]);
  const cloudsOpacity = useTransform(progress, [0, 0.45, 0.85], [0.34, 0.22, 0.08]);

  // ─── 6. Lush Coastal Bushes & Foreground Foliage Parallax ─────
  // Botanical clusters hug bottom-left & bottom-right, parting gently outwards like a garden gate
  const bushLeftX = useTransform(progress, [0, 0.85], ["0%", "-24%"]);
  const bushRightX = useTransform(progress, [0, 0.85], ["0%", "24%"]);
  const bushScale = useTransform(progress, [0, 0.85], [1, 1.12]);
  const bushOpacity = useTransform(progress, [0, 0.36, 0.68, 0.88], [1, 0.88, 0.4, 0.1]);

  // ─── 7. Light Dawn Valley Mist (subtle atmospheric whisper) ────
  const smokeY = useTransform(progress, [0, 0.75], ["72%", "22%"]);
  const smokeOpacity = useTransform(progress, [0, 0.28, 0.72, 1], [0.04, 0.16, 0.18, 0.08]);

  // ─── 8. Seamless Sand Footer Blend into #f6f5f0 Section Below ─
  const bottomOverlayOpacity = useTransform(progress, [0.68, 0.98], [0, 1]);

  return (
    <section
      id="hero-sequence"
      ref={containerRef}
      className="relative h-[320vh] md:h-[440vh] bg-[#f6f5f0] text-[#141517] overflow-clip"
    >
      {/* ─── STICKY 100vh VIEWPORT ───────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* Layer 0: Coastal Nature Horizon + Golden Sunrise Sky Mixture */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 w-full h-full z-0 will-change-transform"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { scale: 1.09, opacity: 0.72 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.6, ease: EXPO_OUT }}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src="/assets/greenery_sky.jpg"
              alt="Coastal Sunrise Over Verdant Karnataka Hills"
              fill
              priority
              quality={95}
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Gentle upper-sky warmth to ensure dark editorial typography stays crystal clear */}
            <div className="absolute inset-x-0 top-0 h-[64vh] bg-gradient-to-b from-[#fffaf0]/45 via-[#fffaf0]/28 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Layer 1a: High-Altitude Soft Parting Clouds (Mixed Gently in Upper Sky) */}
        <motion.div
          style={{ opacity: cloudsOpacity }}
          className="absolute inset-0 z-[1] pointer-events-none"
        >
          <motion.div
            style={{ x: cloudLeftX }}
            className="absolute top-[8%] md:top-[10%] -left-[22vw] md:-left-[10vw] w-[65vw] md:w-[44vw] h-auto aspect-[2248/954] will-change-transform"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { y: 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2.2, ease: EXPO_OUT }}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/assets/cloud.png"
                alt="Upper Sky Cloud Left"
                fill
                loading="eager"
                sizes="(max-width: 768px) 65vw, 44vw"
                className="object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            style={{ x: cloudRightX }}
            className="absolute top-[6%] md:top-[8%] -right-[22vw] md:-right-[10vw] w-[60vw] md:w-[40vw] h-auto aspect-[2248/954] will-change-transform"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { y: 44, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2.5, delay: 0.1, ease: EXPO_OUT }}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/assets/cloud.png"
                alt="Upper Sky Cloud Right"
                fill
                loading="eager"
                sizes="(max-width: 768px) 60vw, 40vw"
                className="object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Layer 1b: Twilight Dusk Scrim Behind House & ONYX for Crisp Contrast */}
        <motion.div
          style={{
            opacity: darkBackdropOpacity,
            background:
              "radial-gradient(ellipse 82% 62% at 50% 48%, rgba(8, 11, 10, 0.94) 0%, rgba(10, 13, 12, 0.86) 100%)",
          }}
          className="absolute inset-0 z-[1] pointer-events-none"
        />

        {/* Layer 2: Hero Headline & Actions (Sinks BEHIND the Rising House on Scroll) */}
        <motion.div
          style={{
            y: contentY,
            scale: contentScale,
            opacity: contentOpacity,
            pointerEvents: contentPointerEvents as any,
          }}
          className="absolute inset-0 z-[2] h-full flex flex-col items-center justify-center px-6 md:px-12 text-center pb-36 md:pb-48 will-change-transform"
        >
          <div className="max-w-6xl mx-auto space-y-5 md:space-y-6">
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.08, ease: EXPO_OUT }}
              className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight text-[#151717] leading-[0.96] drop-shadow-[0_2px_24px_rgba(255,255,255,0.45)]"
            >
              Find Your Coastal Sanctuary
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.24, ease: EXPO_OUT }}
              className="text-base sm:text-2xl md:text-3xl font-medium text-[#151717] tracking-tight max-w-3xl mx-auto leading-relaxed drop-shadow-[0_1px_14px_rgba(255,255,255,0.65)]"
            >
              Architectural rigor. Coastal serenity.{" "}
              <span className="text-[#151717]/85">A legacy in Udupi.</span>
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.38, ease: EXPO_OUT }}
              className="pt-3 md:pt-4 flex items-center justify-center gap-4"
            >
              <button
                onClick={onExplore}
                className="group px-8 md:px-10 py-4 md:py-4.5 rounded-full bg-[#151717] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#9c8052] transition-colors duration-300 shadow-xl flex items-center gap-3"
              >
                <span>EXPLORE RESIDENCES</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onBookVisit}
                className="hidden sm:flex px-7 py-4 rounded-full border border-black/15 bg-white/80 hover:bg-white text-[#151717] font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-sm backdrop-blur-sm"
              >
                <span>BOOK VISIT</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Layer 3: High-Res 2.5K Unmasked V4 Greens Villa Cutout */}
        {/* Sweeps IN FRONT of the sinking text & buttons, then dissolves leaving only ONYX capture */}
        <motion.div
          style={{
            opacity: unmaskedHouseOpacity,
            y: houseY,
            scale: houseScale,
            transformOrigin: "center bottom",
          }}
          className="absolute inset-0 z-[3] flex items-end justify-center pointer-events-none will-change-transform"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: "8%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 1.8, delay: 0.16, ease: EXPO_OUT }}
            className="relative shrink-0 w-[195vw] sm:w-[130vw] md:w-[88vw] lg:w-[84vw] max-w-[1360px] h-[76vh] sm:h-[82vh] md:h-[88vh]"
          >
            <Image
              src="/assets/v4_greens_4k_cutout.png"
              alt="Onyx V4 Greens Architectural Cutout"
              fill
              priority
              quality={95}
              sizes="(max-width: 768px) 195vw, 88vw"
              className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </motion.div>

        {/* Layer 4: Masked Copy of V4 Greens Villa (EXACT pixel-locked sibling of Layer 3) */}
        {/* Static center viewport mask reveals ONLY the pixels sitting behind the ONYX letters */}
        <motion.div
          style={{
            opacity: maskedHouseOpacity,
            WebkitMaskImage: ONYX_MASK_URL,
            WebkitMaskPosition: "center center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "min(82vw, 1040px) calc(min(82vw, 1040px) * 0.32)",
            maskImage: ONYX_MASK_URL,
            maskPosition: "center center",
            maskRepeat: "no-repeat",
            maskSize: "min(82vw, 1040px) calc(min(82vw, 1040px) * 0.32)",
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
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: "8%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 1.8, delay: 0.16, ease: EXPO_OUT }}
              className="relative shrink-0 w-[195vw] sm:w-[130vw] md:w-[88vw] lg:w-[84vw] max-w-[1360px] h-[76vh] sm:h-[82vh] md:h-[88vh]"
            >
              <Image
                src="/assets/v4_greens_4k_cutout.png"
                alt="V4 Greens Architectural Texture Inside ONYX"
                fill
                priority
                quality={95}
                sizes="(max-width: 768px) 195vw, 88vw"
                className="object-contain object-bottom brightness-[1.12] contrast-[1.08] saturate-[1.08]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Layer 5: Crisp Hollow Vector Outline of ONYX (Matches Mask Box Pixel-for-Pixel) */}
        <motion.div
          style={{ opacity: outlineOpacity }}
          className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"
        >
          <svg
            viewBox="0 0 1000 320"
            className="w-[82vw] max-w-[1040px] aspect-[1000/320] overflow-visible"
          >
            {ONYX_PATHS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.6"
                strokeOpacity="0.96"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: outlinePathLength }}
                className="drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
              />
            ))}
            {/* Subtle warm champagne-gold hairline accent */}
            {ONYX_PATHS.map((d, i) => (
              <motion.path
                key={`gold-${i}`}
                d={d}
                fill="none"
                stroke="#dfc082"
                strokeWidth="1.2"
                strokeOpacity="0.88"
                style={{ pathLength: outlinePathLength }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Caption stamped smoothly below the centered ONYX outline */}
        <motion.div
          style={{ opacity: badgeOpacity }}
          className="absolute inset-x-0 top-[calc(50%+clamp(64px,16vw,185px))] z-[5] flex justify-center px-4 pointer-events-none"
        >
          <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.35em] whitespace-nowrap text-[#f6f5f0] bg-[#141517]/80 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/25 shadow-lg">
            <span>RESIDENCE COLLECTION</span>
            <span className="text-[#c5a059]">&bull;</span>
            <span>UDUPI, KARNATAKA</span>
          </div>
        </motion.div>

        {/* Layer 6: Soft Feathered Valley Mist (Subtle Atmospheric Whisper) */}
        <motion.div
          style={{
            y: smokeY,
            opacity: smokeOpacity,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.65) 45%, black 82%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.65) 45%, black 82%, transparent 100%)",
          }}
          className="absolute -bottom-8 left-0 right-0 h-[34vh] md:h-[42vh] z-[6] pointer-events-none will-change-transform"
        >
          <Image
            src="/assets/smoke.png"
            alt="Coastal Dawn Mist"
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover object-top"
            style={{ mixBlendMode: "screen" }}
          />
        </motion.div>

        {/* Layer 7: Lush Tropical Coastal Bushes & Palms Framing Both Foreground Corners */}
        <motion.div
          style={{ opacity: bushOpacity }}
          className="absolute inset-0 z-[7] pointer-events-none overflow-hidden"
        >
          {/* Left Bush & Bougainvillea/Palm Cluster */}
          <motion.div
            style={{
              x: bushLeftX,
              scale: bushScale,
              transformOrigin: "bottom left",
            }}
            className="absolute -bottom-4 -left-10 md:-left-6 w-[55vw] md:w-[34vw] max-w-[560px] aspect-[1200/896] will-change-transform"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26, x: -16 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1.6, delay: 0.14, ease: EXPO_OUT }}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/assets/foliage_left.png"
                alt="Tropical Coastal Bushes Left"
                fill
                priority
                quality={95}
                sizes="(max-width: 768px) 55vw, 34vw"
                className="object-contain object-left-bottom drop-shadow-[0_-10px_25px_rgba(0,0,0,0.3)]"
              />
            </motion.div>
          </motion.div>

          {/* Right Coastal Shrubs, Ferns & Palm Fronds */}
          <motion.div
            style={{
              x: bushRightX,
              scale: bushScale,
              transformOrigin: "bottom right",
            }}
            className="absolute -bottom-4 -right-10 md:-right-6 w-[55vw] md:w-[36vw] max-w-[580px] aspect-[1200/896] will-change-transform"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26, x: 16 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1.6, delay: 0.18, ease: EXPO_OUT }}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/assets/foliage_right.png"
                alt="Tropical Coastal Bushes Right"
                fill
                priority
                quality={95}
                sizes="(max-width: 768px) 55vw, 36vw"
                className="object-contain object-right-bottom drop-shadow-[0_-10px_25px_rgba(0,0,0,0.3)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Layer 8a: Seamless Bottom Blend into Sand Background (#f6f5f0) */}
        <motion.div
          style={{ opacity: bottomOverlayOpacity }}
          className="absolute left-0 right-0 bottom-0 h-44 md:h-64 z-[8] pointer-events-none bg-gradient-to-b from-transparent via-[#f6f5f0]/85 to-[#f6f5f0]"
        />

        {/* Layer 8b: Bottom Scroll Cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[8] pointer-events-none"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EXPO_OUT }}
            className="flex items-center gap-2 whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.25em] text-[#f6f5f0] bg-[#141517]/55 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/15"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5 motion-safe:animate-bounce text-[#c5a059]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
