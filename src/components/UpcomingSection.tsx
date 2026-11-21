"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles, Lock } from "lucide-react";
import { UPCOMING_CONCEPTS } from "@/data/properties";
import { MaskedWords } from "@/components/ui/motion-primitives";
import { ConcreteTexture } from "@/components/ui/ConcreteTexture";

interface UpcomingSectionProps {
  onOpenBookVisit: () => void;
}

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function UpcomingSection({ onOpenBookVisit }: UpcomingSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="upcoming"
      className="py-24 md:py-36 bg-[#121316] text-[#fffdf1] border-t border-white/10 relative overflow-clip"
    >
      {/* Tadao Ando architectural poured concrete texture — dark obsidian variant */}
      <ConcreteTexture variant="dark" />

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="text-xs font-mono tracking-[0.25em] text-[#dfc082] uppercase block mb-3"
            >
              (MASTER-PLAN HORIZONS • PRE-LAUNCH RELEASES)
            </motion.span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white font-light tracking-tight">
              <MaskedWords
                segments={[
                  { text: "Yet to " },
                  {
                    text: "Come",
                    className: "italic font-normal text-[#dfc082]",
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
            className="max-w-md"
          >
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Upcoming coastal residential skyscrapers currently undergoing architectural modeling and statutory sanctioning. Reserve early allocation access prior to general public market release.
            </p>
          </motion.div>
        </div>

        {/* 3-Column Architectural Horizon Lounge */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {UPCOMING_CONCEPTS.map((concept, idx) => (
            <motion.div
              key={concept.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: EXPO_OUT }}
              className="group relative rounded-2xl bg-[#1c1d22] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#dfc082]/40 transition-all duration-500 shadow-xl"
            >
              {/* Concept Image with Aspect Ratio and Subtle Zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                <Image
                  src={concept.image}
                  alt={concept.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1d22] via-[#1c1d22]/30 to-transparent" />

                {/* Horizon Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-widest text-[#dfc082]">
                  {concept.horizon}
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfc082] animate-pulse" />
                  <span>{concept.status}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#dfc082] mb-1">
                    {concept.location}
                  </div>
                  <h3 className="font-serif text-2xl text-white font-normal group-hover:text-[#dfc082] transition-colors leading-snug">
                    {concept.name}
                  </h3>
                  <p className="text-xs text-white/55 font-light leading-relaxed mt-2 line-clamp-3">
                    {concept.description}
                  </p>
                </div>

                {/* Highlights tags */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {concept.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-[10px] font-mono text-white/70"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onOpenBookVisit}
                    className="w-full mt-3 py-3 rounded-lg border border-white/15 hover:border-[#dfc082] bg-white/[0.03] hover:bg-[#dfc082] hover:text-[#141416] text-white text-xs font-mono uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#dfc082] group-hover/btn:text-[#141416] transition-colors" />
                    <span>Request VIP Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Priority Investor Desk Banner */}
        <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-r from-[#1c1d22] via-[#24252b] to-[#1c1d22] border border-white/12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dfc082]">
              <Sparkles className="w-4 h-4" />
              <span>Confidential Off-Market Priority Allocation</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
              Are you looking for pre-launch coastal real estate in Udupi or Manipal?
            </h3>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Connect directly with our partners to discuss off-market pre-commitments, floor-plate preferences, and custom duplex configurations before public unveilings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={onOpenBookVisit}
              className="px-8 py-4 rounded-full bg-[#c5a059] text-[#141416] font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 font-semibold shadow-lg flex items-center gap-2"
            >
              <span>Schedule Partner Advisory</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <Link
              href="/consultation"
              className="px-7 py-4 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white transition-colors text-center"
            >
              Investor Briefing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
