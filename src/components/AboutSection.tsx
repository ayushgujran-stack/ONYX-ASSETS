"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MaskedWords,
  ScrubbedText,
  SlidingImage,
  AnimatedCounter,
} from "@/components/ui/motion-primitives";

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    {
      value: 60,
      unit: "%",
      label: "Open green landscapes, private balconies & serene breezeways.",
    },
    {
      value: 30,
      unit: "+",
      label: "Years of combined engineering and architectural mastery.",
    },
    {
      value: 70,
      unit: "",
      label: "Signature apartments across Opulence (42 units) and Riviera (28 units).",
    },
    {
      value: 100,
      unit: "%",
      label: "Structural trust and certified RERA compliance on every flat.",
    },
  ];

  return (
    <section
      id="about"
      className="py-28 md:py-40 bg-[#f6f5f0] border-t border-black/5 relative overflow-clip"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase mb-12"
        >
          (ABOUT)
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-7">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#141517] font-light leading-[0.98] tracking-tight">
              <MaskedWords
                segments={[
                  { text: "Timeless " },
                  { text: "Design,", className: "italic font-normal text-[#9c8052]" },
                ]}
              />
              <br />
              <MaskedWords
                segments={[{ text: "Wellness-Focused Living." }]}
                delay={0.14}
              />
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pt-4">
            <ScrubbedText
              segments={[
                {
                  text: "Every element of Onyx Assets reflects an uncompromising commitment to excellence. From the structural durability of our foundations to our thoughtfully oriented floor plans, each property embodies a holistic approach to luxury living.",
                },
              ]}
              className="text-base sm:text-lg text-[#2c3038] font-light leading-relaxed"
            />
            <ScrubbedText
              segments={[
                {
                  text: "Whether you are seeking a landmark 3 or 4 BHK luxury apartment in Kunjibettu, a serene riverfront flat at Mission Compound, or a bespoke coastal residence, Onyx Assets crafts homes built to last for generations.",
                },
              ]}
              className="text-sm sm:text-base text-[#5e6573] font-light leading-relaxed"
              baseOpacity={0.3}
            />
          </div>
        </div>

        {/* Stats + Frameless Pan-In Parallax Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-10 border-t border-black/10">
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-3"
              >
                <div className="text-6xl sm:text-7xl font-serif text-[#141517] font-light">
                  <AnimatedCounter
                    to={s.value}
                    suffix={s.unit}
                    suffixClassName="text-3xl sm:text-4xl text-[#9c8052]"
                  />
                </div>
                <p className="text-xs sm:text-sm font-mono tracking-wider uppercase text-[#5e6573] leading-relaxed">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-6">
            <SlidingImage
              src="https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/3.jpeg"
              alt="Onyx Architectural Living Space"
              direction="left"
              className="aspect-[16/11] w-full bg-black/5"
              sizes="(max-width: 1024px) 100vw, 50vw"
              parallaxPercent={8}
              overlayGradient="bg-gradient-to-br from-[#9c8052]/10 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
