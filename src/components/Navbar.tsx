"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBookVisit?: () => void;
}

export function Navbar({ onOpenBookVisit }: NavbarProps) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isDarkBackdrop, setIsDarkBackdrop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Subpages (/estates, /heritage, /insights, /consultation) start with a dark banner
  const isSubpageDarkBanner = pathname !== "/";
  const useLightText = !isPastHero && (isSubpageDarkBanner || isDarkBackdrop);

  useEffect(() => {
    const updateHeaderState = () => {
      const heroEl = document.getElementById("hero-sequence");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const maxScroll = Math.max(1, heroEl.offsetHeight - window.innerHeight);
        const heroProgress = Math.min(1, Math.max(0, -rect.top / maxScroll));

        // Remain transparent across load + entire hero reveal; activate off-white
        // header container only when scrolling into the main content section below.
        const pastHero = rect.bottom <= 150;
        setIsPastHero(pastHero);
        setIsDarkBackdrop(!pastHero && heroProgress >= 0.3);
      } else {
        setIsPastHero(window.scrollY > 20);
        setIsDarkBackdrop(false);
      }
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, [pathname]);

  const textColorClass = useLightText ? "text-white" : "text-[#141517]";

  const subColorClass = useLightText ? "text-white/65" : "text-[#5e6573]";

  const linkColorClass = useLightText
    ? "text-white/80 hover:text-white"
    : "text-[#141517]/75 hover:text-[#141517]";

  const buttonClass = useLightText
    ? "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-[#141517]"
    : isPastHero
    ? "border-black/15 bg-white text-[#141517] hover:bg-[#141517] hover:text-white"
    : "border-black/15 bg-white/80 backdrop-blur-sm text-[#141517] hover:bg-[#141517] hover:text-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isPastHero
            ? "py-3.5 glass-header shadow-sm bg-[#f6f5f0]/95 backdrop-blur-md"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1720px] mx-auto px-6 md:px-12 flex items-center justify-between"
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-black/10 bg-white p-1 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 shrink-0">
              <Image
                src="/onyx-logo.png"
                alt="Onyx Assets"
                width={32}
                height={32}
                style={{ width: "auto", height: "auto" }}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg tracking-[0.18em] uppercase font-semibold transition-colors duration-300 ${textColorClass}`}
              >
                ONYX RESIDENCE
              </span>
              <span
                className={`text-[9px] tracking-[0.25em] uppercase font-mono transition-colors duration-300 ${subColorClass}`}
              >
                UDUPI • KARNATAKA
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links — Exactly 5 Minimalist Slots */}
          <nav className="hidden lg:flex items-center gap-9 text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-300">
            <Link
              href="/heritage"
              className={`transition-colors ${linkColorClass} ${
                pathname === "/heritage" ? "font-semibold underline underline-offset-8" : ""
              }`}
            >
              (Heritage)
            </Link>
            <Link
              href="/estates"
              className={`transition-colors ${linkColorClass} ${
                pathname === "/estates" ? "font-semibold underline underline-offset-8" : ""
              }`}
            >
              (Residences)
            </Link>
            <Link
              href="/insights"
              className={`transition-colors ${linkColorClass} ${
                pathname === "/insights" ? "font-semibold underline underline-offset-8" : ""
              }`}
            >
              (Insights)
            </Link>
            <Link
              href="/#amenities"
              className={`transition-colors ${linkColorClass}`}
            >
              (Amenities)
            </Link>
            <Link
              href="/#faq"
              className={`transition-colors ${linkColorClass}`}
            >
              (FAQ)
            </Link>
          </nav>

          {/* Right Action Button -> Direct to /consultation */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/consultation"
              className={`group px-6 py-2.5 rounded-full border text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-sm flex items-center gap-2 ${buttonClass}`}
            >
              <span>BOOK A VISIT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 transition-colors ${textColorClass}`}
            aria-label="Toggle Navigation"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-[#141517]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 text-white lg:hidden">
          <nav className="flex flex-col gap-6 text-xl font-serif">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#9c8052] transition-colors"
            >
              01 — Overview
            </Link>
            <Link
              href="/heritage"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#9c8052] transition-colors"
            >
              02 — Brand Heritage (30 Years)
            </Link>
            <Link
              href="/estates"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#9c8052] transition-colors"
            >
              03 — All Estates & Villas (16)
            </Link>
            <Link
              href="/insights"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#9c8052] transition-colors"
            >
              04 — Market Insights & Journal
            </Link>
            <Link
              href="/#amenities"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#9c8052] transition-colors"
            >
              05 — Curated Amenities
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#9c8052] transition-colors"
            >
              06 — Inquiries & FAQ
            </Link>
          </nav>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <Link
              href="/consultation"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-4 rounded-full bg-[#9c8052] text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-center font-semibold"
            >
              Book a Private Consultation
            </Link>
            <p className="text-[10px] font-mono text-white/50 text-center uppercase tracking-widest">
              Udupi, Karnataka • 13.34° N, 74.74° E
            </p>
          </div>
        </div>
      )}
    </>
  );
}
