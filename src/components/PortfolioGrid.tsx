"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, ShieldCheck, Calendar } from "lucide-react";
import {
  ALL_PORTFOLIO,
  ACTIVE_PROPERTIES,
  SATTVA_PROPERTIES,
  VILLA_PROPERTIES,
  ProjectPhase,
  Property,
} from "@/data/properties";
import {
  MaskedWords,
  ScrubbedText,
  SlidingImage,
} from "@/components/ui/motion-primitives";

interface PortfolioGridProps {
  onSelectProperty: (p: Property) => void;
  onOpenBookVisit: () => void;
}

type StatusFilter = "all" | ProjectPhase;
type TypeFilter = "all" | "development" | "villa" | "residence";

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ongoing", label: "Ongoing Projects" },
  { key: "completed", label: "Completed" },
  { key: "pre-launch", label: "Pre-Launch" },
  { key: "future", label: "Future" },
];

const TYPE_FILTERS: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "All Types" },
  { key: "development", label: "Luxury Flats" },
  { key: "residence", label: "Signature Flats" },
  { key: "villa", label: "Villas 2–12" },
];

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function PortfolioGrid({
  onSelectProperty,
  onOpenBookVisit,
}: PortfolioGridProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const prefersReducedMotion = useReducedMotion();

  // Read optional status deep-link (?status=ongoing|completed|pre-launch|future)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramStatus = params.get("status") as StatusFilter | null;
    if (
      paramStatus &&
      (paramStatus === "ongoing" ||
        paramStatus === "completed" ||
        paramStatus === "pre-launch" ||
        paramStatus === "future")
    ) {
      requestAnimationFrame(() => setStatusFilter(paramStatus));
    }
  }, []);

  // Filtered subsets for organized Editorial Chapters
  const activeTowers = useMemo(
    () =>
      ACTIVE_PROPERTIES.filter((p) => {
        const matchStatus =
          statusFilter === "all" || p.projectPhase === statusFilter;
        const matchType = typeFilter === "all" || p.category === typeFilter;
        return matchStatus && matchType;
      }),
    [statusFilter, typeFilter]
  );

  const filteredVillas = useMemo(
    () =>
      VILLA_PROPERTIES.filter((p) => {
        const matchStatus =
          statusFilter === "all" || p.projectPhase === statusFilter;
        const matchType = typeFilter === "all" || p.category === typeFilter;
        return matchStatus && matchType;
      }),
    [statusFilter, typeFilter]
  );

  const filteredSattva = useMemo(
    () =>
      SATTVA_PROPERTIES.filter((p) => {
        const matchStatus =
          statusFilter === "all" || p.projectPhase === statusFilter;
        const matchType = typeFilter === "all" || p.category === typeFilter;
        return matchStatus && matchType;
      }),
    [statusFilter, typeFilter]
  );

  const totalMatches =
    activeTowers.length + filteredVillas.length + filteredSattva.length;

  // Determine sequential chapter counter & alternating background rhythm
  const chapters = useMemo(() => {
    const list: (
      | { kind: "single"; property: Property }
      | { kind: "villas"; items: Property[] }
      | { kind: "sattva"; items: Property[] }
    )[] = [];

    activeTowers.forEach((prop) => {
      list.push({ kind: "single", property: prop });
    });

    if (filteredSattva.length > 0) {
      list.push({ kind: "sattva", items: filteredSattva });
    }

    if (filteredVillas.length > 0) {
      list.push({ kind: "villas", items: filteredVillas });
    }

    return list;
  }, [activeTowers, filteredVillas, filteredSattva]);

  const scrollToRail = () => {
    const el = document.getElementById("portfolio");
    if (!el) return;
    if (el.getBoundingClientRect().top < 80) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -72, duration: 0.7 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div id="portfolio" className="relative bg-[#f6f5f0]">
      {/* ─── Sticky Architectural Status & Typology Rail ─── */}
      <div className="sticky top-[68px] md:top-[72px] z-30 bg-[#f6f5f0]/95 backdrop-blur-xl border-y border-black/10 transition-colors">
        <div className="max-w-[1720px] mx-auto px-6 md:px-12 py-3.5 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          {/* Primary Client Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 xl:pb-0">
            {STATUS_FILTERS.map((f) => {
              const isActive = statusFilter === f.key;
              const count =
                f.key === "all"
                  ? ALL_PORTFOLIO.length
                  : ALL_PORTFOLIO.filter((p) => p.projectPhase === f.key)
                      .length;

              return (
                <button
                  key={f.key}
                  onClick={() => {
                    setStatusFilter(f.key);
                    scrollToRail();
                  }}
                  className={`relative px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-[0.16em] whitespace-nowrap transition-colors duration-300 shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-[#5e6573] hover:text-[#141517]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="estates-sticky-pill"
                      transition={{ duration: 0.4, ease: EXPO_OUT }}
                      className="absolute inset-0 rounded-full bg-[#141517] shadow-sm"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{f.label}</span>
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

          {/* Compact Typology Selector */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            {TYPE_FILTERS.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTypeFilter(t.key);
                  scrollToRail();
                }}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.16em] whitespace-nowrap border transition-all duration-300 shrink-0 ${
                  typeFilter === t.key
                    ? "bg-[#9c8052] text-white border-[#9c8052]"
                    : "bg-transparent text-[#5e6573] border-black/12 hover:border-[#141517] hover:text-[#141517]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Editorial Chapter Content ─── */}
      {totalMatches === 0 ? (
        <HorizonBriefingChapter
          statusFilter={statusFilter}
          onBookVisit={onOpenBookVisit}
          onReset={() => {
            setStatusFilter("all");
            setTypeFilter("all");
          }}
        />
      ) : (
        <div className="divide-y divide-black/6">
          {chapters.map((chapter, idx) => {
            const isAltBg = idx % 2 === 1;
            const reversed = idx % 2 === 1;
            const chapterNumber = String(idx + 1).padStart(2, "0");

            if (chapter.kind === "single") {
              return (
                <EditorialPropertySpread
                  key={chapter.property.id}
                  property={chapter.property}
                  chapterNumber={chapterNumber}
                  reversed={reversed}
                  altBackground={isAltBg}
                  onSelect={onSelectProperty}
                  onBook={onOpenBookVisit}
                />
              );
            }

            if (chapter.kind === "villas") {
              return (
                <EnclaveSeriesSpread
                  key={`villas-${statusFilter}`}
                  title="Onyx Villa Enclave"
                  location="Coastal Green Belt, Udupi"
                  items={chapter.items}
                  chapterNumber={chapterNumber}
                  reversed={reversed}
                  altBackground={isAltBg}
                  prefersReducedMotion={Boolean(prefersReducedMotion)}
                  onSelect={onSelectProperty}
                  onBook={onOpenBookVisit}
                  labelForItem={(item) => item.name.replace("Onyx ", "")}
                />
              );
            }

            return (
              <EnclaveSeriesSpread
                key={`sattva-${statusFilter}`}
                title="A.R. Sattva"
                location="Udupi Urban Prime, Karnataka"
                items={chapter.items}
                chapterNumber={chapterNumber}
                reversed={reversed}
                altBackground={isAltBg}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
                onSelect={onSelectProperty}
                onBook={onOpenBookVisit}
                labelForItem={(_, i) =>
                  i === 0 ? "Main Residence" : i === 1 ? "Courtyard Wing" : "Teak Atrium"
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Single Property Editorial Spread (FindRealEstate Layout) ───────
function EditorialPropertySpread({
  property,
  chapterNumber,
  reversed,
  altBackground,
  onSelect,
  onBook,
}: {
  property: Property;
  chapterNumber: string;
  reversed: boolean;
  altBackground: boolean;
  onSelect: (p: Property) => void;
  onBook: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={`py-24 md:py-36 relative overflow-clip ${
        altBackground ? "bg-[#f0ede6]" : "bg-[#f6f5f0]"
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Architectural Photograph Spread (7 Cols) */}
          <div
            onClick={() => onSelect(property)}
            className={`lg:col-span-7 cursor-pointer group relative ${
              reversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <SlidingImage
              src={property.image}
              alt={property.name}
              direction={reversed ? "right" : "left"}
              className="aspect-[16/10] rounded-2xl shadow-xl"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>

          {/* Editorial Copy & Spec Matrix (5 Cols) */}
          <div
            className={`lg:col-span-5 space-y-7 ${
              reversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            {/* Single-line Location + Subtle Chapter Index */}
            <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9c8052]">
                {property.location}
              </span>
              <span className="font-serif text-5xl sm:text-6xl font-light text-black/15 leading-none select-none">
                {chapterNumber}
              </span>
            </div>

            {/* Masked Editorial Serif Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141517] font-light leading-[1.02] tracking-tight">
              <MaskedWords segments={[{ text: property.name }]} />
            </h2>

            {/* Scroll-Scrubbed Architectural Statement */}
            <ScrubbedText
              segments={[{ text: property.description }]}
              className="text-sm sm:text-base text-[#5e6573] font-light leading-relaxed"
            />

            {/* Clean 3-Metric Hairline Strip */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-black/10">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#5e6573]">
                  Typology
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#141517] mt-1">
                  {property.units || "Signature Home"}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#5e6573]">
                  Area
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#141517] mt-1">
                  {property.area || "Bespoke"}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#5e6573]">
                  Status
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#9c8052] mt-1">
                  {property.status}
                </div>
              </div>
            </div>

            {/* Editorial Action Row */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <button
                onClick={() => onSelect(property)}
                className="group px-7 py-3.5 rounded-full bg-[#141517] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors shadow-md flex items-center gap-2"
              >
                <span>Inspect Residence</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <Link
                href={`/estates/${property.id}`}
                className="px-6 py-3.5 rounded-full border border-black/15 bg-white text-[#141517] hover:border-[#9c8052] hover:text-[#9c8052] text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                <span>Full Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {property.projectPhase === "ongoing" && (
                <button
                  onClick={onBook}
                  className="px-6 py-3.5 rounded-full border border-black/15 bg-transparent text-[#141517] hover:border-[#141517] text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#9c8052]" />
                  <span>Book Viewing</span>
                </button>
              )}

              {property.brochureUrl && (
                <a
                  href={property.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#5e6573] hover:text-[#9c8052] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Brochure PDF</span>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Interactive Enclave Series Chapter (Villas 2–12 & A.R. Sattva) ─
function EnclaveSeriesSpread({
  title,
  location,
  items,
  chapterNumber,
  reversed,
  altBackground,
  prefersReducedMotion,
  onSelect,
  onBook,
  labelForItem,
}: {
  title: string;
  location: string;
  items: Property[];
  chapterNumber: string;
  reversed: boolean;
  altBackground: boolean;
  prefersReducedMotion: boolean;
  onSelect: (p: Property) => void;
  onBook: () => void;
  labelForItem: (item: Property, index: number) => string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const foundIndex = items.findIndex((it) => it.id === selectedId);
  const safeIndex = foundIndex >= 0 ? foundIndex : 0;
  const activeItem = items[safeIndex];

  if (!activeItem) return null;

  return (
    <section
      className={`py-24 md:py-36 relative overflow-clip ${
        altBackground ? "bg-[#f0ede6]" : "bg-[#f6f5f0]"
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Interactive Image Frame (7 Cols) */}
          <div
            className={`lg:col-span-7 space-y-4 ${
              reversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div
              onClick={() => onSelect(activeItem)}
              className="cursor-pointer group relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={prefersReducedMotion ? false : { opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0.25 }}
                  transition={{ duration: 0.45, ease: EXPO_OUT }}
                >
                  <SlidingImage
                    src={activeItem.image}
                    alt={activeItem.name}
                    direction={reversed ? "right" : "left"}
                    className="aspect-[16/10] rounded-2xl shadow-xl"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Clean Pill Switcher Strip */}
            <div className="flex flex-wrap gap-2 pt-1">
              {items.map((item, i) => {
                const active = safeIndex === i;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`px-3.5 py-2 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-all duration-300 ${
                      active
                        ? "bg-[#141517] text-[#dfc082] border-[#141517] shadow-sm"
                        : "bg-white/70 text-[#5e6573] border-black/10 hover:border-[#9c8052] hover:text-[#141517]"
                    }`}
                  >
                    {labelForItem(item, i)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Concise Editorial Copy (5 Cols) */}
          <div
            className={`lg:col-span-5 space-y-7 ${
              reversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9c8052]">
                {location}
              </span>
              <span className="font-serif text-5xl sm:text-6xl font-light text-black/15 leading-none select-none">
                {chapterNumber}
              </span>
            </div>

            <div>
              <h2 className="text-4xl sm:text-5xl font-serif text-[#141517] font-light leading-[1.04] tracking-tight">
                <MaskedWords segments={[{ text: title }]} />
              </h2>
              <div className="text-xl sm:text-2xl font-serif italic text-[#9c8052] mt-2">
                {activeItem.name}
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#5e6573] font-light leading-relaxed">
              {activeItem.description}
            </p>

            {/* Clean 3-Metric Hairline Strip */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-black/10">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#5e6573]">
                  Typology
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#141517] mt-1">
                  {activeItem.units}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#5e6573]">
                  Area
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#141517] mt-1">
                  {activeItem.area}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#5e6573]">
                  Status
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#9c8052] mt-1">
                  {activeItem.status}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onSelect(activeItem)}
                className="group px-7 py-3.5 rounded-full bg-[#141517] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors shadow-md flex items-center gap-2"
              >
                <span>Inspect {labelForItem(activeItem, safeIndex)}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <Link
                href={`/estates/${activeItem.id}`}
                className="px-6 py-3.5 rounded-full border border-black/15 bg-white text-[#141517] hover:border-[#9c8052] hover:text-[#9c8052] text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                <span>Full Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {activeItem.projectPhase === "ongoing" && (
                <button
                  onClick={onBook}
                  className="px-6 py-3.5 rounded-full border border-black/15 text-[#141517] hover:border-[#141517] text-xs font-mono uppercase tracking-widest transition-colors"
                >
                  Enquire Allocation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Split-Screen Editorial Horizon Briefings (Pre-Launch & Future) ──
function HorizonBriefingChapter({
  statusFilter,
  onBookVisit,
  onReset,
}: {
  statusFilter: StatusFilter;
  onBookVisit: () => void;
  onReset: () => void;
}) {
  const isPreLaunch = statusFilter === "pre-launch";
  const isFuture = statusFilter === "future";

  const CDN = "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e";
  const moodSrc = isPreLaunch
    ? `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg`
    : `${CDN}/RSN%20PLOT14%201.jpeg`;

  return (
    <section className="py-24 md:py-36 bg-[#f6f5f0] relative overflow-clip">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Muted Architectural Mood Study (6 Cols) */}
          <div className="lg:col-span-6 relative">
            <SlidingImage
              src={moodSrc}
              alt="Upcoming Onyx Coastal Horizons"
              direction="left"
              className="aspect-[16/10] rounded-2xl shadow-lg"
              imageClassName="grayscale-[22%] contrast-[0.95]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Editorial Narrative & Priority Desk CTA (6 Cols) */}
          <div className="lg:col-span-6 space-y-7">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#9c8052]">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isPreLaunch
                  ? "(UPCOMING PRE-LAUNCH RELEASES)"
                  : isFuture
                    ? "(MASTER-PLAN HORIZON)"
                    : "(PORTFOLIO FILTER)"}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141517] font-light leading-[1.03] tracking-tight">
              <MaskedWords
                segments={[
                  {
                    text: isPreLaunch
                      ? "Coastal Pre-Launch "
                      : isFuture
                        ? "Future Sanctuary "
                        : "Refined ",
                  },
                  {
                    text: isPreLaunch
                      ? "Briefings"
                      : isFuture
                        ? "Enclaves"
                        : "Selection",
                    className: "italic font-normal text-[#9c8052]",
                  },
                ]}
              />
            </h2>

            <p className="text-sm sm:text-base text-[#5e6573] font-light leading-relaxed max-w-xl">
              {isPreLaunch
                ? "Upcoming coastal developments are currently in statutory sanctioning and architectural finalization. Request confidential priority briefings directly with Onyx Assets' partners prior to public release."
                : isFuture
                  ? "Long-horizon coastal estates across prime Udupi and Manipal belts are undergoing master-plan conceptualization. Join our off-market dossier list to stay informed as land parcels open."
                  : "No active estates match that exact typology and phase filter together."}
            </p>

            {/* Hairline Horizon Expectations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-5 border-y border-black/10">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                  Corridor
                </div>
                <div className="text-sm font-medium text-[#141517] mt-1">
                  Udupi & Manipal
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                  Allocation Access
                </div>
                <div className="text-sm font-medium text-[#9c8052] mt-1">
                  Priority Desk Only
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                  Tariff Guidance
                </div>
                <div className="text-sm font-medium text-[#141517] mt-1">
                  Released Upon Launch
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {isPreLaunch || isFuture ? (
                <Link
                  href="/consultation"
                  className="group px-8 py-4 rounded-full bg-[#141517] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors shadow-lg inline-flex items-center gap-2"
                >
                  <span>Register Priority Interest</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : (
                <button
                  onClick={onBookVisit}
                  className="px-8 py-4 rounded-full bg-[#141517] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors"
                >
                  Schedule Advisory
                </button>
              )}

              <button
                onClick={onReset}
                className="px-6 py-4 rounded-full border border-black/15 text-[#141517] hover:border-[#141517] text-xs font-mono uppercase tracking-widest transition-colors"
              >
                Explore All 16 Estates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
