"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MaskedWords,
  ScrubbedText,
  SlidingImage,
} from "@/components/ui/motion-primitives";

const CDN =
  "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e";

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
    highlights: [
      "Rooftop Infinity Pool",
      "State-of-the-Art Cardio Suites",
      "Steam & Hydrotherapy Chambers",
    ],
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
    highlights: [
      "Sky Lounge with Panoramic Vistas",
      "Private Resident Library",
      "Curated Sculpture Gardens",
    ],
  },
  {
    id: "nature",
    number: "03",
    label: "Nature",
    title: "Riverine Breezeways & Verdant Greens",
    description:
      "Nestled along scenic riverfronts and coastal breezes, Riviera and Opulence weave landscaped apartment courtyards, shaded pergolas, and deep rainwater harvesting systems into an effortless botanical haven.",
    bigImage: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg`,
    smallImage: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-3.jpeg`,
    highlights: [
      "Riverfront Promenade & Boardwalk",
      "60% Greenery Footprint",
      "Deep Rainwater Recharge Enclosures",
    ],
  },
];

export function AmenitiesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="amenities"
      className="py-28 md:py-40 bg-[#f0ede6] border-t border-black/5 relative overflow-clip"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Top Editorial Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
          >
            (CURATED AMENITIES)
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-serif text-[#141517] font-light tracking-tight">
            <MaskedWords segments={[{ text: "Spaces Designed for" }]} />
            <br />
            <MaskedWords
              segments={[
                {
                  text: "Elevated Living",
                  className: "italic font-normal text-[#9c8052]",
                },
              ]}
              delay={0.12}
            />
          </h2>
        </div>

        {/* Asymmetric Dual-Image Scrollytelling Spreads (Zero Tabs / Zero Box Frames) */}
        <div className="divide-y divide-black/10 border-t border-black/10">
          {AMENITY_SETS.map((item, idx) => {
            const reverseColumns = idx % 2 === 1;
            const bigSlideDir = reverseColumns ? "right" : "left";
            const smallSlideDir = reverseColumns ? "left" : "right";

            return (
              <article
                key={item.id}
                className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
              >
                {/* Narrative + Asymmetric Secondary Pan-In Image */}
                <div
                  className={`lg:col-span-5 space-y-8 ${
                    reverseColumns ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-[#9c8052]">
                      <span>({item.number})</span>
                      <span className="text-black/25">/</span>
                      <span className="text-[#5e6573]">{item.label}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-serif text-[#141517] font-light leading-tight">
                      <MaskedWords segments={[{ text: item.title }]} />
                    </h3>

                    <ScrubbedText
                      segments={[{ text: item.description }]}
                      className="text-sm sm:text-base text-[#2c3038] font-light leading-relaxed"
                    />
                  </div>

                  {/* Minimalist Hairline Highlights */}
                  <ul className="divide-y divide-black/10 border-y border-black/10 text-xs sm:text-sm font-mono text-[#141517]">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="py-3 flex items-center justify-between"
                      >
                        <span>{highlight}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9c8052]" />
                      </li>
                    ))}
                  </ul>

                  {/* Asymmetric Detail Image with Opposite Pan-In */}
                  <div className="w-3/4 sm:w-2/3 pt-2">
                    <SlidingImage
                      src={item.smallImage}
                      alt={`${item.label} Architectural Detail`}
                      direction={smallSlideDir}
                      className="aspect-[4/3] w-full bg-black/5"
                      sizes="(max-width: 1024px) 75vw, 25vw"
                      parallaxPercent={5}
                    />
                  </div>
                </div>

                {/* Primary Architectural Photograph */}
                <div
                  className={`lg:col-span-7 ${
                    reverseColumns ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <SlidingImage
                    src={item.bigImage}
                    alt={item.title}
                    direction={bigSlideDir}
                    className="aspect-[16/10] w-full bg-black/5"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    parallaxPercent={8}
                    overlayGradient="bg-gradient-to-t from-black/20 via-transparent to-transparent"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
