"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Compass, Sparkles, Trees, Users } from "lucide-react";

const CDN = "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e";

const BELIEFS = [
  {
    id: "01",
    title: "Holistic Architecture",
    tagline: "Designed for wellbeing and harmony",
    icon: Compass,
    description:
      "Every Onyx development is designed with spatial intelligence—maximizing natural cross-ventilation, coastal sunlight penetration, and organic flow between private chambers and communal living areas.",
    image: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg`,
  },
  {
    id: "02",
    title: "Discretion & Exclusivity",
    tagline: "Sanctuary for discerning homeowners",
    icon: ShieldCheck,
    description:
      "Our layouts offer high privacy margins: low unit density per floor, secluded private lobbies, and sound-insulated thermal glass envelopes that keep external noise outside your personal sanctuary.",
    image: `${CDN}/1.jpeg`,
  },
  {
    id: "03",
    title: "Vastu & Cultural Enrichment",
    tagline: "Timeless heritage in modern forms",
    icon: Sparkles,
    description:
      "Rooted in the cultural traditions of coastal Karnataka, every residence harmonizes traditional Vastu Shastra orientations with contemporary European interior finishes and clean geometric lines.",
    image: `${CDN}/2.jpeg`,
  },
  {
    id: "04",
    title: "Community & Connection",
    tagline: "Shared spaces designed for meaningful bonds",
    icon: Users,
    description:
      "From open-air rooftop lounges to riverside walkways at Riviera, Onyx properties cultivate vibrant, safe communities where families flourish and neighborly bonds flourish naturally.",
    image: `${CDN}/Marpalli%201.jpeg`,
  },
  {
    id: "05",
    title: "Sustainable Elegance",
    tagline: "Built to endure for generations",
    icon: Trees,
    description:
      "Deep rainwater recharge pits, energy-efficient fixtures, solar lighting for communal passages, and responsibly sourced stone and timber ensure our footprints protect Karnataka's coastal ecosystem.",
    image: `${CDN}/SAMPOORNA%201.jpeg`,
  },
];

export function BeliefsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentBelief = BELIEFS[activeTab];

  return (
    <section id="beliefs" className="py-28 md:py-40 bg-[#f6f5f0] border-t border-black/5 relative overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Top Header with masked scroll reveal */}
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
          >
            (OUR BELIEFS)
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "70%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl font-serif text-[#141517] font-light tracking-tight"
            >
              A Vision of <span className="italic font-normal text-[#9c8052]">Inspired Living</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base text-[#5e6573] font-light leading-relaxed"
          >
            Our architectural philosophy is anchored in five core commitments that guide every
            pencil sketch, structural pour, and interior finish.
          </motion.p>
        </div>

        {/* Interactive Layout: Tabs Left, Dynamic Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Tabs List with staggered entrance and spring physics */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {BELIEFS.map((belief, idx) => (
              <motion.button
                key={belief.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setActiveTab(idx)}
                className={`relative text-left p-6 rounded-2xl border transition-colors duration-300 flex items-center justify-between group overflow-hidden ${
                  activeTab === idx
                    ? "bg-white border-black/15 shadow-md"
                    : "bg-transparent border-black/5 hover:bg-white/50 text-[#5e6573]"
                }`}
              >
                {activeTab === idx && (
                  <motion.div
                    layoutId="active-belief-accent"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#9c8052]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="flex items-center gap-4 pl-2">
                  <span className="font-mono text-xs text-[#9c8052]">
                    ({belief.id})
                  </span>
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-serif transition-colors ${
                        activeTab === idx
                          ? "text-[#141517] font-medium"
                          : "text-[#5e6573] group-hover:text-black"
                      }`}
                    >
                      {belief.title}
                    </h3>
                    <p className="text-xs text-[#7c8391] font-mono mt-0.5">
                      {belief.tagline}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    activeTab === idx
                      ? "text-[#9c8052] translate-x-1"
                      : "text-black/20 group-hover:translate-x-1"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Right Preview Showcase with spring image zoom */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBelief.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-3xl overflow-hidden bg-white border border-black/10 shadow-xl p-8 sm:p-12 flex flex-col justify-between gap-8"
              >
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-inner bg-black/5" style={{ position: "relative" }}>
                  <motion.div
                    key={currentBelief.image}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={currentBelief.image}
                      alt={currentBelief.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9c8052]">
                    <span>Pillar {currentBelief.id} of 05</span>
                  </div>
                  <h3 className="text-3xl font-serif text-[#141517]">
                    {currentBelief.title}
                  </h3>
                  <p className="text-base text-[#2c3038] font-light leading-relaxed">
                    {currentBelief.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
