"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CURATED_MASTERPIECES, Property } from "@/data/properties";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import { MaskedWords } from "@/components/ui/motion-primitives";

interface ProjectsSliderProps {
  onSelectProperty: (property: Property) => void;
  onOpenBookVisit?: () => void;
}

export function ProjectsSlider({ onSelectProperty }: ProjectsSliderProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "0px 0px -40px 0px",
  });

  const cardItems: CardItem[] = CURATED_MASTERPIECES.map((prop) => ({
    id: prop.id,
    title: prop.name,
    subtitle: `${prop.location} • ${prop.status}`,
    description: prop.description,
    imgSrc: prop.image,
    linkHref: "#",
  }));

  return (
    <section
      id="projects"
      className="py-28 md:py-36 bg-[#f0ede6] border-t border-black/5 relative overflow-clip"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
        {/* Clean Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/estates"
              className="group inline-flex items-center gap-2 pb-1.5 border-b border-black/25 text-xs font-mono uppercase tracking-[0.2em] text-[#141517] hover:text-[#9c8052] hover:border-[#9c8052] transition-colors"
            >
              <span>View All 16 Estates</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Box-Free Expanding Cards Gallery with Directional Reveal */}
        <div ref={galleryRef} className="w-full">
          <motion.div
            initial={prefersReducedMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
            animate={
              prefersReducedMotion || isGalleryInView
                ? { clipPath: "inset(0 0% 0 0)" }
                : { clipPath: "inset(0 100% 0 0)" }
            }
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <ExpandingCards
              items={cardItems}
              defaultActiveIndex={0}
              className="w-full"
              onInspectActive={(_, index) => {
                const target = CURATED_MASTERPIECES[index];
                if (target) onSelectProperty(target);
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
