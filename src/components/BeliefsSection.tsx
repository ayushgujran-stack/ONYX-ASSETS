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

const BELIEFS = [
  {
    id: "01",
    title: "Holistic Architecture",
    tagline: "Designed for wellbeing and harmony",
    description:
      "Every Onyx development is designed with spatial intelligence—maximizing natural cross-ventilation, coastal sunlight penetration, and organic flow between private chambers and communal living areas.",
    image: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg`,
  },
  {
    id: "02",
    title: "Discretion & Exclusivity",
    tagline: "Sanctuary for discerning homeowners",
    description:
      "Our layouts offer high privacy margins: low unit density per floor, secluded private lobbies, and sound-insulated thermal glass envelopes that keep external noise outside your personal sanctuary.",
    image: `${CDN}/1.jpeg`,
  },
  {
    id: "03",
    title: "Vastu & Cultural Enrichment",
    tagline: "Timeless heritage in modern forms",
    description:
      "Rooted in the cultural traditions of coastal Karnataka, every residence harmonizes traditional Vastu Shastra orientations with contemporary European interior finishes and clean geometric lines.",
    image: `${CDN}/2.jpeg`,
  },
  {
    id: "04",
    title: "Community & Connection",
    tagline: "Shared spaces designed for meaningful bonds",
    description:
      "From open-air rooftop lounges to riverside walkways at Riviera, Onyx properties cultivate vibrant, safe communities where families flourish and neighborly bonds grow naturally.",
    image: `${CDN}/Marpalli%201.jpeg`,
  },
  {
    id: "05",
    title: "Sustainable Elegance",
    tagline: "Built to endure for generations",
    description:
      "Deep rainwater recharge pits, energy-efficient fixtures, solar lighting for communal passages, and responsibly sourced stone and timber ensure our footprints protect Karnataka's coastal ecosystem.",
    image: `${CDN}/SAMPOORNA%201.jpeg`,
  },
];

export function BeliefsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="beliefs"
      className="py-28 md:py-40 bg-[#f6f5f0] border-t border-black/5 relative overflow-clip"
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
            (OUR BELIEFS)
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-serif text-[#141517] font-light tracking-tight">
            <MaskedWords
              segments={[
                { text: "A Vision of " },
                {
                  text: "Inspired Living",
                  className: "italic font-normal text-[#9c8052]",
                },
              ]}
            />
          </h2>
          <ScrubbedText
            segments={[
              {
                text: "Our architectural philosophy is anchored in five core commitments that guide every pencil sketch, structural pour, and interior finish.",
              },
            ]}
            className="mt-5 text-base sm:text-lg text-[#5e6573] font-light leading-relaxed"
          />
        </div>

        {/* Continuous Scrollytelling Asymmetric Bands (Zero Tabs / Zero Card Boxes) */}
        <div className="divide-y divide-black/10 border-t border-black/10">
          {BELIEFS.map((belief, idx) => {
            const imageFirstOnDesktop = idx % 2 === 1;
            const slideDirection = idx % 2 === 0 ? "left" : "right";

            return (
              <article
                key={belief.id}
                className="py-14 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                <div
                  className={`lg:col-span-5 space-y-5 ${
                    imageFirstOnDesktop ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-mono tracking-[0.22em] uppercase text-[#9c8052]">
                    <span>({belief.id})</span>
                    <span className="text-black/25">/</span>
                    <span className="text-[#5e6573]">{belief.tagline}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#141517] font-light leading-tight">
                    <MaskedWords segments={[{ text: belief.title }]} />
                  </h3>

                  <ScrubbedText
                    segments={[{ text: belief.description }]}
                    className="text-sm sm:text-base text-[#2c3038] font-light leading-relaxed"
                  />
                </div>

                <div
                  className={`lg:col-span-7 ${
                    imageFirstOnDesktop ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <SlidingImage
                    src={belief.image}
                    alt={belief.title}
                    direction={slideDirection}
                    className="aspect-[16/10] w-full bg-black/5"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    parallaxPercent={7}
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
