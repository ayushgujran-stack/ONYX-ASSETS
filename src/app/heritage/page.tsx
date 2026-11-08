"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Compass, Sparkles, Building, CheckCircle2 } from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const CDN = "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e";

const TIMELINE = [
  {
    year: "1994",
    title: "The Founding Principle",
    description:
      "Established with a core conviction: in the world of construction, trust is the immutable foundation. Onyx Assets commenced operations in Udupi, prioritizing seismic-grade engineering over speculative volume.",
  },
  {
    year: "2006",
    title: "Pioneering Coastal Micro-Climates",
    description:
      "Engineered bespoke building envelopes tailored to coastal Karnataka's heavy monsoons and saline coastal air, integrating deep laterite insulation, cross-ventilation shafts, and advanced waterproofing.",
  },
  {
    year: "2015",
    title: "The Onyx Villa Enclave Conception",
    description:
      "Acquired prime coastal green belts to develop low-density private sanctuaries. Villas 2 through 12 established a new benchmark for private gated luxury in Udupi.",
  },
  {
    year: "2023",
    title: "Signature Architectural Series",
    description:
      "Delivered A.R. Sattva and broke ground on flagship urban residences Opulence (Kunjibettu) and Riviera (Mission Compound), blending international minimalism with Vastu cultural roots.",
  },
  {
    year: "Present",
    title: "Three Decades of Uncompromised Trust",
    description:
      "Continuing an unbroken track record of zero-litigation, 100% RERA compliance, and multi-generational client relationships spanning across India and the global diaspora.",
  },
];

const VALUES = [
  {
    number: "01",
    title: "Structural Rigor",
    description:
      "Every foundation is cast with deep soil stratum load calibrations, earthquake-resistant reinforcement, and certified high-grade concrete engineered to endure for centuries.",
  },
  {
    number: "02",
    title: "Cultural & Vastu Resonance",
    description:
      "We honor coastal Karnataka's rich living traditions. Spatial orientation, natural light entry, and air movements are harmonized according to classical Vastu Shastra principles.",
  },
  {
    number: "03",
    title: "Absolute Discretion",
    description:
      "Our clientele includes discerning families, enterprise founders, and international residents. Every transaction, site visit, and customization is managed with strict privacy.",
  },
];

export default function HeritagePage() {
  const handleOpenBookVisit = () => {
    window.location.href = "/consultation";
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f6f5f0] text-[#141517]">
        <Navbar onOpenBookVisit={handleOpenBookVisit} />

        {/* Hero Banner */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#121316] text-[#f6f5f0] overflow-hidden">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#c5a059] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Overview</span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block mb-4">
                  THREE DECADES OF MASTERY
                </span>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[0.96]"
                  >
                    Built on Trust, <br />
                    <span className="italic font-normal text-[#c5a059]">Poured in Stone</span>
                  </motion.h1>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-4 space-y-4 lg:pb-3"
              >
                <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  In the world of construction, trust is everything. For over 30 years, Onyx Assets LLP has shaped the skylines and private enclaves of Udupi with unyielding integrity.
                </p>
                <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-white/50 pt-2 border-t border-white/10">
                  <span>Est. 1994</span>
                  <span>•</span>
                  <span>100% RERA Certified</span>
                  <span>•</span>
                  <span>Udupi, Karnataka</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Heritage Narrative & Founder Philosophy */}
        <section className="py-24 md:py-36 border-b border-black/5">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block">
                  OUR PHILOSOPHY
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#141517] tracking-tight leading-[1.05]">
                  A Home Must Be More <br />
                  <span className="italic font-normal text-[#9c8052]">Than Just a Structure</span>
                </h2>
                <p className="text-base sm:text-lg text-[#2c3038] font-light leading-relaxed">
                  At Onyx Assets LLP, our mission is to build homes that inspire and delight. We believe that a residence should be a direct reflection of your personality, family heritage, and enduring taste.
                </p>
                <p className="text-sm sm:text-base text-[#5e6573] font-light leading-relaxed">
                  We work closely with our clients from initial architectural conceptualization to final keys handover, using advanced construction methodology to ensure that our homes exceed expectations across decades.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-6 border-t border-black/10">
                  <div>
                    <span className="text-4xl font-serif text-[#141517]">30+</span>
                    <p className="text-xs font-mono uppercase tracking-widest text-[#5e6573] mt-1">
                      Years Combined Mastery
                    </p>
                  </div>
                  <div>
                    <span className="text-4xl font-serif text-[#141517]">100%</span>
                    <p className="text-xs font-mono uppercase tracking-widest text-[#5e6573] mt-1">
                      Structural Integrity
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-black/10">
                  <Image
                    src={`${CDN}/3.jpeg`}
                    alt="Onyx Assets Architectural Craft"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white text-xs font-mono uppercase tracking-widest">
                    Craftsmanship in Natural Stone & Teak
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 30-Year Chronological Timeline */}
        <section className="py-24 md:py-36 bg-[#f0ede6] border-b border-black/5">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3">
                MILESTONES OF RIGOR
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif font-light text-[#141517] tracking-tight">
                Chronicles of <span className="italic font-normal text-[#9c8052]">Three Decades</span>
              </h2>
            </div>

            <div className="space-y-8 max-w-4xl">
              {TIMELINE.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="bg-white border border-black/8 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row gap-6 sm:gap-10 items-start"
                >
                  <span className="font-serif text-3xl sm:text-4xl text-[#9c8052] font-light shrink-0 w-24">
                    {item.year}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-[#141517] font-normal">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5e6573] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Pillars Grid */}
        <section className="py-24 md:py-36">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3">
                THE FOUNDATION
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif font-light text-[#141517] tracking-tight">
                Our Core <span className="italic font-normal text-[#9c8052]">Commitments</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VALUES.map((val) => (
                <div
                  key={val.number}
                  className="bg-white border border-black/8 rounded-2xl p-8 space-y-4 shadow-sm"
                >
                  <span className="font-mono text-xs text-[#9c8052]">({val.number})</span>
                  <h3 className="font-serif text-2xl text-[#141517] font-normal">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#5e6573] font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Callout */}
            <div className="mt-16 pt-12 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm font-serif text-[#141517]">
                  Ready to experience our architectural portfolio in person?
                </p>
                <p className="text-xs font-mono text-[#9c8052] mt-1">
                  Private viewings arranged with senior partners.
                </p>
              </div>
              <Link
                href="/consultation"
                className="px-8 py-4 rounded-full bg-[#141517] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#9c8052] transition-colors duration-300 shadow-lg flex items-center gap-2"
              >
                <span>BOOK A PRIVATE CONSULTATION</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer onOpenBookVisit={handleOpenBookVisit} />
      </main>
    </SmoothScroll>
  );
}
