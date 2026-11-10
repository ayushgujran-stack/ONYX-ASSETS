"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Building2, Trees, Landmark } from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ProjectModal } from "@/components/ProjectModal";
import { Footer } from "@/components/Footer";
import { ALL_PORTFOLIO, Property } from "@/data/properties";

export default function EstatesPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleOpenBookVisit = () => {
    const el = document.getElementById("booking-cta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f6f5f0] text-[#141517]">
        {/* Floating Header */}
        <Navbar onOpenBookVisit={handleOpenBookVisit} />

        {/* Dedicated Estates Hero Banner */}
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 bg-[#121316] text-[#f6f5f0] overflow-hidden border-b border-black/10">
          {/* Warm ambient golden glow */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
            {/* Back link */}
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block mb-4"
                >
                  (COMPLETE PORTFOLIO CATALOG)
                </motion.span>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[0.96]"
                  >
                    The Onyx <br />
                    <span className="italic font-normal text-[#c5a059]">Collection</span>
                  </motion.h1>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-4 space-y-4 lg:pb-3"
              >
                <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  Explore every residence, private villa, and landmark coastal development conceived, engineered, and delivered across Udupi by Onyx Assets LLP.
                </p>
                <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-white/50 pt-2 border-t border-white/10">
                  <span>16 Properties</span>
                  <span>•</span>
                  <span>Udupi Prime & Coastal</span>
                </div>
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
