"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSlider } from "@/components/ProjectsSlider";
import { OngoingSection } from "@/components/OngoingSection";
import { UpcomingSection } from "@/components/UpcomingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
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
      window.__lenis.scrollTo(el, { duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBookVisit = () => {
    router.push("/consultation");
  };

  const handleExploreResidences = () => {
    scrollToSection("completed");
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#fffdf1] text-[#141416]">
        {/* Transparent Hero Navigation -> Off-White Glass on Main Page */}
        <Navbar onOpenBookVisit={handleOpenBookVisit} />

        {/* Hero — coastal morning -> ONYX architectural capture */}
        <Hero
          onExplore={handleExploreResidences}
          onBookVisit={handleOpenBookVisit}
        />

        {/* About — scrubbed narrative + animated stat counters + sliding parallax image */}
        <AboutSection />

        {/* 1. Delivered Landmarks — Clean Card Fan Slideshow */}
        <ProjectsSlider
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onOpenBookVisit={handleOpenBookVisit}
        />

        {/* 2. Ongoing Developments — Architectural Elevation Spotlight (kept AFTER Delivered) */}
        <OngoingSection
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onOpenBookVisit={handleOpenBookVisit}
        />

        {/* 3. Yet to Come — Deep Charcoal Pre-Launch Horizon Lounge */}
        <UpcomingSection onOpenBookVisit={handleOpenBookVisit} />

        {/* Homeowner Voices & Advisory Testimonials */}
        <TestimonialsSection />

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
