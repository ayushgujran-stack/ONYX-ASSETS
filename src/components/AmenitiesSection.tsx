"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

const CDN = "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e";

const AMENITY_SETS = [
  {
    id: "wellness",
    number: "01",
    label: "Wellness",
    title: "Sanctuary of Health & Vitality",
    description:
      "Temperature-controlled infinity pools overlooking coastal palm canopies, private wellness fitness pavilions, and dedicated open-air yoga decks engineered for mindful daily rejuvenation.",
    bigImage: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg`,
    smallImage: `${CDN}/1.jpeg`,
    highlights: ["Rooftop Infinity Pool", "State-of-the-Art Cardio Suites", "Steam & Hydrotherapy Chambers"],
  },
  {
    id: "art",
    number: "02",
    label: "Art Inspired Spaces",
    title: "Double-Height Atriums & Sky Lounges",
    description:
      "Grand marble arrival lobbies, triple-height architectural voids, and museum-grade gallery corridors celebrate curated lighting, minimalist stone sculptures, and timeless tactile materials.",
    bigImage: `${CDN}/3.jpeg`,
    smallImage: `${CDN}/2.jpeg`,
    highlights: ["Sky Lounge with Panoramic Vistas", "Private Resident Library", "Curated Sculpture Gardens"],
  },
  {
    id: "nature",
    number: "03",
    label: "Nature",
    title: "Riverine Breezeways & Verdant Greens",
    description:
      "Nestled along scenic riverfronts and coastal breezes, Riviera and the Onyx Villa Enclave weave native flora, shaded pergolas, and natural rainwater harvesting systems into an effortless botanical haven.",
    bigImage: `${CDN}/Marpalli%201.jpeg`,
    smallImage: `${CDN}/Marpalli%202.jpeg`,
    highlights: ["Riverfront Promenade & Boardwalk", "60% Greenery Footprint", "Deep Rainwater Recharge Enclosures"],
  },
];

export function AmenitiesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentSet = AMENITY_SETS[activeIdx];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawInsetY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const insetY = useSpring(rawInsetY, { stiffness: 80, damping: 25 });

  return (
    <section
      ref={sectionRef}
      id="amenities"
      className="py-28 md:py-40 bg-[#f0ede6] border-t border-black/5 relative overflow-hidden"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Top Header with masked entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
            >
              (CURATED AMENITIES)
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "70%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl font-serif text-[#141517] font-light tracking-tight"
              >
                Spaces Designed for <br />
                <span className="italic font-normal text-[#9c8052]">Elevated Living</span>
              </motion.h2>
            </div>
          </div>

          {/* Tab Switcher with spring pill animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-black/10 shadow-sm font-mono text-xs uppercase tracking-widest relative"
          >
            {AMENITY_SETS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative px-5 py-2.5 rounded-full transition-colors duration-300 z-10 ${
                  activeIdx === idx ? "text-white" : "text-[#5e6573] hover:text-black"
                }`}
              >
                {activeIdx === idx && (
                  <motion.div
                    layoutId="active-amenity-pill"
                    className="absolute inset-0 bg-[#141517] rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Dual Image & Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Dual Image Frame */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSet.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Big primary image */}
                <div
                  className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl bg-black/10"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={currentSet.bigImage}
                    alt={currentSet.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating small inset detail image with spring parallax float */}
                <motion.div
                  style={{ y: insetY }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="hidden sm:block absolute -bottom-8 -right-6 w-52 sm:w-64 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                >
                  <Image
                    src={currentSet.smallImage}
                    alt="Detail Spec"
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-5 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSet.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div>
                  <span className="font-mono text-xs text-[#9c8052] uppercase tracking-[0.2em] block mb-2">
                    Collection {currentSet.number}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif text-[#141517] font-normal leading-tight">
                    {currentSet.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#2c3038] font-light leading-relaxed">
                  {currentSet.description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-3 pt-4 border-t border-black/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#5e6573] block mb-2">
                    Key Highlights
                  </span>
                  <ul className="space-y-2.5">
                    {currentSet.highlights.map((h, i) => (
                      <motion.li
                        key={h}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex items-center gap-3 text-xs sm:text-sm font-mono text-[#141517]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9c8052]" />
                        <span>{h}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
