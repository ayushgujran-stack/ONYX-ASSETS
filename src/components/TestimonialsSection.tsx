"use client";

import React, { useState, useRef } from "react";
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

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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

  // Touch Swipe for Mobile Browsing
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        setActiveIndex(nextIndex);
      } else {
        setActiveIndex(prevIndex);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      id="testimonials"
      className="py-20 md:py-36 bg-[#141416] text-white border-t border-white/10 relative overflow-clip min-h-[520px] md:min-h-[580px] flex items-center"
    >
      {/* Tadao Ando architectural poured concrete texture */}
      <ConcreteTexture variant="dark" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {!isExpanded ? (
            /* ─── State 1: 3-Avatar Carousel (Center Big, Sides on Tablet/Desktop, Touch Swipe) ─── */
            <motion.div
              key="carousel-stage"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: EXPO_OUT }}
              className="flex flex-col items-center text-center relative w-full"
            >
              {/* Stylized Editorial Heading */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: -24, filter: "blur(6px)" }
                }
                transition={{ duration: 0.45, ease: EXPO_OUT }}
                className="max-w-3xl mb-8 sm:mb-16 space-y-2.5 sm:space-y-3 select-none px-2"
              >
                <span className="text-xs font-mono tracking-[0.25em] text-[#dfc082] uppercase block">
                  (RESIDENT STORIES)
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fffdf1] font-light tracking-tight leading-[1.1]">
                  Voices of{" "}
                  <span className="italic font-normal text-[#dfc082]">
                    Those Who Call It Home
                  </span>
                </h2>
              </motion.div>

              {/* Avatar Stage: Responsive Layout with Side Chevrons & Side Peeks on sm+ */}
              <div
                className="relative w-full max-w-5xl flex items-center justify-center sm:justify-between gap-3 sm:gap-6 md:gap-8 select-none touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {/* Left Navigation Chevron */}
                <motion.button
                  type="button"
                  onClick={handlePrev}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Previous resident review"
                  className="p-3 sm:p-3.5 rounded-full border border-white/20 bg-[#1c1c20]/90 text-white/80 hover:text-[#dfc082] hover:border-[#dfc082] transition-colors shrink-0 z-20 shadow-lg active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>

                {/* Avatars Row: On mobile only the Center hero avatar is displayed; on sm+ side avatars peek */}
                <div className="flex items-center justify-center gap-3 sm:gap-8 md:gap-14">
                  {/* Left Avatar (Visible on tablet/desktop) */}
                  <motion.button
                    type="button"
                    onClick={handlePrev}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.7, x: -40, filter: "blur(6px)" }}
                    transition={{ duration: 0.35 }}
                    whileHover={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    className="hidden sm:flex flex-col items-center gap-3 shrink-0 opacity-40 hover:opacity-75 transition-all duration-300 group cursor-pointer focus:outline-none"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-[#1c1c20] border border-white/20 group-hover:border-[#dfc082]/60 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg">
                      <GoldAvatarIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#dfc082] translate-y-1.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-serif text-white/70 truncate max-w-[110px] sm:max-w-[140px]">
                      {prevReview.name}
                    </span>
                  </motion.button>

                  {/* Center Hero Avatar Disc */}
                  <button
                    type="button"
                    id="center-avatar-btn"
                    onClick={() => setIsExpanded(true)}
                    className="flex flex-col items-center shrink-0 group cursor-pointer focus:outline-none z-10 appearance-none bg-transparent border-0"
                    aria-label={`Read story of ${currentReview.name}`}
                  >
                    <motion.div
                      layoutId="avatar-disc-hero"
                      transition={{ duration: 0.65, ease: EXPO_OUT }}
                      className="relative w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full bg-[#1c1c20] border-2 sm:border-[3px] border-[#dfc082] shadow-[0_0_35px_rgba(223,192,130,0.3)] group-hover:shadow-[0_0_60px_rgba(223,192,130,0.45)] transition-shadow duration-300 flex items-center justify-center overflow-hidden"
                    >
                      <GoldAvatarIcon className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 text-[#dfc082] translate-y-1.5 sm:translate-y-2 group-hover:scale-105 transition-transform duration-300" />
                      
                      {/* Prominent Read Story Pill */}
                      <span className="absolute bottom-2.5 sm:bottom-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#dfc082] uppercase bg-[#141416]/90 px-3 py-1 rounded-full border border-[#dfc082]/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        Read Story
                      </span>
                    </motion.div>

                    {/* Morphing Name & Residence tag */}
                    <motion.div
                      layoutId="avatar-meta-tag"
                      transition={{ duration: 0.65, ease: EXPO_OUT }}
                      className="flex flex-col items-center text-center mt-3 sm:mt-5 space-y-1 max-w-[260px] sm:max-w-none"
                    >
                      <span className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-medium group-hover:text-[#dfc082] transition-colors leading-tight">
                        {currentReview.name}
                      </span>
                      <span className="text-[11px] sm:text-sm font-mono text-[#dfc082] tracking-wider uppercase">
                        {currentReview.tenure}
                      </span>
                    </motion.div>
                  </button>

                  {/* Right Avatar (Visible on tablet/desktop) */}
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.7, x: 40, filter: "blur(6px)" }}
                    transition={{ duration: 0.35 }}
                    whileHover={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    className="hidden sm:flex flex-col items-center gap-3 shrink-0 opacity-40 hover:opacity-75 transition-all duration-300 group cursor-pointer focus:outline-none"
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
                  aria-label="Next resident review"
                  className="p-3 sm:p-3.5 rounded-full border border-white/20 bg-[#1c1c20]/90 text-white/80 hover:text-[#dfc082] hover:border-[#dfc082] transition-colors shrink-0 z-20 shadow-lg active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Mobile Pagination Dots for intuitive touch browsing */}
              <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
                {CLIENT_TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`View story of ${CLIENT_TESTIMONIALS[i].name}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-[#dfc082]" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* ─── State 2: Avatar Glided + Text Emerges From Behind Sliding Right (Responsive & Swipeable) ─── */
            <motion.div
              key="expanded-stage"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: EXPO_OUT }}
              className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-14 items-center relative w-full touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Left Column: Avatar Anchored on Left side */}
              <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-4 sm:gap-5 md:border-r border-white/10 md:pr-10 z-20">
                {/* Glided Avatar Disc */}
                <motion.div
                  layoutId="avatar-disc-hero"
                  transition={{ duration: 0.65, ease: EXPO_OUT }}
                  className="w-28 h-28 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-[#1c1c20] border-2 sm:border-[3px] border-[#dfc082] shadow-[0_0_35px_rgba(223,192,130,0.25)] flex items-center justify-center overflow-hidden shrink-0"
                >
                  <GoldAvatarIcon className="w-20 h-20 sm:w-32 sm:h-32 md:w-36 md:h-36 text-[#dfc082] translate-y-1.5" />
                </motion.div>

                {/* Glided Name & Residence Tag */}
                <motion.div
                  layoutId="avatar-meta-tag"
                  transition={{ duration: 0.65, ease: EXPO_OUT }}
                  className="space-y-1"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-medium">
                    {currentReview.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-wider text-[#dfc082]">
                    {currentReview.tenure}
                  </p>
                </motion.div>

                {/* Navigation and Back Controls */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25, ease: EXPO_OUT }}
                  className="flex items-center gap-3 pt-1 sm:pt-2"
                >
                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-[#dfc082] text-white/90 hover:text-[#dfc082] text-xs font-mono uppercase tracking-wider transition-all bg-white/[0.04]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <div className="flex items-center gap-1.5 border-l border-white/15 pl-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous review"
                      className="p-2 rounded-full border border-white/20 hover:border-[#dfc082] text-white/70 hover:text-[#dfc082] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next review"
                      className="p-2 rounded-full border border-white/20 hover:border-[#dfc082] text-white/70 hover:text-[#dfc082] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Story Text */}
              <motion.div
                key={`review-text-${currentReview.name}`}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 16, filter: "blur(6px)" }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: -16, filter: "blur(6px)" }
                }
                transition={{
                  duration: 0.65,
                  delay: 0.15,
                  ease: EXPO_OUT,
                }}
                className="md:col-span-7 space-y-4 sm:space-y-6 will-change-transform z-10 text-center md:text-left px-2 sm:px-0"
              >
                <motion.div
                  initial={prefersReducedMotion ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.28, ease: EXPO_OUT }}
                  className="flex justify-center md:justify-start"
                >
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#dfc082]/70" />
                </motion.div>

                <h4 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light leading-snug tracking-tight">
                  &ldquo;{currentReview.headline}&rdquo;
                </h4>

                <p className="text-sm sm:text-base md:text-lg text-white/75 font-light leading-relaxed">
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
