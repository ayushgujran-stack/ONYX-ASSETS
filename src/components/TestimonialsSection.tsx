"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { CLIENT_TESTIMONIALS } from "@/data/properties";
import { MaskedWords } from "@/components/ui/motion-primitives";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="py-28 md:py-40 bg-[#f6f5f0] border-t border-black/5 relative overflow-clip"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
            >
              (HOMEOWNER TRUST)
            </motion.span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#141517] font-light tracking-tight">
              <MaskedWords
                segments={[
                  { text: "Built on " },
                  {
                    text: "Verified Trust",
                    className: "italic font-normal text-[#9c8052]",
                  },
                ]}
              />
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#5e6573] font-light max-w-md leading-relaxed">
            Real stories from Udupi and Manipal families who trusted Onyx Assets LLP from soil breaking through registration.
          </p>
        </div>

        {/* Hairline Editorial Columns — Zero Cluttered Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 border-t border-black/10 pt-14">
          {CLIENT_TESTIMONIALS.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.75,
                delay: (idx % 3) * 0.08,
                ease: EXPO_OUT,
              }}
              className="flex flex-col justify-between space-y-6 border-b border-black/8 pb-10"
            >
              <div className="space-y-4">
                <Quote className="w-5 h-5 text-[#9c8052]/60" />
                <h3 className="font-serif text-xl sm:text-2xl text-[#141517] font-light leading-snug">
                  &ldquo;{item.headline}&rdquo;
                </h3>
                <p className="text-sm text-[#5e6573] font-light leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="text-[#141517] font-semibold">
                  {item.name}
                </span>
                <span className="text-[#9c8052] text-[10px]">{item.tenure}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
