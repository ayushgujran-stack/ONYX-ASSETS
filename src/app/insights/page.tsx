"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock, ArrowRight, BookOpen } from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const CDN = "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e";

interface Article {
  id: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  keyTakeaway: string;
}

const ARTICLES: Article[] = [
  {
    id: "coastal-corridor",
    category: "Market Analysis",
    title: "The Udupi-Manipal Coastal Corridor: Why High-Net-Worth Capital Is Moving In",
    readTime: "5 min read",
    date: "November 2026",
    excerpt:
      "With premier healthcare institutions (KMC), global academia (MAHE), and rapid NH-66 four-lane expressway expansion, Udupi has transitioned from a pilgrimage destination into Karnataka's most resilient luxury residential market.",
    image: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg`,
    keyTakeaway:
      "Coastal real estate in prime Udupi pockets has yielded consistent 9-11% annual capital appreciation with near-zero supply dilution due to strict environmental zoning.",
  },
  {
    id: "villa-vs-highrise",
    category: "Architecture & Design",
    title: "Private Villa Enclaves vs Landmark Penthouses: What Families Prioritize Today",
    readTime: "4 min read",
    date: "October 2026",
    excerpt:
      "An analytical comparison of high-density serviced luxury at Opulence versus the unfettered autonomy of private estate ownership in the Onyx Villa Enclave (Villas 2 through 12).",
    image: `${CDN}/Sampoorna%20Big%20Villa%20Elevation.jpeg`,
    keyTakeaway:
      "Modern buyers increasingly demand private lap pools and independent staff suites, while retaining central concierge oversight.",
  },
  {
    id: "coastal-engineering",
    category: "Structural Integrity",
    title: "Engineering for Saline Coastal Climes: The Science of Coastal RCC & Laterite",
    readTime: "6 min read",
    date: "September 2026",
    excerpt:
      "Coastal Karnataka receives over 4,000mm of annual rainfall and heavy sea-breeze salinity. Discover how Onyx calibrates concrete cover depths, anti-carbonation coatings, and seismic raft foundations.",
    image: `${CDN}/1.jpeg`,
    keyTakeaway:
      "True luxury is structural durability: zero water seepage, acoustic insulation, and multi-generational foundation stability.",
  },
  {
    id: "vastu-minimalism",
    category: "Cultural Heritage",
    title: "Vastu Shastra Meets European Minimalism: Harmonizing Energy and Form",
    readTime: "4 min read",
    date: "August 2026",
    excerpt:
      "How Onyx integrates age-old solar orientation, northeast water positioning, and southwest master suites with contemporary floor-to-ceiling glass and Italian marble joinery.",
    image: `${CDN}/2.jpeg`,
    keyTakeaway:
      "Traditional principles do not require ornate traditionalism; fluid modern spaces can honor cultural energy flows with restraint.",
  },
  {
    id: "nri-allocation",
    category: "Advisory & Compliance",
    title: "The Non-Resident Indian (NRI) Guide to Title Clarity & RERA in Karnataka",
    readTime: "7 min read",
    date: "July 2026",
    excerpt:
      "Navigating foreign inward remittances (FIRC), FEMA regulations, capital gains repatriation, and verifying clear single-owner agricultural-to-residential land conversions.",
    image: `${CDN}/Marpalli%201.jpeg`,
    keyTakeaway:
      "Direct developer allocation with clear RERA documentation eliminates intermediary risk and expedites immediate registration.",
  },
];

export default function InsightsPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleOpenBookVisit = () => {
    window.location.href = "/consultation";
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f6f5f0] text-[#141517]">
        <Navbar onOpenBookVisit={handleOpenBookVisit} />

        {/* Hero Banner */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#121316] text-[#f6f5f0] overflow-hidden">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block mb-4">
                  INTELLIGENCE & EDITORIAL
                </span>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[0.96]"
                  >
                    Market Insights <br />
                    <span className="italic font-normal text-[#c5a059]">& Architectural Journal</span>
                  </motion.h1>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-4 space-y-4 lg:pb-3"
              >
                <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  Authoritative commentary on coastal land economics, structural longevity, and bespoke living principles from Onyx Assets senior partners.
                </p>
                <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-white/50 pt-2 border-t border-white/10">
                  <span>Quarterly Editions</span>
                  <span>•</span>
                  <span>Udupi & Coastline</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Top Insight */}
        <section className="py-20 md:py-28 border-b border-black/5">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-black/8">
                  <Image
                    src={ARTICLES[0].image}
                    alt={ARTICLES[0].title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase bg-white/95 text-[#141517] shadow-md">
                      Featured Analysis
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-4 text-xs font-mono text-[#5e6573] uppercase tracking-wider">
                  <span className="text-[#9c8052] font-semibold">{ARTICLES[0].category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {ARTICLES[0].readTime}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#141517] font-normal leading-tight">
                  {ARTICLES[0].title}
                </h2>

                <p className="text-base text-[#2c3038] font-light leading-relaxed">
                  {ARTICLES[0].excerpt}
                </p>

                <div className="p-5 rounded-2xl bg-[#ede8df] border border-black/5 text-xs font-mono text-[#141517] space-y-1">
                  <span className="text-[#9c8052] font-semibold block uppercase tracking-wider">
                    Executive Takeaway:
                  </span>
                  <p className="leading-relaxed font-light">{ARTICLES[0].keyTakeaway}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Remaining Articles List */}
        <section className="py-24 md:py-36 bg-[#f0ede6]">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3">
                ESSAYS & REPORTS
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif font-light text-[#141517] tracking-tight">
                Curated <span className="italic font-normal text-[#9c8052]">Perspectives</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ARTICLES.slice(1).map((art, idx) => (
                <motion.article
                  key={art.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="bg-white rounded-3xl overflow-hidden border border-black/8 shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full bg-black/5">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/90 text-[#141517] shadow-sm">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 sm:p-10 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs font-mono text-[#5e6573]">
                        <span>{art.date}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#141517] font-normal leading-tight">
                        {art.title}
                      </h3>
                      <p className="text-sm text-[#5e6573] font-light leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/8">
                      <p className="text-xs font-mono text-[#9c8052] leading-relaxed">
                        <strong>Takeaway:</strong> {art.keyTakeaway}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Private Advisory Inquiry Band */}
        <section className="py-20 bg-[#141517] text-white">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
                BESPOKE PORTFOLIO ADVICE
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
                Request a Confidential Market Assessment
              </h3>
            </div>
            <Link
              href="/consultation"
              className="px-8 py-4 rounded-full bg-[#c5a059] text-[#141517] font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 font-semibold shadow-lg flex items-center gap-2 shrink-0"
            >
              <span>SCHEDULE WITH SENIOR ADVISOR</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer onOpenBookVisit={handleOpenBookVisit} />
      </main>
    </SmoothScroll>
  );
}
