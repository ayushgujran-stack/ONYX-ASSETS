"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  ShieldCheck,
  MapPin,
  Check,
  ExternalLink,
  Calendar,
  Building2,
} from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConversionDock } from "@/components/ConversionDock";
import { MaskedWords } from "@/components/ui/motion-primitives";
import { Property } from "@/data/properties";

export function ProjectDetailClient({ property }: { property: Property }) {
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"photos" | "floorplan">("photos");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const photos =
    property.gallery.length > 0 ? property.gallery : [property.image];
  const currentPhoto = photos[activePhotoIndex] || property.image;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    property.mapQuery || property.location
  )}&output=embed`;

  const handleBook = () => {
    router.push("/consultation");
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f6f5f0] text-[#141517]">
        <Navbar onOpenBookVisit={handleBook} />

        {/* ─── 1. Warm Editorial Project Hero ─── */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#f6f5f0] border-b border-black/8">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 space-y-10">
            {/* Back Link + Compliance Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/estates"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#9c8052] hover:text-[#141517] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Onyx Residences</span>
              </Link>

              {property.reraId && (
                <a
                  href={property.reraUrl || "https://rera.karnataka.gov.in/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/10 text-[11px] font-mono text-[#141517] hover:border-[#9c8052] transition-colors shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9c8052]" />
                  <span>K-RERA: {property.reraId}</span>
                  <ExternalLink className="w-3 h-3 text-black/40" />
                </a>
              )}
            </div>

            {/* Title & Primary Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#9c8052]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{property.location}</span>
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-serif font-light text-[#141517] tracking-tight leading-[0.96]">
                  <MaskedWords segments={[{ text: property.name }]} />
                </h1>
                <p className="text-base sm:text-lg text-[#5e6573] font-light max-w-2xl leading-relaxed pt-2">
                  {property.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
                <Link
                  href="/consultation"
                  className="px-7 py-4 rounded-full bg-[#141517] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors shadow-md inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Viewing</span>
                </Link>

                {property.brochureUrl && (
                  <a
                    href={property.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 rounded-full border border-black/15 bg-white text-[#141517] hover:border-[#141517] text-xs font-mono uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-[#9c8052]" />
                    <span>Brochure PDF</span>
                  </a>
                )}
              </div>
            </div>

            {/* Standardized 4-Metric Hairline Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-black/10">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                  Configuration
                </div>
                <div className="text-base sm:text-lg font-serif text-[#141517] mt-1 font-medium">
                  {property.units}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                  Super Built-Up Area
                </div>
                <div className="text-base sm:text-lg font-serif text-[#141517] mt-1 font-medium">
                  {property.area}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                  Development Scale
                </div>
                <div className="text-base sm:text-lg font-serif text-[#141517] mt-1 font-medium">
                  {property.totalUnits || property.landParcel || "Exclusive"}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573]">
                  Possession Target
                </div>
                <div className="text-base sm:text-lg font-serif text-[#9c8052] mt-1 font-medium">
                  {property.possession || property.status}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Interactive Elevations & Floor Plan Viewer ─── */}
        <section className="py-16 md:py-24 bg-[#f0ede6] border-b border-black/8">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("photos")}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] transition-all ${
                    viewMode === "photos"
                      ? "bg-[#141517] text-white shadow-sm"
                      : "bg-white/70 text-[#5e6573] hover:text-[#141517]"
                  }`}
                >
                  Architectural Elevations ({photos.length})
                </button>
                {property.floorPlanImage && (
                  <button
                    onClick={() => setViewMode("floorplan")}
                    className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] transition-all ${
                      viewMode === "floorplan"
                        ? "bg-[#141517] text-[#dfc082] shadow-sm"
                        : "bg-white/70 text-[#5e6573] hover:text-[#141517]"
                    }`}
                  >
                    Official Floor Plan
                  </button>
                )}
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-[#5e6573]">
                {viewMode === "floorplan"
                  ? "Typical Floor Plate • Scale Blueprint"
                  : `Elevation Plate 0${activePhotoIndex + 1} / 0${photos.length}`}
              </span>
            </div>

            {viewMode === "floorplan" && property.floorPlanImage ? (
              <div className="relative w-full aspect-[16/11] max-h-[780px] rounded-2xl overflow-hidden bg-white border border-black/10 shadow-lg">
                <Image
                  src={property.floorPlanImage}
                  alt={`${property.name} Typical Floor Plan`}
                  fill
                  sizes="95vw"
                  className="object-contain p-2 sm:p-4"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-[16/9] max-h-[720px] w-full rounded-2xl overflow-hidden bg-black/5 shadow-xl border border-black/5">
                  <Image
                    src={currentPhoto}
                    alt={property.name}
                    fill
                    priority
                    sizes="95vw"
                    className="object-cover"
                  />
                </div>

                {photos.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {photos.map((src, idx) => (
                      <button
                        key={src + idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          activePhotoIndex === idx
                            ? "border-[#9c8052] scale-102"
                            : "border-black/10 opacity-65 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={src}
                          alt="Thumbnail"
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ─── 3. Unit Configurations Schedule (If Available) ─── */}
        {property.unitPlans && property.unitPlans.length > 0 && (
          <section className="py-20 md:py-28 bg-[#f6f5f0] border-b border-black/8">
            <div className="max-w-[1720px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#9c8052] block">
                  (UNIT SCHEDULE)
                </span>
                <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#141517]">
                  Apartment Layouts & Areas
                </h2>
                <p className="text-sm text-[#5e6573] font-light leading-relaxed">
                  Verified Super Built-Up Area (SBA) breakdown per apartment typology from the official architectural sanction plan. Contact our advisory team for floor-wise availability.
                </p>
              </div>

              <div className="lg:col-span-8 divide-y divide-black/10 border-y border-black/10">
                {property.unitPlans.map((plan) => (
                  <div
                    key={plan.unit}
                    className="py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center"
                  >
                    <div className="text-xs font-mono uppercase tracking-widest text-[#9c8052] font-semibold">
                      {plan.unit}
                    </div>
                    <div className="text-base font-serif text-[#141517]">
                      {plan.config}
                    </div>
                    <div className="text-sm font-mono text-[#141517]">
                      {plan.sbaSqFt} SBA
                    </div>
                    <div className="text-xs font-mono text-[#5e6573] sm:text-right">
                      {plan.balconies || "Spacious Balconies"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 4. Material Specifications & Lifestyle Features ─── */}
        <section className="py-20 md:py-28 bg-[#f0ede6] border-b border-black/8">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 space-y-14">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#9c8052] block">
                (SPECIFICATIONS & AMENITIES)
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#141517]">
                Construction Rigor & Craft
              </h2>
            </div>

            {property.specifications && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {property.specifications.map((cat) => (
                  <div
                    key={cat.title}
                    className="p-7 rounded-2xl bg-[#f6f5f0] border border-black/8 space-y-4"
                  >
                    <h3 className="font-serif text-2xl text-[#141517] border-b border-black/10 pb-3">
                      {cat.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs sm:text-sm font-light text-[#2c3038] leading-relaxed"
                        >
                          <Check className="w-3.5 h-3.5 text-[#9c8052] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Project Features Highlights */}
            <div className="pt-4">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-[#9c8052] mb-5">
                Key Lifestyle Amenities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/70 border border-black/8 text-sm font-light text-[#141517]"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#9c8052] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. Neighborhood Proximities & Google Map ─── */}
        <section className="py-20 md:py-28 bg-[#f6f5f0] border-b border-black/8">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#9c8052] block mb-2">
                  (NEIGHBORHOOD PROXIMITIES)
                </span>
                <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#141517]">
                  Connected to Everything in Udupi
                </h2>
              </div>

              {property.proximities ? (
                <div className="divide-y divide-black/10 border-y border-black/10">
                  {property.proximities.map((prox) => (
                    <div
                      key={prox.landmark}
                      className="py-3.5 flex items-center justify-between gap-4"
                    >
                      <span className="text-sm font-light text-[#141517]">
                        {prox.landmark}
                      </span>
                      <span className="text-xs font-mono text-[#9c8052] font-medium shrink-0">
                        {prox.distance}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#5e6573] font-light leading-relaxed">
                  Positioned strategically within Udupi&apos;s prime residential belt with immediate connectivity to healthcare, education, and coastal highways.
                </p>
              )}
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-black/10 shadow-md h-[420px] bg-black/5">
                <iframe
                  title={`${property.name} Location Map`}
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. Institutional Credibility & Approved Banks ─── */}
        {(property.approvedBanks || property.architect) && (
          <section className="py-16 bg-[#141517] text-white">
            <div className="max-w-[1720px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
              {property.architect && (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c5a059]">
                    Architects & Consultants
                  </div>
                  <div className="font-serif text-2xl font-light">
                    {property.architect}
                  </div>
                </div>
              )}

              {property.legalAdvisor && (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c5a059]">
                    Legal Advisor
                  </div>
                  <div className="font-serif text-2xl font-light">
                    {property.legalAdvisor}
                  </div>
                </div>
              )}

              {property.approvedBanks && (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c5a059] flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Approved Banking Partners</span>
                  </div>
                  <div className="text-sm text-white/80 font-light leading-relaxed">
                    {property.approvedBanks.join("  •  ")}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <Footer onOpenBookVisit={handleBook} />
        <ConversionDock activePropertyName={property.name} />
      </main>
    </SmoothScroll>
  );
}
