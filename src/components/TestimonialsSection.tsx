"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { CLIENT_TESTIMONIALS } from "@/data/properties";
import { MaskedWords } from "@/components/ui/motion-primitives";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [showAll, setShowAll] = useState(false);

  // Keep it airy and uncluttered: show 3 flagship stories by default
  const displayed = showAll ? CLIENT_TESTIMONIALS : CLIENT_TESTIMONIALS.slice(0, 3);

  return (
    <section
      id="testimonials"
      className="py-24 md:py-36 bg-[#141416] text-white border-t border-dashed border-white/15 relative overflow-clip"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Minimalist Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-[0.25em] text-[#dfc082] uppercase block">
              (RESIDENCE VOICES)
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight">
              <MaskedWords
                segments={[
                  { text: "Built on " },
                  {
                    text: "Trust & Transparency",
                    className: "italic font-normal text-[#dfc082]",
                  },
                ]}
              />
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-white/60 hover:text-[#dfc082] transition-colors border-b border-dashed border-white/20 hover:border-[#dfc082] pb-1"
          >
            <span>{showAll ? "Show Curated (3)" : `View All Experiences (${CLIENT_TESTIMONIALS.length})`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Spacious 3-Column Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayed.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: (idx % 3) * 0.08,
                ease: EXPO_OUT,
              }}
              className="relative p-7 sm:p-9 rounded bg-[#1c1c20] border border-dashed border-white/10 hover:border-[#dfc082]/40 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-white/30">
                  <Quote className="w-4 h-4 text-[#dfc082]/80" />
                  <span className="text-[10px] font-mono tracking-widest">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl text-white font-normal leading-snug">
                  &ldquo;{item.headline}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-dashed border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-medium tracking-wide">
                  {item.name}
                </span>
                <span className="text-[#dfc082] text-[10px] tracking-wider uppercase">
                  {item.tenure}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
