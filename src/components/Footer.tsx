"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Mail,
  Shield,
  Download,
  Phone,
  Clock,
} from "lucide-react";
import { MaskedWords } from "@/components/ui/motion-primitives";

interface FooterProps {
  onOpenBookVisit?: () => void;
}

export function Footer({ onOpenBookVisit: _onOpenBookVisit }: FooterProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer
      id="contact"
      className="bg-[#0e1014] text-white pt-28 pb-12 border-t border-black/10 relative overflow-clip"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Giant Editorial Brand Banner with masked reveal */}
        <div className="pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
            >
              (ONYX ASSETS LLP)
            </motion.span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-white font-light tracking-tight">
              <MaskedWords
                segments={[
                  { text: "Architectural " },
                  {
                    text: "Sanctuary",
                    className: "italic font-normal text-[#9c8052]",
                  },
                ]}
              />
            </h2>
          </div>

          <Link
            href="/consultation"
            className="group px-8 py-4 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] hover:text-white transition-all flex items-center gap-3 shrink-0 shadow-lg"
          >
            <span>BOOK A VISIT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 4 Column Directory */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-xs">
          {/* Col 1: Identity */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center">
                <Image
                  src="/onyx-logo.png"
                  alt="Onyx Assets"
                  width={28}
                  height={28}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-lg tracking-widest uppercase font-medium">
                ONYX ASSETS
              </span>
            </div>
            <p className="text-[#9ca3af] font-light leading-relaxed">
              In the world of construction, trust is everything. It is the
              foundation upon which successful projects are built.
            </p>
            <div className="text-[11px] font-mono text-[#9c8052]">
              Over 30 Years of Structural Rigor
            </div>
          </motion.div>

          {/* Col 2: Residences */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="font-mono uppercase tracking-[0.2em] text-[#9c8052] mb-5">
              (Residences)
            </h4>
            <ul className="space-y-3 text-[#d1d5db] font-light">
              <li>
                <Link
                  href="/estates"
                  className="text-[#c5a059] font-medium hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>View All 16 Estates Catalog</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="hover:text-white transition-colors"
                >
                  Opulence by Onyx (Kunjibettu)
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="hover:text-white transition-colors"
                >
                  Riviera by Onyx (Mission Compound)
                </Link>
              </li>
              <li>
                <Link
                  href="/estates"
                  className="hover:text-white transition-colors"
                >
                  The Onyx Villa Enclave (Villas 2–12)
                </Link>
              </li>
              <li>
                <Link
                  href="/estates"
                  className="hover:text-white transition-colors"
                >
                  A.R. Sattva Signature Series
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Col 3: Direct PDF Brochures */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="font-mono uppercase tracking-[0.2em] text-[#9c8052] mb-5">
              (Brochures)
            </h4>
            <ul className="space-y-3 text-[#d1d5db] font-light">
              <li>
                <a
                  href="https://img1.wsimg.com/blobby/go/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Opulence%20New%20(1).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#9c8052] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#9c8052]" />
                  <span>Opulence Brochure (PDF)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://img1.wsimg.com/blobby/go/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Brochure-2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#9c8052] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#9c8052]" />
                  <span>Riviera Brochure (PDF)</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Col 4: Location & Contact */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h4 className="font-mono uppercase tracking-[0.2em] text-[#9c8052] mb-5">
              (Corporate Office)
            </h4>
            <div className="space-y-3 text-[#d1d5db] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9c8052] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  5-31(3), Vyavahar Pearl, Alevoor, Udupi, Karnataka, India 574118
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9c8052] shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href="tel:+919113925641"
                    className="hover:text-white transition-colors"
                  >
                    +91 91139 25641
                  </a>
                  <a
                    href="tel:+919113924480"
                    className="hover:text-white transition-colors text-[11px] text-[#9ca3af]"
                  >
                    +91 91139 24480
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#9c8052] shrink-0" />
                <a
                  href="mailto:onyxassets@outlook.com"
                  className="hover:text-white transition-colors"
                >
                  onyxassets@outlook.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-[11px] text-[#9ca3af]">
                <Clock className="w-4 h-4 text-[#9c8052] shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Fri: 9:00 am – 6:30 pm</p>
                  <p>Sat: 9:00 am – 2:30 pm | Sun: Closed</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Shield className="w-4 h-4 text-[#9c8052] shrink-0" />
                <span className="font-mono text-[11px] text-[#9ca3af]">
                  RERA Registered Developer • Karnataka
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar & Agency Attribution (Clean Typography without Pill Boxes) */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono text-[#6b7280]">
          <div>
            © {new Date().getFullYear()} ONYX ASSETS LLP. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/onyxassets?igsh=MWoyZ25rcXRxc3gxeQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9c8052] transition-colors"
            >
              INSTAGRAM
            </a>
            <span>•</span>
            <a
              href="https://www.facebook.com/profile.php?id=100081138702648"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9c8052] transition-colors"
            >
              FACEBOOK
            </a>
            <span>•</span>
            <a
              href="https://wa.me/919113925641"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9c8052] transition-colors"
            >
              WHATSAPP
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[#9ca3af]">
            <span className="text-white/50">Engineered by</span>
            <a
              href="https://dezine-labs.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#c5a059] transition-colors inline-flex items-center gap-1 underline underline-offset-4 decoration-white/20 hover:decoration-[#c5a059]"
            >
              <span>DEZINE LABS</span>
              <ArrowUpRight className="w-3 h-3 text-[#c5a059]" />
            </a>
            <span className="text-white/25">•</span>
            <a
              href="https://agathidigital.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-1 underline underline-offset-4 decoration-white/20 hover:decoration-white"
            >
              <span>AGATHI DIGITAL</span>
              <ArrowUpRight className="w-3 h-3 text-white/60" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
