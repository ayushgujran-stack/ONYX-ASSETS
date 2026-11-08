"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSlider } from "@/components/ProjectsSlider";
import { BeliefsSection } from "@/components/BeliefsSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { ProjectModal } from "@/components/ProjectModal";
import { Property } from "@/data/properties";

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleOpenBookVisit = () => {
    const el = document.getElementById("cta");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleExploreResidences = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f6f5f0] text-[#141517]">
        {/* Floating Glass Header */}
        <Navbar onOpenBookVisit={handleOpenBookVisit} />

        {/* Hero — parallax bg + shader grain + masked letter reveal */}
        <Hero onExplore={handleExploreResidences} onBookVisit={handleOpenBookVisit} />

        {/* About — spring physics parallax image + stat counters */}
        <AboutSection />

        {/* Curated Masterpieces — 7 expanding architectural cards */}
        <ProjectsSlider
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onOpenBookVisit={handleOpenBookVisit}
        />

        {/* Multi-Page Portal: Invitation to Dedicated Estates Archive */}
        <section className="py-20 bg-[#ede8df] border-y border-black/8 relative overflow-hidden">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-3 max-w-2xl"
            >
              <span className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block">
                (THE EXTENDED COLLECTION)
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#141517] font-light tracking-tight">
                Explore All 16 Estates & Private Villas
              </h2>
              <p className="text-sm text-[#5e6573] font-light leading-relaxed">
                Discover our full archival portfolio: upcoming landmark high-rises in Kunjibettu, riverfront residences at Mission Compound, and exclusive private coastal villas 2 through 12.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Link
                href="/estates"
                className="group px-8 py-4 rounded-full bg-[#141517] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#9c8052] transition-colors duration-300 shadow-lg flex items-center gap-3 shrink-0"
              >
                <span>VIEW ALL 16 ESTATES</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 5 Architectural Beliefs */}
        <BeliefsSection />

        {/* Curated Amenities (Wellness / Art / Nature) */}
        <AmenitiesSection />

        {/* FAQ Accordion */}
        <FaqSection />

        {/* Fullscreen CTA & Lead Capture */}
        <CtaSection />

        {/* Editorial Footer */}
        <Footer onOpenBookVisit={handleOpenBookVisit} />

        {/* Property Detail Modal */}
        <ProjectModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onBookVisit={() => {
            setSelectedProperty(null);
            handleOpenBookVisit();
          }}
        />
      </main>
    </SmoothScroll>
  );
}
