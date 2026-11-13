"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSlider } from "@/components/ProjectsSlider";
import { BeliefsSection } from "@/components/BeliefsSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { ProjectModal } from "@/components/ProjectModal";
import { ConversionDock } from "@/components/ConversionDock";
import { Property } from "@/data/properties";

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBookVisit = () => {
    router.push("/consultation");
  };

  const handleExploreResidences = () => {
    scrollToSection("projects");
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f6f5f0] text-[#141517]">
        {/* Transparent Hero Navigation -> Off-White Glass on Main Page */}
        <Navbar onOpenBookVisit={handleOpenBookVisit} />

        {/* Hero — coastal morning -> ONYX architectural capture */}
        <Hero
          onExplore={handleExploreResidences}
          onBookVisit={handleOpenBookVisit}
        />

        {/* About — scrubbed narrative + animated stat counters + sliding parallax image */}
        <AboutSection />

        {/* Curated Masterpieces — box-free expanding architectural strips */}
        <ProjectsSlider
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onOpenBookVisit={handleOpenBookVisit}
        />

        {/* 5 Architectural Beliefs — alternating asymmetric pan-in bands */}
        <BeliefsSection />

        {/* Curated Amenities — asymmetric dual-photo scrollytelling */}
        <AmenitiesSection />

        {/* Homeowner Voices & Advisory Testimonials */}
        <TestimonialsSection />

        {/* Sticky FAQ Accordion */}
        <FaqSection />

        {/* Full-Bleed Dark Outro CTA -> /consultation */}
        <CtaSection />

        {/* Minimalist Editorial Footer */}
        <Footer onOpenBookVisit={handleOpenBookVisit} />

        {/* Persistent Luxury Conversion Dock (WhatsApp + VIP Schedule Viewing) */}
        <ConversionDock
          watchHeroElement
          activePropertyName={selectedProperty?.name}
        />

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
