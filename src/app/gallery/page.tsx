"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  MapPin,
} from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectModal } from "@/components/ProjectModal";
import { ConversionDock } from "@/components/ConversionDock";
import { MaskedWords, SlidingImage } from "@/components/ui/motion-primitives";
import {
  ALL_PORTFOLIO,
  GALLERY_PHOTOS,
  GalleryPhoto,
  Property,
} from "@/data/properties";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

type GalleryCategory =
  | "All Frames"
  | "Luxury Flats"
  | "Signature Flats"
  | "Private Villas";

const CATEGORIES: GalleryCategory[] = [
  "All Frames",
  "Luxury Flats",
  "Signature Flats",
  "Private Villas",
];

export default function GalleryPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("All Frames");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All Frames") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Keyboard navigation in Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const activePhoto: GalleryPhoto | null =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] ?? null : null;

  const handleOpenProperty = (projectId: string) => {
    const match = ALL_PORTFOLIO.find((p) => p.id === projectId);
    if (match) {
      setLightboxIndex(null);
      setSelectedProperty(match);
    }
  };

  const handleOpenBookVisit = () => {
    router.push("/consultation");
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f6f5f0] text-[#141517]">
        {/* Consistent Header */}
        <Navbar onOpenBookVisit={handleOpenBookVisit} />

        {/* Editorial Obsidian Hero Banner */}
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 bg-[#121316] text-[#f6f5f0] overflow-hidden border-b border-black/10">
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EXPO_OUT }}
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
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EXPO_OUT }}
                  className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block mb-4"
                >
                  (ARCHITECTURAL ARCHIVE)
                </motion.span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[0.96]">
                  <MaskedWords
                    segments={[
                      { text: "Visual " },
                      {
                        text: "Gallery",
                        className: "italic font-normal text-[#c5a059]",
                      },
                    ]}
                  />
                </h1>
              </div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: EXPO_OUT }}
                className="lg:col-span-4 space-y-4 lg:pb-3"
              >
                <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  Study the stone facades, tropical foliage envelopes, sky decks, and sunlit courtyards across our coastal Karnataka portfolio.
                </p>
                <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-white/50 pt-2 border-t border-white/10">
                  <span>{GALLERY_PHOTOS.length} Plates</span>
                  <span>•</span>
                  <span>Authentic Elevations</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Filtering & Editorial Grid */}
        <section className="py-20 md:py-32 bg-[#f6f5f0]">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12">
            {/* Category Navigation Bar */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-5 mb-12 border-b border-black/10">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                const count =
                  category === "All Frames"
                    ? GALLERY_PHOTOS.length
                    : GALLERY_PHOTOS.filter((g) => g.category === category)
                        .length;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-300 shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-[#5e6573] hover:text-[#141517]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="gallery-cat-pill"
                        transition={{ duration: 0.45, ease: EXPO_OUT }}
                        className="absolute inset-0 rounded-full bg-[#141517] shadow-sm"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{category}</span>
                      <span
                        className={`text-[10px] ${
                          isActive ? "text-[#dfc082]" : "text-black/35"
                        }`}
                      >
                        ({count})
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Asymmetric Architectural Plates */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EXPO_OUT }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10"
              >
                {filteredPhotos.map((photo, index) => {
                  const total = filteredPhotos.length;
                  let colSpanClass = "md:col-span-6";
                  let heightClass = "aspect-[4/3] md:aspect-auto md:h-[420px]";

                  if (total === 2) {
                    colSpanClass = "md:col-span-6";
                    heightClass = "aspect-[4/3] md:aspect-auto md:h-[440px]";
                  } else if (total === 3) {
                    colSpanClass = "md:col-span-4";
                    heightClass = "aspect-[4/5] md:aspect-auto md:h-[420px]";
                  } else if (total === 4) {
                    const pos = index % 4;
                    colSpanClass =
                      pos === 0 || pos === 3 ? "md:col-span-7" : "md:col-span-5";
                    heightClass = "aspect-[4/3] md:aspect-auto md:h-[430px]";
                  } else if (total === 6) {
                    const pairPattern = [
                      "md:col-span-7",
                      "md:col-span-5",
                      "md:col-span-5",
                      "md:col-span-7",
                      "md:col-span-6",
                      "md:col-span-6",
                    ];
                    colSpanClass = pairPattern[index % 6];
                    heightClass = "aspect-[4/3] md:aspect-auto md:h-[430px]";
                  } else {
                    // 12-item (or multi-row) balanced architectural magazine grid:
                    // Row 1: 7+5 | Row 2: 4+4+4 | Row 3: 5+7 | Row 4: 4+4+4 | Row 5: 6+6
                    const pattern = [
                      { col: "md:col-span-7", h: "aspect-[4/3] md:aspect-auto md:h-[440px]" },
                      { col: "md:col-span-5", h: "aspect-[4/3] md:aspect-auto md:h-[440px]" },
                      { col: "md:col-span-4", h: "aspect-[4/5] md:aspect-auto md:h-[380px]" },
                      { col: "md:col-span-4", h: "aspect-[4/5] md:aspect-auto md:h-[380px]" },
                      { col: "md:col-span-4", h: "aspect-[4/5] md:aspect-auto md:h-[380px]" },
                      { col: "md:col-span-5", h: "aspect-[4/3] md:aspect-auto md:h-[440px]" },
                      { col: "md:col-span-7", h: "aspect-[4/3] md:aspect-auto md:h-[440px]" },
                      { col: "md:col-span-4", h: "aspect-[4/5] md:aspect-auto md:h-[380px]" },
                      { col: "md:col-span-4", h: "aspect-[4/5] md:aspect-auto md:h-[380px]" },
                      { col: "md:col-span-4", h: "aspect-[4/5] md:aspect-auto md:h-[380px]" },
                      { col: "md:col-span-6", h: "aspect-[4/3] md:aspect-auto md:h-[420px]" },
                      { col: "md:col-span-6", h: "aspect-[4/3] md:aspect-auto md:h-[420px]" },
                    ];
                    const slot = pattern[index % pattern.length];
                    colSpanClass = slot.col;
                    heightClass = slot.h;
                  }

                  return (
                    <div
                      key={photo.id}
                      data-gallery-item={index}
                      role="button"
                      tabIndex={0}
                      onClick={() => setLightboxIndex(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setLightboxIndex(index);
                        }
                      }}
                      className={`${colSpanClass} group cursor-pointer space-y-3.5`}
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-[#e7e4db] border border-black/8 shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                        <SlidingImage
                          src={photo.src}
                          alt={photo.title}
                          direction={index % 2 === 0 ? "left" : "right"}
                          className={heightClass}
                          sizes="(max-width: 768px) 100vw, 55vw"
                        />

                        {/* Hover / Touch Magnify Affordance */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500 flex items-end justify-between p-5 pointer-events-none">
                          <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-[0.2em] text-[#dfc082] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {photo.category}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-white/95 text-[#141517] flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between gap-4 px-1 pt-0.5">
                        <div className="min-w-0">
                          <h3 className="font-serif text-xl text-[#141517] font-normal group-hover:text-[#9c8052] transition-colors truncate">
                            {photo.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5e6573] mt-1">
                            <span className="text-[#9c8052] truncate">
                              {photo.project}
                            </span>
                            <span>•</span>
                            <span className="truncate">{photo.location}</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-black/35 shrink-0">
                          ({String(index + 1).padStart(2, "0")})
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Footer & Persistent Dock */}
        <Footer onOpenBookVisit={handleOpenBookVisit} />
        <ConversionDock />

        {/* Architectural Lightbox Modal */}
        <AnimatePresence>
          {activePhoto && lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
                className="absolute inset-0 bg-[#0d0e10]/94 backdrop-blur-xl"
              />

              <motion.div
                data-lenis-prevent
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }
                }
                transition={{ duration: 0.35, ease: EXPO_OUT }}
                className="relative z-10 w-full max-w-6xl flex flex-col gap-5"
              >
                {/* Top Controls */}
                <div className="flex items-center justify-between text-white">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[#c5a059]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        {activePhoto.project} • {activePhoto.location}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light">
                      {activePhoto.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setLightboxIndex(null)}
                    aria-label="Close lightbox"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* High-Res Photo Frame */}
                <div className="relative w-full aspect-[16/10] max-h-[70vh] rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    fill
                    priority
                    sizes="90vw"
                    className="object-contain"
                  />

                  {filteredPhotos.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setLightboxIndex(
                            (lightboxIndex - 1 + filteredPhotos.length) %
                              filteredPhotos.length
                          )
                        }
                        aria-label="Previous frame"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-[#141517] text-white border border-white/15 flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setLightboxIndex(
                            (lightboxIndex + 1) % filteredPhotos.length
                          )
                        }
                        aria-label="Next frame"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-[#141517] text-white border border-white/15 flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Bottom Action Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
                  <span>
                    Frame {String(lightboxIndex + 1).padStart(2, "0")} of{" "}
                    {String(filteredPhotos.length).padStart(2, "0")} •{" "}
                    {activePhoto.category}
                  </span>

                  <button
                    onClick={() => handleOpenProperty(activePhoto.projectId)}
                    className="px-6 py-3 rounded-full bg-[#c5a059] text-[#141517] font-semibold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                  >
                    <span>Inspect Residence Specs</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Property Detail Modal */}
        <ProjectModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onBookVisit={handleOpenBookVisit}
        />
      </main>
    </SmoothScroll>
  );
}
