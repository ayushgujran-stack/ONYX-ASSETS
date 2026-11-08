"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight, X } from "lucide-react";
import { ALL_PORTFOLIO, Property } from "@/data/properties";

interface PortfolioGridProps {
  onSelectProperty: (p: Property) => void;
  onOpenBookVisit: () => void;
}

type Filter = "all" | "development" | "villa" | "residence";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All Properties" },
  { key: "development", label: "Apartments" },
  { key: "villa", label: "Villas 2–12" },
  { key: "residence", label: "Residences" },
];

const STATUS_COLOR: Record<Property["status"], string> = {
  "Newly Launched": "bg-[#9c8052] text-white",
  Ongoing: "bg-[#141517] text-white",
  Sold: "bg-black/20 text-[#141517]",
  "Signature Collection": "bg-[#9c8052]/20 text-[#9c8052]",
  Exclusive: "bg-[#141517] text-white",
  Completed: "bg-black/15 text-[#5e6573]",
};

export function PortfolioGrid({ onSelectProperty, onOpenBookVisit }: PortfolioGridProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? ALL_PORTFOLIO
    : ALL_PORTFOLIO.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-28 md:py-40 bg-[#f6f5f0] border-t border-black/5 relative">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
            >
              (FULL PORTFOLIO)
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "60%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#141517] font-light tracking-tight"
              >
                Every{" "}
                <span className="italic font-normal text-[#9c8052]">Estate</span>
              </motion.h2>
            </div>
          </div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
                  filter === f.key
                    ? "bg-[#141517] text-white border-[#141517]"
                    : "bg-white text-[#5e6573] border-black/15 hover:border-[#141517] hover:text-[#141517]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Count */}
        <motion.div
          layout
          className="text-xs font-mono text-[#5e6573] uppercase tracking-widest mb-10"
        >
          Showing {filtered.length} of {ALL_PORTFOLIO.length} properties
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((property, i) => (
              <PortfolioCard
                key={property.id}
                property={property}
                index={i}
                onSelect={onSelectProperty}
                onBook={onOpenBookVisit}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-sm font-mono uppercase tracking-widest text-[#5e6573]">
              Interested in a private consultation?
            </p>
            <p className="text-xs text-[#9c8052] font-mono mt-1">
              Our advisors curate bespoke investment pathways for discerning clients.
            </p>
          </div>
          <motion.button
            onClick={onOpenBookVisit}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="px-8 py-4 rounded-full bg-[#141517] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors duration-300 shadow-md flex items-center gap-2 shrink-0"
          >
            <span>BOOK A PRIVATE CONSULTATION</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Individual Card with spring physics hover ─────────────────────
function PortfolioCard({
  property,
  index,
  onSelect,
  onBook,
}: {
  property: Property;
  index: number;
  onSelect: (p: Property) => void;
  onBook: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{
        duration: 0.5,
        delay: (index % 8) * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(property)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:shadow-xl transition-shadow duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={property.image}
            alt={property.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover"
          />
        </motion.div>

        {/* Gradient on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
        />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest ${STATUS_COLOR[property.status]}`}
          >
            {property.status}
          </span>
        </div>

        {/* Hover CTA */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-3 right-3"
        >
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md">
            <ArrowUpRight className="w-4 h-4 text-[#141517]" />
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <div className="flex items-start gap-1 text-[10px] font-mono uppercase tracking-widest text-[#9c8052]">
          <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div>
          <h3 className="font-serif text-lg text-[#141517] font-normal leading-tight group-hover:text-[#9c8052] transition-colors duration-300">
            {property.name}
          </h3>
          <p className="text-[11px] font-mono uppercase tracking-wider text-[#5e6573] mt-1 line-clamp-1">
            {property.tagline}
          </p>
        </div>

        {property.units && (
          <p className="text-xs text-[#2c3038] font-light">{property.units}</p>
        )}

        {property.area && (
          <p className="text-[10px] font-mono text-[#5e6573] uppercase tracking-wider">
            {property.area}
          </p>
        )}

        {/* Bottom action */}
        <div className="pt-2 border-t border-black/5 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#5e6573] uppercase tracking-wider">
            {property.price ?? ""}
          </span>
          {(property.status === "Ongoing" || property.status === "Newly Launched") && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBook();
              }}
              className="text-[10px] font-mono uppercase tracking-widest text-[#9c8052] hover:text-[#141517] transition-colors"
            >
              ENQUIRE →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
