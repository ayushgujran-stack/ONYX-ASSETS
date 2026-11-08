"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  Waves,
  Castle,
  Landmark,
  Trees,
  Compass,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  MapPin,
  Download,
} from "lucide-react";
import { CURATED_MASTERPIECES, Property } from "@/data/properties";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";

interface ProjectsSliderProps {
  onSelectProperty: (property: Property) => void;
  onOpenBookVisit: () => void;
}

export function ProjectsSlider({
  onSelectProperty,
  onOpenBookVisit,
}: ProjectsSliderProps) {
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);

  // Map 7 real Onyx properties to the CardItem structure
  const cardItems: CardItem[] = CURATED_MASTERPIECES.map((prop, idx) => {
    const icons = [
      <Building key="b" className="w-6 h-6" />,
      <Waves key="w" className="w-6 h-6" />,
      <Castle key="c" className="w-6 h-6" />,
      <Landmark key="l" className="w-6 h-6" />,
      <Trees key="t" className="w-6 h-6" />,
      <Compass key="cp" className="w-6 h-6" />,
      <Sparkles key="s" className="w-6 h-6" />,
    ];

    return {
      id: prop.id,
      title: prop.name,
      description: prop.description,
      imgSrc: prop.image,
      icon: icons[idx % icons.length],
      linkHref: `#`,
    };
  });

  const activeProp = CURATED_MASTERPIECES[activePropertyIndex] || CURATED_MASTERPIECES[0];

  return (
    <section
      id="projects"
      className="py-28 md:py-36 bg-[#f0ede6] border-t border-black/5 relative overflow-hidden"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
            >
              (CURATED MASTERPIECES)
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "60%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#141517] font-light tracking-tight"
              >
                Architectural{" "}
                <span className="italic font-normal text-[#9c8052]">
                  Excellence
                </span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-[#5e6573] hidden sm:block">
              Hover or click any residence to expand
            </p>
            <span className="font-mono text-xs tracking-widest px-3 py-1.5 rounded-full bg-white border border-black/10 text-[#141517]">
              07 Masterworks
            </span>
          </motion.div>
        </div>

        {/* ─── Expanding Cards Showcase ─── */}
        <div className="w-full flex justify-center mb-8">
          <ExpandingCards
            items={cardItems}
            defaultActiveIndex={0}
            className="w-full shadow-2xl rounded-2xl"
            onItemClick={(_, index) => {
              setActivePropertyIndex(index);
            }}
          />
        </div>

        {/* ─── Bottom Context Action Bar for Currently Focused Residence ─── */}
        <motion.div
          layout
          className="bg-white/80 backdrop-blur-md border border-black/10 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9c8052]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{activeProp.location}</span>
              <span className="text-black/30">•</span>
              <span className="text-[#141517] font-semibold">{activeProp.status}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#141517] font-normal">
              {activeProp.name}
            </h3>
            <p className="text-xs text-[#5e6573] font-light leading-relaxed">
              {activeProp.tagline} — {activeProp.units || activeProp.area}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onSelectProperty(activeProp)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-[#141517] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <span>VIEW SPECIFICATIONS</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {activeProp.brochureUrl && (
              <a
                href={activeProp.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full border border-black/15 bg-white text-[#141517] hover:bg-black hover:text-white text-xs font-mono uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PDF</span>
              </a>
            )}

            <button
              onClick={onOpenBookVisit}
              className="px-5 py-3 rounded-full border border-[#9c8052]/40 text-[#9c8052] hover:bg-[#9c8052] hover:text-white text-xs font-mono uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <span>BOOK VISIT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
