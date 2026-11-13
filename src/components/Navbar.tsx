"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBookVisit?: () => void;
}

const RESIDENCE_LINKS = [
  { label: "All Residences", href: "/estates", tag: "Complete Portfolio" },
  { label: "Ongoing Projects", href: "/estates?status=ongoing", tag: "In Construction" },
  { label: "Completed Projects", href: "/estates?status=completed", tag: "Delivered" },
  { label: "Pre-Launch", href: "/estates?status=pre-launch", tag: "Early Access" },
  { label: "Future Projects", href: "/estates?status=future", tag: "Master Plan" },
];

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function Navbar({ onOpenBookVisit }: NavbarProps) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isDarkBackdrop, setIsDarkBackdrop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [residencesOpen, setResidencesOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Subpages with dark hero banners (/gallery, /heritage, /insights, /consultation) use light nav text at top
  const isSubpageDarkBanner =
    pathname === "/gallery" ||
    pathname === "/heritage" ||
    pathname === "/insights" ||
    pathname === "/consultation";
  const useLightText = !isPastHero && (isSubpageDarkBanner || isDarkBackdrop);

  useEffect(() => {
    const updateHeaderState = () => {
      const heroEl = document.getElementById("hero-sequence");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const maxScroll = Math.max(1, heroEl.offsetHeight - window.innerHeight);
        const heroProgress = Math.min(1, Math.max(0, -rect.top / maxScroll));

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
          transition={{ duration: 0.9, delay: 0.08, ease: EXPO_OUT }}
          className="max-w-[1720px] mx-auto px-6 md:px-12 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]"
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group lg:justify-self-start">
            <div className="w-10 h-10 rounded-full border border-black/10 bg-white p-1 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 shrink-0">
              <Image
                src="/onyx-logo.png"
                alt="Onyx Assets"
                width={655}
                height={619}
                className="w-8 h-8 object-contain"
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

          {/* Streamlined Desktop Nav — Mathematically Centered */}
          <nav className="hidden lg:flex lg:justify-self-center items-center gap-10 text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-300">
            {/* Residences with Project Status Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setResidencesOpen(true)}
              onMouseLeave={() => setResidencesOpen(false)}
            >
              <Link
                href="/estates"
                className={`inline-flex items-center gap-1.5 transition-colors ${linkColorClass} ${
                  pathname === "/estates"
                    ? "font-semibold underline underline-offset-8"
                    : ""
                }`}
              >
                <span>(Residences)</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    residencesOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              <AnimatePresence>
                {residencesOpen && (
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 10, scale: 0.98 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: 0, y: 8, scale: 0.98 }
                    }
                    transition={{ duration: 0.25, ease: EXPO_OUT }}
                    className="absolute left-0 top-full pt-2 w-64"
                  >
                    <div className="rounded-2xl bg-[#141517]/95 backdrop-blur-xl border border-white/15 shadow-2xl p-2 text-white">
                      {RESIDENCE_LINKS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setResidencesOpen(false)}
                          className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group/item"
                        >
                          <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-white group-hover/item:text-[#dfc082] transition-colors">
                            {item.label}
                          </span>
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
                            {item.tag}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/gallery"
              className={`transition-colors ${linkColorClass} ${
                pathname === "/gallery"
                  ? "font-semibold underline underline-offset-8"
                  : ""
              }`}
            >
              (Gallery)
            </Link>

            <Link
              href="/#about"
              className={`transition-colors ${linkColorClass}`}
            >
              (About)
            </Link>

            <Link
              href="/#faq"
              className={`transition-colors ${linkColorClass}`}
            >
              (FAQ)
            </Link>
          </nav>

          {/* Right Action Button -> Direct to /consultation */}
          <div className="hidden sm:flex items-center gap-4 lg:justify-self-end">
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

      {/* Streamlined Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-[#141517]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 text-white lg:hidden overflow-y-auto">
          <nav className="flex flex-col gap-6">
            <div className="space-y-3">
              <Link
                href="/estates"
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-serif hover:text-[#c5a059] transition-colors block"
              >
                01 — Residences
              </Link>
              {/* Direct Status Sub-links on Mobile */}
              <div className="grid grid-cols-2 gap-2 pl-4 pt-1">
                {RESIDENCE_LINKS.slice(1).map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xs font-mono uppercase tracking-wider text-white/65 hover:text-[#dfc082] py-1"
                  >
                    • {sub.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/gallery"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-serif hover:text-[#c5a059] transition-colors"
            >
              02 — Architectural Gallery
            </Link>

            <Link
              href="/#about"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-serif hover:text-[#c5a059] transition-colors"
            >
              03 — About & Amenities
            </Link>

            <Link
              href="/#faq"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-serif hover:text-[#c5a059] transition-colors"
            >
              04 — Inquiries & FAQ
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
