"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { CLIENT_TESTIMONIALS } from "@/data/properties";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

function GoldAvatarIcon({ className = "w-14 h-14" }: { className?: string }) {
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedReview =
    selectedIndex !== null ? CLIENT_TESTIMONIALS[selectedIndex] : null;

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + CLIENT_TESTIMONIALS.length) %
        CLIENT_TESTIMONIALS.length
    );
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % CLIENT_TESTIMONIALS.length);
  };

  const scrollReel = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const distance = direction === "left" ? -320 : 320;
    scrollContainerRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-[#141416] text-white border-t border-dashed border-white/15 relative overflow-clip min-h-[440px] flex items-center"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <AnimatePresence mode="wait">
          {selectedReview === null ? (
            /* ─── State 1: 3-Visible Scrollable Gold Avatars + Click Badge ─── */
            <motion.div
              key="avatar-reel"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EXPO_OUT }}
              className="flex flex-col items-center text-center"
            >
              {/* Minimal "Click" Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-dashed border-[#dfc082]/35 bg-[#1c1c20] text-[11px] font-mono tracking-widest uppercase text-[#dfc082] mb-12 shadow-sm select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfc082] animate-pulse" />
                <span>Click avatar to reveal review</span>
              </div>

              {/* Reel Container with Side Scroll Chevrons */}
              <div className="relative w-full max-w-4xl flex items-center justify-center">
                {/* Left scroll chevron */}
                <button
                  type="button"
                  onClick={() => scrollReel("left")}
                  aria-label="Scroll left"
                  className="hidden md:flex p-2.5 rounded-full border border-dashed border-white/15 text-white/60 hover:text-[#dfc082] hover:border-[#dfc082]/50 transition-colors mr-4 shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 3-At-A-Time Horizontal Reel */}
                <div
                  ref={scrollContainerRef}
                  className="flex items-center gap-8 sm:gap-14 overflow-x-auto scrollbar-none py-4 px-2 snap-x snap-mandatory scroll-smooth"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {CLIENT_TESTIMONIALS.map((item, idx) => (
                    <motion.button
                      key={item.name}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                      className="group flex flex-col items-center gap-3 shrink-0 snap-center focus:outline-none w-[180px] sm:w-[200px]"
                    >
                      {/* Instagram Default Silhouette with Black BG and Gold Avatar */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1c1c20] border-2 border-dashed border-[#dfc082]/40 group-hover:border-[#dfc082] group-hover:shadow-[0_0_25px_rgba(223,192,130,0.2)] transition-all duration-300 flex items-center justify-center overflow-hidden">
                        <GoldAvatarIcon className="w-16 h-16 sm:w-20 sm:h-20 text-[#dfc082] translate-y-1 group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute bottom-1 text-[9px] font-mono tracking-widest text-[#dfc082]/60 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                          Reveal
                        </span>
                      </div>

                      {/* Reviewer Name Underneath */}
                      <div className="flex flex-col items-center text-center">
                        <span className="text-sm sm:text-base font-serif text-white group-hover:text-[#dfc082] transition-colors font-medium">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase mt-0.5">
                          {item.tenure.split("•")[0]?.trim()}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Right scroll chevron */}
                <button
                  type="button"
                  onClick={() => scrollReel("right")}
                  aria-label="Scroll right"
                  className="hidden md:flex p-2.5 rounded-full border border-dashed border-white/15 text-white/60 hover:text-[#dfc082] hover:border-[#dfc082]/50 transition-colors ml-4 shrink-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* ─── State 2: Avatar Shifts to Side + Review Text Expands ─── */
            <motion.div
              key={`review-${selectedReview.name}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EXPO_OUT }}
              className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              {/* Left Column: Avatar on the Side + Reviewer Details */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:border-r border-dashed border-white/15 md:pr-8">
                {/* Profile Avatar Disc */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1c1c20] border-2 border-[#dfc082] shadow-[0_0_30px_rgba(223,192,130,0.25)] flex items-center justify-center overflow-hidden">
                  <GoldAvatarIcon className="w-16 h-16 sm:w-20 sm:h-20 text-[#dfc082] translate-y-1" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                    {selectedReview.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#dfc082]">
                    {selectedReview.tenure}
                  </p>
                </div>

                {/* Navigation and Back Controls */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-dashed border-white/20 hover:border-[#dfc082] text-white/70 hover:text-[#dfc082] text-xs font-mono uppercase tracking-wider transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <div className="flex items-center gap-1 border-l border-white/10 pl-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous review"
                      className="p-1.5 rounded border border-dashed border-white/20 hover:border-[#dfc082] text-white/60 hover:text-[#dfc082] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next review"
                      className="p-1.5 rounded border border-dashed border-white/20 hover:border-[#dfc082] text-white/60 hover:text-[#dfc082] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Actual Review Headline & Statement */}
              <div className="md:col-span-8 space-y-5">
                <Quote className="w-7 h-7 text-[#dfc082]/70" />

                <h4 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-snug tracking-tight">
                  &ldquo;{selectedReview.headline}&rdquo;
                </h4>

                <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
                  {selectedReview.quote}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
