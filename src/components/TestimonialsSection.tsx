"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { CLIENT_TESTIMONIALS } from "@/data/properties";

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
      className="py-24 md:py-36 bg-[#141416] text-white border-t border-white/10 relative overflow-clip min-h-[520px] flex items-center"
    >
      <div className="max-w-[1520px] mx-auto px-6 md:px-12 w-full">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* ─── State 1: 3-Avatar Focal Carousel (Center Huge, Sides Scaled) ─── */
            <motion.div
              key="avatar-carousel"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EXPO_OUT }}
              className="flex flex-col items-center text-center"
            >
              {/* Minimal Clean Click Badge (Solid border, No dots) */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#dfc082]/35 bg-[#1c1c20] text-[11px] font-mono tracking-widest uppercase text-[#dfc082] mb-12 sm:mb-16 shadow-md select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfc082] animate-pulse" />
                <span>Click center avatar to read review</span>
              </div>

              {/* 3-Avatar Presentation Stage */}
              <div className="relative w-full max-w-5xl flex items-center justify-between gap-4 sm:gap-8 select-none">
                {/* Left Navigation Chevron */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous client"
                  className="p-3 sm:p-3.5 rounded-full border border-white/15 bg-[#1c1c20]/80 text-white/70 hover:text-[#dfc082] hover:border-[#dfc082] transition-colors shrink-0 z-20 shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* 3-Avatar Focused Stage */}
                <div className="flex-1 flex items-center justify-center gap-4 sm:gap-10 md:gap-16">
                  {/* 1. Left Avatar (Smaller, click to bring to center) */}
                  <motion.button
                    type="button"
                    onClick={handlePrev}
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

                  {/* 2. Center Avatar (SUBSTANTIALLY BIGGER, prominent gold ring, clicks to open) */}
                  <motion.button
                    type="button"
                    key={`center-${currentReview.name}`}
                    initial={prefersReducedMotion ? false : { scale: 0.88, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: EXPO_OUT }}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    onClick={() => setIsExpanded(true)}
                    className="flex flex-col items-center shrink-0 group cursor-pointer focus:outline-none z-10"
                  >
                    {/* Enlarged Avatar Ring (Solid gold, no dotted border) */}
                    <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full bg-[#1c1c20] border-2 sm:border-[3px] border-[#dfc082] shadow-[0_0_45px_rgba(223,192,130,0.3)] group-hover:shadow-[0_0_60px_rgba(223,192,130,0.45)] transition-all duration-300 flex items-center justify-center overflow-hidden">
                      <GoldAvatarIcon className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 text-[#dfc082] translate-y-2 group-hover:scale-105 transition-transform duration-300" />
                      
                      {/* Hover action prompt overlay */}
                      <span className="absolute bottom-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#dfc082] uppercase bg-[#141416]/90 px-3 py-1 rounded-full border border-[#dfc082]/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Story
                      </span>
                    </div>

                    {/* Centered Reviewer Name and Residence */}
                    <div className="flex flex-col items-center text-center mt-5 space-y-1">
                      <span className="text-lg sm:text-2xl md:text-3xl font-serif text-white font-medium group-hover:text-[#dfc082] transition-colors">
                        {currentReview.name}
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-[#dfc082] tracking-wider uppercase">
                        {currentReview.tenure}
                      </span>
                    </div>
                  </motion.button>

                  {/* 3. Right Avatar (Smaller, click to bring to center) */}
                  <motion.button
                    type="button"
                    onClick={handleNext}
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
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next client"
                  className="p-3 sm:p-3.5 rounded-full border border-white/15 bg-[#1c1c20]/80 text-white/70 hover:text-[#dfc082] hover:border-[#dfc082] transition-colors shrink-0 z-20 shadow-md"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* ─── State 2: Avatar Shifts to Side + Review Text Expands (Solid borders) ─── */
            <motion.div
              key={`review-${currentReview.name}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EXPO_OUT }}
              className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center"
            >
              {/* Left Column: Enlarged Avatar on the Side + Reviewer Details */}
              <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-5 md:border-r border-white/10 md:pr-10">
                {/* Enlarged Profile Avatar Disc (Solid gold border) */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-[#1c1c20] border-2 sm:border-[3px] border-[#dfc082] shadow-[0_0_35px_rgba(223,192,130,0.25)] flex items-center justify-center overflow-hidden">
                  <GoldAvatarIcon className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 text-[#dfc082] translate-y-1.5" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                    {currentReview.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#dfc082]">
                    {currentReview.tenure}
                  </p>
                </div>

                {/* Navigation and Back Controls (Clean solid borders) */}
                <div className="flex items-center gap-3 pt-2">
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
                </div>
              </div>

              {/* Right Column: Actual Review Headline & Statement */}
              <div className="md:col-span-7 space-y-6">
                <Quote className="w-8 h-8 text-[#dfc082]/70" />

                <h4 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-snug tracking-tight">
                  &ldquo;{currentReview.headline}&rdquo;
                </h4>

                <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed">
                  {currentReview.quote}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
