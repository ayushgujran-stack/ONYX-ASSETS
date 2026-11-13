"use client";

import React, { useRef, useState, useMemo } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  ALL_PORTFOLIO,
  CURATED_MASTERPIECES,
  ProjectPhase,
  Property,
} from "@/data/properties";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import { MaskedWords, SlidingImage } from "@/components/ui/motion-primitives";

interface ProjectsSliderProps {
  onSelectProperty: (property: Property) => void;
  onOpenBookVisit?: () => void;
}

type StatusTab = "all" | ProjectPhase;

const STATUS_TABS: { key: StatusTab; label: string }[] = [
  { key: "all", label: "All Masterpieces" },
  { key: "ongoing", label: "Ongoing Projects" },
  { key: "completed", label: "Completed Projects" },
  { key: "pre-launch", label: "Pre-Launch" },
  { key: "future", label: "Future Projects" },
];

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function ProjectsSlider({ onSelectProperty }: ProjectsSliderProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<StatusTab>("all");

  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "0px 0px -40px 0px",
  });

  // Select curated residences matching the active status tab, always prioritizing flats over villas
  const displayedProperties: Property[] = useMemo(() => {
    if (activeTab === "all") {
      // Feature all 5 flat showcases first, plus 1 villa enclave highlight at the end
      const flats = CURATED_MASTERPIECES.filter((p) => p.category !== "villa");
      const villaHighlight = CURATED_MASTERPIECES.filter((p) => p.category === "villa").slice(0, 1);
      return [...flats, ...villaHighlight];
    }
    const matching = ALL_PORTFOLIO.filter((p) => p.projectPhase === activeTab);
    const flats = matching.filter((p) => p.category !== "villa");
    const villas = matching.filter((p) => p.category === "villa").slice(0, 1);
    const ordered = [...flats, ...villas];
    const seen = new Set<string>();
    return ordered
      .filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      })
      .slice(0, 6);
  }, [activeTab]);

  const cardItems: CardItem[] = useMemo(
    () =>
      displayedProperties.map((prop) => ({
        id: prop.id,
        title: prop.name,
        subtitle: `${prop.location} • ${prop.status}`,
        description: prop.description,
        imgSrc: prop.image,
        linkHref: `/estates/${prop.id}`,
        specs: {
          units: prop.units,
          area: prop.area,
          possession: prop.possession,
          price: prop.price,
        },
      })),
    [displayedProperties]
  );

  return (
    <section
      id="projects"
      className="py-28 md:py-36 bg-[#f0ede6] border-t border-black/5 relative overflow-clip"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
        {/* Clean Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
            >
              (CURATED MASTERPIECES)
            </motion.span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#141517] font-light tracking-tight">
              <MaskedWords
                segments={[
                  { text: "Architectural " },
                  {
                    text: "Excellence",
                    className: "italic font-normal text-[#9c8052]",
                  },
                ]}
              />
            </h2>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EXPO_OUT }}
            className="flex items-center gap-7"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 pb-1.5 border-b border-black/25 text-xs font-mono uppercase tracking-[0.2em] text-[#5e6573] hover:text-[#9c8052] hover:border-[#9c8052] transition-colors"
            >
              <span>Photo Gallery</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/estates"
              className="group inline-flex items-center gap-2 pb-1.5 border-b border-black/25 text-xs font-mono uppercase tracking-[0.2em] text-[#141517] hover:text-[#9c8052] hover:border-[#9c8052] transition-colors"
            >
              <span>All {ALL_PORTFOLIO.length} Estates</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Client Requested Project Status Tabs */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EXPO_OUT }}
          className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-8 border-b border-black/8"
        >
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const count =
              tab.key === "all"
                ? CURATED_MASTERPIECES.length
                : ALL_PORTFOLIO.filter((p) => p.projectPhase === tab.key)
                    .length;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-300 shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-[#5e6573] hover:text-[#141517]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="landing-status-pill"
                    transition={{ duration: 0.45, ease: EXPO_OUT }}
                    className="absolute inset-0 rounded-full bg-[#141517] shadow-sm"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span>{tab.label}</span>
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
        </motion.div>

        {/* Box-Free Expanding Cards Gallery with Directional Reveal & Status Cross-Fade */}
        <div ref={galleryRef} className="w-full">
          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : { clipPath: "inset(0 100% 0 0)" }
            }
            animate={
              prefersReducedMotion || isGalleryInView
                ? { clipPath: "inset(0 0% 0 0)" }
                : { clipPath: "inset(0 100% 0 0)" }
            }
            transition={{ duration: 1.25, ease: EXPO_OUT }}
            className="w-full flex justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EXPO_OUT }}
                className="w-full"
              >
                {displayedProperties.length > 0 ? (
                  <ExpandingCards
                    items={cardItems}
                    defaultActiveIndex={0}
                    className="w-full"
                    onInspectActive={(_, index) => {
                      const target = displayedProperties[index];
                      if (target) onSelectProperty(target);
                    }}
                  />
                ) : (
                  <div className="w-full py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-6">
                      <SlidingImage
                        src={
                          activeTab === "pre-launch"
                            ? "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg"
                            : "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/RSN%20PLOT14%201.jpeg"
                        }
                        alt="Upcoming Onyx Architectural Vision"
                        direction="left"
                        className="aspect-[16/10] rounded-2xl shadow-lg"
                        imageClassName="grayscale-[22%] contrast-[0.95]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    <div className="lg:col-span-6 space-y-6">
                      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#9c8052] block">
                        ({activeTab === "pre-launch" ? "UPCOMING PRE-LAUNCH" : "FUTURE HORIZON"})
                      </span>
                      <h3 className="font-serif text-4xl sm:text-5xl text-[#141517] font-light leading-[1.04]">
                        {activeTab === "pre-launch" ? (
                          <>
                            Coastal Pre-Launch{" "}
                            <span className="italic font-normal text-[#9c8052]">
                              Briefings
                            </span>
                          </>
                        ) : (
                          <>
                            Future Sanctuary{" "}
                            <span className="italic font-normal text-[#9c8052]">
                              Enclaves
                            </span>
                          </>
                        )}
                      </h3>
                      <p className="text-sm sm:text-base text-[#5e6573] font-light leading-relaxed max-w-xl">
                        {activeTab === "pre-launch"
                          ? "Upcoming coastal developments are currently in statutory sanctioning and architectural finalization. Request confidential priority briefings prior to public release."
                          : "Long-horizon coastal estates across prime Udupi and Manipal belts are undergoing master-plan conceptualization. Join our off-market dossier list for early updates."}
                      </p>

                      <div className="grid grid-cols-3 gap-4 py-4 border-y border-black/10 max-w-lg">
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                            Corridor
                          </div>
                          <div className="text-xs font-medium text-[#141517] mt-1">
                            Udupi & Manipal
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                            Access
                          </div>
                          <div className="text-xs font-medium text-[#9c8052] mt-1">
                            Priority Desk
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                            Rates
                          </div>
                          <div className="text-xs font-medium text-[#141517] mt-1">
                            Upon Launch
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/consultation"
                        className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#141517] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors shadow-md"
                      >
                        <span>Register Priority Interest</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
