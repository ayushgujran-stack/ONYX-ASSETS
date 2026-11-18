"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { CLIENT_TESTIMONIALS } from "@/data/properties";
import { ConcreteTexture } from "@/components/ui/ConcreteTexture";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

function GoldAvatarIcon({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="24" cy="17" r="7.5" fill="#dfc082" />
      {/* Torso / Shoulders */}
      <path
        d="M10 40C10 32.268 16.268 26 24 26C31.732 26 38 32.268 38 40C38 40.5523 37.5523 41 37 41H11C10.4477 41 10 40.5523 10 40Z"
        fill="#dfc082"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const total = CLIENT_TESTIMONIALS.length;
  const currentReview = CLIENT_TESTIMONIALS[activeIndex];

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const prevReview = CLIENT_TESTIMONIALS[prevIndex];
  const nextReview = CLIENT_TESTIMONIALS[nextIndex];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex(prevIndex);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex(nextIndex);
  };

  return (
    <section
      id="testimonials"
      className="py-24 md:py-36 bg-[#141416] text-white border-t border-white/10 relative overflow-clip min-h-[580px] flex items-center"
    >
      {/* Tadao Ando architectural poured concrete texture */}
      <ConcreteTexture variant="dark" />

      <div className="max-w-[1520px] mx-auto px-6 md:px-12 w-full relative z-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {!isExpanded ? (
            /* ─── State 1: 3-Avatar Carousel (Center Big, Sides Fading on click) ─── */
            <motion.div
              key="carousel-stage"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: EXPO_OUT }}
              className="flex flex-col items-center text-center relative w-full"
            >
              {/* Big Stylized Editorial Heading (Fades away when expanding) */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: -24, filter: "blur(6px)" }
                }
                transition={{ duration: 0.45, ease: EXPO_OUT }}
                className="max-w-3xl mb-12 sm:mb-16 space-y-3 select-none"
              >
                <span className="text-xs font-mono tracking-[0.25em] text-[#dfc082] uppercase block">
                  (RESIDENT STORIES)
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fffdf1] font-light tracking-tight leading-[1.08]">
                  Voices of{" "}
                  <span className="italic font-normal text-[#dfc082]">
                    Those Who Call It Home
                  </span>
                </h2>
              </motion.div>

              {/* 3-Avatar Stage */}
              <div className="relative w-full max-w-5xl flex items-center justify-between gap-4 sm:gap-8 select-none">
                {/* Left Navigation Chevron */}
                <motion.button
                  type="button"
                  onClick={handlePrev}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Previous client"
                  className="p-3 sm:p-3.5 rounded-full border border-white/15 bg-[#1c1c20]/80 text-white/70 hover:text-[#dfc082] hover:border-[#dfc082] transition-colors shrink-0 z-20 shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>

                {/* 3 Avatars Row */}
                <div className="flex-1 flex items-center justify-center gap-4 sm:gap-10 md:gap-16">
                  {/* Left Avatar (Fades out when center clicked) */}
                  <motion.button
                    type="button"
                    onClick={handlePrev}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.7, x: -40, filter: "blur(6px)" }}
                    transition={{ duration: 0.35 }}
                    whileHover={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    className="flex flex-col items-center gap-3 shrink-0 opacity-40 hover:opacity-75 transition-all duration-300 group cursor-pointer focus:outline-none"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-[#1c1c20] border border-white/20 group-hover:border-[#dfc082]/60 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg">
                      <GoldAvatarIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#dfc082] translate-y-1.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-serif text-white/70 truncate max-w-[110px] sm:max-w-[140px]">
                      {prevReview.name}
                    </span>
                  </motion.button>

                  {/* Center Avatar (Morphs & Glides smoothly to the left side via layoutId) */}
                  <div
                    onClick={() => setIsExpanded(true)}
                    className="flex flex-col items-center shrink-0 group cursor-pointer focus:outline-none z-10"
                  >
                    {/* Morphing Avatar Disc */}
                    <motion.div
                      layoutId="avatar-disc-hero"
                      transition={{ duration: 0.65, ease: EXPO_OUT }}
                      className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full bg-[#1c1c20] border-2 sm:border-[3px] border-[#dfc082] shadow-[0_0_45px_rgba(223,192,130,0.3)] group-hover:shadow-[0_0_60px_rgba(223,192,130,0.45)] transition-shadow duration-300 flex items-center justify-center overflow-hidden"
                    >
                      <GoldAvatarIcon className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 text-[#dfc082] translate-y-2 group-hover:scale-105 transition-transform duration-300" />
                      
                      <span className="absolute bottom-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#dfc082] uppercase bg-[#141416]/90 px-3 py-1 rounded-full border border-[#dfc082]/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Story
                      </span>
                    </motion.div>

                    {/* Morphing Name & Residence tag */}
                    <motion.div
                      layoutId="avatar-meta-tag"
                      transition={{ duration: 0.65, ease: EXPO_OUT }}
                      className="flex flex-col items-center text-center mt-5 space-y-1"
                    >
                      <span className="text-lg sm:text-2xl md:text-3xl font-serif text-white font-medium group-hover:text-[#dfc082] transition-colors">
                        {currentReview.name}
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-[#dfc082] tracking-wider uppercase">
                        {currentReview.tenure}
                      </span>
                    </motion.div>
                  </div>

                  {/* Right Avatar (Fades out when center clicked) */}
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.7, x: 40, filter: "blur(6px)" }}
                    transition={{ duration: 0.35 }}
                    whileHover={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    className="flex flex-col items-center gap-3 shrink-0 opacity-40 hover:opacity-75 transition-all duration-300 group cursor-pointer focus:outline-none"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-[#1c1c20] border border-white/20 group-hover:border-[#dfc082]/60 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg">
                      <GoldAvatarIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#dfc082] translate-y-1.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-serif text-white/70 truncate max-w-[110px] sm:max-w-[140px]">
                      {nextReview.name}
                    </span>
                  </motion.button>
                </div>

                {/* Right Navigation Chevron */}
                <motion.button
                  type="button"
                  onClick={handleNext}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Next client"
                  className="p-3 sm:p-3.5 rounded-full border border-white/15 bg-[#1c1c20]/80 text-white/70 hover:text-[#dfc082] hover:border-[#dfc082] transition-colors shrink-0 z-20 shadow-md"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ─── State 2: Avatar Glided to Left Side + Text Emerges From Behind Sliding Right ─── */
            <motion.div
              key="expanded-stage"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: EXPO_OUT }}
              className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center relative w-full"
            >
              {/* Left Column: Avatar Anchored on Left side */}
              <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-5 md:border-r border-white/10 md:pr-10 z-20">
                {/* Glided Avatar Disc (Arrives smoothly on the left side) */}
                <motion.div
                  layoutId="avatar-disc-hero"
                  transition={{ duration: 0.65, ease: EXPO_OUT }}
                  className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-[#1c1c20] border-2 sm:border-[3px] border-[#dfc082] shadow-[0_0_35px_rgba(223,192,130,0.25)] flex items-center justify-center overflow-hidden shrink-0"
                >
                  <GoldAvatarIcon className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 text-[#dfc082] translate-y-1.5" />
                </motion.div>

                {/* Glided Name & Residence Tag */}
                <motion.div
                  layoutId="avatar-meta-tag"
                  transition={{ duration: 0.65, ease: EXPO_OUT }}
                  className="space-y-1"
                >
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                    {currentReview.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#dfc082]">
                    {currentReview.tenure}
                  </p>
                </motion.div>

                {/* Navigation and Back Controls (Solid borders) */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25, ease: EXPO_OUT }}
                  className="flex items-center gap-3 pt-2"
                >
                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/20 hover:border-[#dfc082] text-white/80 hover:text-[#dfc082] text-xs font-mono uppercase tracking-wider transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <div className="flex items-center gap-1.5 border-l border-white/15 pl-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous review"
                      className="p-2 rounded border border-white/20 hover:border-[#dfc082] text-white/70 hover:text-[#dfc082] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next review"
                      className="p-2 rounded border border-white/20 hover:border-[#dfc082] text-white/70 hover:text-[#dfc082] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Text Slides Out From Behind Avatar Towards the Right */}
              <motion.div
                key={`review-text-${currentReview.name}`}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, x: -140, filter: "blur(8px)" }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, x: -80, filter: "blur(6px)" }
                }
                transition={{
                  duration: 0.75,
                  delay: 0.18,
                  ease: EXPO_OUT,
                }}
                className="md:col-span-7 space-y-6 will-change-transform z-10"
              >
                <motion.div
                  initial={prefersReducedMotion ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.28, ease: EXPO_OUT }}
                >
                  <Quote className="w-8 h-8 text-[#dfc082]/70" />
                </motion.div>

                <h4 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-snug tracking-tight">
                  &ldquo;{currentReview.headline}&rdquo;
                </h4>

                <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed">
                  {currentReview.quote}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
