"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Download, Calendar, MapPin, ArrowUpRight, Layers } from "lucide-react";
import { Property } from "@/data/properties";

interface ProjectModalProps {
  property: Property | null;
  onClose: () => void;
  onBookVisit: (projectName: string) => void;
}

export function ProjectModal({
  property,
  onClose,
  onBookVisit,
}: ProjectModalProps) {
  const [selection, setSelection] = useState<{
    propertyId: string | null;
    activeImg: number;
    showFloorPlan: boolean;
  }>({ propertyId: null, activeImg: 0, showFloorPlan: false });

  if (!property) return null;

  const activeImg = selection.propertyId === property.id ? selection.activeImg : 0;
  const showFloorPlan = selection.propertyId === property.id ? selection.showFloorPlan : false;

  const currentVisual =
    showFloorPlan && property.floorPlanImage
      ? property.floorPlanImage
      : property.gallery[activeImg] || property.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#f6f5f0] text-[#141517] border border-black/10 shadow-2xl p-6 sm:p-10 flex flex-col gap-8 z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-black/70 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Title & Location */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9c8052] tracking-widest uppercase mb-2">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#141517] font-light">
              {property.name}
            </h2>
            <p className="text-sm font-mono tracking-widest text-[#5e6573] uppercase mt-1">
              {property.tagline}
            </p>
          </div>

          {/* Image Showcase */}
          <div className="space-y-4">
            <div
              className={`relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-black/10 ${
                showFloorPlan && property.floorPlanImage
                  ? "bg-white"
                  : "bg-black/10"
              }`}
              style={{ position: "relative" }}
            >
              <Image
                src={currentVisual}
                alt={
                  showFloorPlan && property.floorPlanImage
                    ? `${property.name} Typical Floor Plan`
                    : property.name
                }
                fill
                sizes="(max-width: 1200px) 100vw, 80vw"
                className={
                  showFloorPlan && property.floorPlanImage
                    ? "object-contain p-3"
                    : "object-cover"
                }
              />
            </div>

            {/* Thumbnail & Floor Plan selector */}
            {(property.gallery.length > 1 || property.floorPlanImage) && (
              <div className="flex items-center justify-between gap-3 flex-wrap pb-1">
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {property.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelection({
                          propertyId: property.id,
                          activeImg: i,
                          showFloorPlan: false,
                        });
                      }}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        !showFloorPlan && activeImg === i
                          ? "border-[#9c8052] scale-105"
                          : "border-black/10 opacity-60 hover:opacity-100"
                      }`}
                      style={{ position: "relative" }}
                    >
                      <Image
                        src={img}
                        alt="Thumbnail"
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {property.floorPlanImage && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelection((prev) => ({
                        propertyId: property.id,
                        activeImg: prev.propertyId === property.id ? prev.activeImg : 0,
                        showFloorPlan: !(prev.propertyId === property.id && prev.showFloorPlan),
                      }))
                    }
                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-all ${
                      showFloorPlan
                        ? "bg-[#141517] text-white border-[#141517]"
                        : "bg-white text-[#141517] border-black/15 hover:border-[#9c8052] hover:text-[#9c8052]"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{showFloorPlan ? "Viewing Floor Plan" : "View Floor Plan"}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Details & Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-black/10">
            {/* Description */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#9c8052]">
                Architectural Statement
              </h4>
              <p className="text-sm sm:text-base text-[#2c3038] font-light leading-relaxed">
                {property.description}
              </p>

              <h4 className="text-xs font-mono uppercase tracking-widest text-[#9c8052] pt-4">
                Curated Amenities & Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm font-light text-[#2c3038]"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#9c8052]/20 flex items-center justify-center text-[#9c8052] shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Specs & Actions Card */}
            <div className="rounded-2xl p-6 bg-white border border-black/10 shadow-sm flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b border-black/5 pb-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#5e6573]">
                      Dimensions
                    </div>
                    <div className="text-sm font-serif text-[#141517] mt-1 font-medium">
                      {property.area}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#5e6573]">
                      Land / Units
                    </div>
                    <div className="text-sm font-serif text-[#141517] mt-1 font-medium">
                      {property.landParcel || "Enclave"}
                    </div>
                  </div>
                </div>

                <div className="border-b border-black/5 pb-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#5e6573]">
                    Configuration
                  </div>
                  <div className="text-base font-serif text-[#141517] mt-1 font-medium">
                    {property.units}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-black/5 pb-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#5e6573]">
                      Handover
                    </div>
                    <div className="text-xs font-mono text-[#9c8052] uppercase font-semibold mt-1">
                      {property.possession || property.status}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#5e6573]">
                      Indicative
                    </div>
                    <div className="text-xs font-mono text-[#141517] font-semibold mt-1">
                      {property.price || "On Request"}
                    </div>
                  </div>
                </div>

                {property.reraId && (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#5e6573]">
                      Regulatory Compliance
                    </div>
                    <div className="text-[11px] font-mono text-[#2c3038] mt-1">
                      {property.reraId}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    onBookVisit(property.name);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#141517] text-white font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[#9c8052] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Site Visit</span>
                </button>

                <Link
                  href={`/estates/${property.id}`}
                  onClick={onClose}
                  className="w-full py-3 rounded-full border border-black/15 bg-white text-[#141517] hover:border-[#9c8052] hover:text-[#9c8052] text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <span>Full Project Page &amp; Proximities</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/919113925641?text=${encodeURIComponent(
                    `Hello Onyx Assets Advisory, I would like specifications and availability for ${property.name} (${property.location}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full border border-[#9c8052]/40 bg-[#9c8052]/10 text-[#141517] hover:bg-[#9c8052] hover:text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <span>WhatsApp Concierge</span>
                </a>

                {property.brochureUrl && (
                  <a
                    href={property.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full border border-black/15 bg-white text-[#141517] hover:bg-black hover:text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Brochure (PDF)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
