"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
        {/* Minimalist Heading — Yet to Come */}
        <div className="text-center mb-14 md:mb-20">
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

        {/* 3-Column Architectural Horizon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              </div>

              {/* Card Content */}
              <div className="p-7 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#dfc082] mb-1.5">
                    {concept.location}
                  </div>
                  <h3 className="font-serif text-2xl text-white font-normal group-hover:text-[#dfc082] transition-colors leading-snug">
                    {concept.name}
                  </h3>
                </div>

                <button
                  onClick={onOpenBookVisit}
                  className="w-full py-3.5 rounded-full border border-white/15 hover:border-[#dfc082] bg-white/[0.04] hover:bg-[#dfc082] hover:text-[#141416] text-white text-xs font-mono uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
