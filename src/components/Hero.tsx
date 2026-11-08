"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
  onBookVisit: () => void;
}

export function Hero({ onExplore, onBookVisit }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const y = useSpring(rawY, { stiffness: 80, damping: 25 });
  const scale = useSpring(rawScale, { stiffness: 80, damping: 25 });
  const contentOpacity = useSpring(rawOpacity, { stiffness: 80, damping: 25 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 overflow-hidden bg-[#121316] text-[#f6f5f0]"
    >
      {/* Background with parallax + noise grain shader */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <motion.div
          style={{ y, scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-[-10%] w-[120%] h-[120%]"
        >
          {/* Darker architectural photo: Sampoorna Big Villa dusk elevation */}
          <Image
            src="https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Sampoorna%20Big%20Villa%20Elevation.jpeg"
            alt="Onyx Residence Architectural Dusk Elevation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.52] contrast-[1.18] saturate-[0.85]"
          />
        </motion.div>

        {/* Subtle hardware-accelerated film vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/40 to-[#121316]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121316]/85 via-transparent to-[#121316]/60 pointer-events-none" />

        {/* Animated warm golden light pulse on dark surface */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(197,160,89,0.12) 0%, transparent 70%)",
              "radial-gradient(ellipse 60% 50% at 25% 55%, rgba(197,160,89,0.18) 0%, transparent 70%)",
              "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(197,160,89,0.12) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Typography Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-[1720px] mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-end pb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left: Giant Display Typography in Crisp White */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-serif text-[18vw] sm:text-[15vw] lg:text-[13vw] leading-[0.88] tracking-tighter text-white font-light uppercase drop-shadow-sm"
              >
                Onyx
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#f6f5f0] font-normal tracking-tight"
              >
                <span>holistic luxury</span>
                <span className="block text-[#c5a059] font-light font-sans text-xl sm:text-3xl lg:text-4xl not-italic uppercase tracking-[0.2em] mt-2">
                  in perfect harmony
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right: Narrative Box & Location Stamp in White / Gold */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-between gap-8 max-w-lg lg:pb-4"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                <span>(UDUPI • 13.34° N, 74.74° E)</span>
              </div>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                Where timeless architectural design, structural integrity, and
                coastal serenity converge — Onyx Assets crafts sanctuaries of
                elegance across Udupi&apos;s most prestigious enclaves.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <motion.button
                onClick={onBookVisit}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group px-7 py-3 rounded-full bg-[#c5a059] text-[#141517] font-semibold text-xs font-mono uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-lg flex items-center gap-2"
              >
                <span>BOOK A VISIT</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              <motion.button
                onClick={onExplore}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="px-6 py-3 rounded-full border border-white/30 bg-white/10 hover:bg-white hover:text-[#141517] text-white text-xs font-mono uppercase tracking-widest transition-all duration-300 backdrop-blur-sm"
              >
                RESIDENCES
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom ticker & indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 max-w-[1720px] mx-auto px-6 md:px-12 w-full pt-6 border-t border-white/15 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-white/60"
      >
        <div className="flex items-center gap-8">
          <span>(EST. 1994)</span>
          <span className="hidden sm:inline">30+ YEARS COMBINED MASTERY</span>
        </div>
        <button
          onClick={onExplore}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <span>SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#c5a059] animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
