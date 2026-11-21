"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, ShieldCheck, MapPin } from "lucide-react";
import { ALL_PORTFOLIO, Property } from "@/data/properties";
import { MaskedWords, SlidingImage } from "@/components/ui/motion-primitives";
import { ConcreteTexture } from "@/components/ui/ConcreteTexture";

interface OngoingSectionProps {
  onSelectProperty: (property: Property) => void;
  onOpenBookVisit: () => void;
}

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function OngoingSection({
  onSelectProperty,
  onOpenBookVisit,
}: OngoingSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Filter to ongoing developments
  const ongoingProperties = useMemo(
    () => ALL_PORTFOLIO.filter((p) => p.projectPhase === "ongoing"),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeProperty = ongoingProperties[activeIndex] ?? ongoingProperties[0];

  return (
    <section
      id="ongoing"
      className="py-24 md:py-36 bg-[#fffdf1] border-t border-dashed border-black/12 relative overflow-clip"
    >
      {/* Poured concrete grain — light cream surface */}
      <ConcreteTexture variant="light" />

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
            >
              (ACTIVE HIGH-RISE CONSTRUCTIONS)
            </motion.span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#141416] font-light tracking-tight">
              <MaskedWords
                segments={[
                  { text: "Ongoing " },
                  {
                    text: "Developments",
                    className: "italic font-normal text-[#9c8052]",
                  },
                ]}
              />
            </h2>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EXPO_OUT }}
            className="flex items-center gap-6"
          >
            <Link
              href="/estates?status=ongoing"
              className="group inline-flex items-center gap-2 pb-1.5 border-b border-black/25 text-xs font-mono uppercase tracking-[0.2em] text-[#141416] hover:text-[#9c8052] hover:border-[#9c8052] transition-colors"
            >
              <span>View All 8 Ongoing Towers</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Tower Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-10 border-b border-dashed border-black/12">
          {ongoingProperties.map((prop, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={prop.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative px-5 py-3 rounded-full text-xs font-mono uppercase tracking-[0.16em] whitespace-nowrap transition-colors duration-300 shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-[#97968d] hover:text-[#141416] bg-black/[0.03]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="ongoing-active-pill"
                    transition={{ duration: 0.45, ease: EXPO_OUT }}
                    className="absolute inset-0 rounded-full bg-[#141416] shadow-sm"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span>{prop.name}</span>
                  <span
                    className={`text-[10px] ${
                      isActive ? "text-[#dfc082]" : "text-black/35"
                    }`}
                  >
                    ({prop.possession?.split("•")[0]?.trim() || "Active"})
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Elevation Spotlight (7 Cols Image + 5 Cols Spec Matrix) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProperty.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: EXPO_OUT }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            {/* Architectural Elevation (7 Cols) */}
            <div
              onClick={() => onSelectProperty(activeProperty)}
              className="lg:col-span-7 relative group cursor-pointer"
            >
              <SlidingImage
                src={activeProperty.image}
                alt={activeProperty.name}
                direction="left"
                className="aspect-[16/10] rounded-2xl shadow-2xl border border-black/8"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />

              {/* Verified Status Tag */}
              <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#141416] shadow-md border border-black/5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Under Construction • {activeProperty.status}</span>
              </div>
            </div>

            {/* Spec Matrix & Direct CTAs (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#9c8052] border-b border-dashed border-black/15 pb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeProperty.location}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#141416] font-light leading-tight">
                {activeProperty.name}
              </h3>

              <p className="text-sm sm:text-base text-[#97968d] font-light leading-relaxed">
                {activeProperty.description}
              </p>

              {/* 3-Metric Hairline Strip */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-black/10">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#97968d]">
                    Typology
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#141416] mt-1">
                    {activeProperty.units || "Luxury Suites"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#97968d]">
                    Possession
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#9c8052] mt-1">
                    {activeProperty.possession?.split("•")[0]?.trim() || "On Schedule"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#97968d]">
                    K-RERA
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#141416] mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Approved</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectProperty(activeProperty)}
                  className="group px-7 py-3.5 rounded bg-[#141416] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors shadow-md flex items-center gap-2"
                >
                  <span>Inspect Residence</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  onClick={onOpenBookVisit}
                  className="px-6 py-3.5 rounded border border-[rgba(20,20,22,0.18)] border-dashed bg-white text-[#141416] hover:border-[#141416] text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#9c8052]" />
                  <span>Book Site Visit</span>
                </button>

                <Link
                  href={`/estates/${activeProperty.id}`}
                  className="px-4 py-3.5 text-[11px] font-mono uppercase tracking-[0.18em] text-[#97968d] hover:text-[#9c8052] transition-colors"
                >
                  Full Dossier →
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
