"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ProjectModal } from "@/components/ProjectModal";
import { ConversionDock } from "@/components/ConversionDock";
import { Footer } from "@/components/Footer";
import { MaskedWords } from "@/components/ui/motion-primitives";
import { Property } from "@/data/properties";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export default function EstatesPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleOpenBookVisit = () => {
    const el = document.getElementById("booking-cta");
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f6f5f0] text-[#141517]">
        {/* Floating Header */}
        <Navbar onOpenBookVisit={handleOpenBookVisit} />

        {/* Warm Sand Editorial Hero Matching FindRealEstate Rhythm */}
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 bg-[#f6f5f0] text-[#141517] overflow-clip">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
            {/* Back link */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="mb-10"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#9c8052] hover:text-[#141517] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Overview</span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              <div className="lg:col-span-8">
                <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-serif font-light text-[#141517] tracking-tight leading-[0.94]">
                  <MaskedWords
                    segments={[
                      { text: "The Onyx " },
                      {
                        text: "Residences",
                        className: "italic font-normal text-[#9c8052]",
                      },
                    ]}
                  />
                </h1>
              </div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.25, ease: EXPO_OUT }}
                className="lg:col-span-4 lg:pb-2"
              >
                <p className="text-sm sm:text-base text-[#5e6573] font-light leading-relaxed">
                  Flagship luxury apartments, signature flats, and private enclaves conceived across Udupi.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Full Portfolio Grid with interactive filtering */}
        <PortfolioGrid
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onOpenBookVisit={handleOpenBookVisit}
        />

        {/* Private Consultation CTA Section */}
        <section
          id="booking-cta"
          className="py-24 bg-[#141517] text-white border-t border-white/10 relative overflow-hidden"
        >
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
                (PRIVATE ADVISORY)
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-white">
                Schedule a Bespoke Architectural Tour
              </h2>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Connect directly with Onyx Assets senior partners for confidential site walk-throughs, title verifications, and tailored investment allocations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="tel:+919113925641"
                className="px-8 py-4 rounded-full bg-[#c5a059] text-[#141517] font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 font-semibold shadow-lg text-center"
              >
                Call Senior Advisor (+91 91139 25641)
              </a>
              <Link
                href="/consultation"
                className="px-8 py-4 rounded-full border border-white/30 bg-white/5 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <span>Online Inquiry Form</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Editorial Footer */}
        <Footer onOpenBookVisit={handleOpenBookVisit} />

        {/* Persistent Luxury Conversion Dock */}
        <ConversionDock activePropertyName={selectedProperty?.name} />

        {/* Architectural Specs & Floor Plan Modal */}
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
