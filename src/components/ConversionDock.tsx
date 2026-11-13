"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  Calendar,
  Phone,
  X,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { ACTIVE_PROPERTIES } from "@/data/properties";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const ONYX_WHATSAPP = "919113925641";
const ONYX_PHONE = "+919113925641";

interface ConversionDockProps {
  activePropertyName?: string;
  watchHeroElement?: boolean;
}

const ALL_SELECTABLE_ESTATES = [
  ...ACTIVE_PROPERTIES.map((p) => p.name),
  "A.R. Sattva Resale Inquiries",
  "Onyx Villa Enclave (Villas 7–12)",
];

export function ConversionDock({
  activePropertyName,
  watchHeroElement = false,
}: ConversionDockProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(!watchHeroElement);
  const [dockExpanded, setDockExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedResidence, setSelectedResidence] = useState<string | null>(null);
  const residence = selectedResidence ?? activePropertyName ?? "Opulence by Onyx";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("Morning (10:00 AM – 1:00 PM)");

  // Show side concierge icon cleanly once scrolled past the landing hero
  useEffect(() => {
    if (!watchHeroElement) return;

    const handleScroll = () => {
      const aboutEl = document.getElementById("about");
      if (!aboutEl) {
        setIsVisible(window.scrollY > window.innerHeight * 0.85);
        return;
      }
      const aboutTop = aboutEl.getBoundingClientRect().top;
      setIsVisible(aboutTop <= window.innerHeight * 0.85);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [watchHeroElement]);

  const whatsappHref = `https://wa.me/${ONYX_WHATSAPP}?text=${encodeURIComponent(
    `Hello Onyx Assets Advisory, I would like to schedule a private viewing / receive specifications for ${residence}.`
  )}`;

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          residence,
          date: date || "Next Available",
          timeOfDay: slot,
          format: "VIP Site Viewing (Concierge)",
        }),
      });
    } catch {
      // Fall back cleanly to confirmation + WhatsApp handoff
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* ─── Minimalist Floating Side Concierge Icon (Bottom-Right Corner) ─── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.45, ease: EXPO_OUT }}
            className="fixed bottom-6 right-5 md:right-7 z-40 flex flex-col items-end gap-3"
          >
            {/* Expanded Action Menu when tapped */}
            <AnimatePresence>
              {dockExpanded && (
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 12, scale: 0.95 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, y: 10, scale: 0.95 }
                  }
                  transition={{ duration: 0.3, ease: EXPO_OUT }}
                  className="flex flex-col items-end gap-2.5"
                >
                  {/* Call Advisory */}
                  <a
                    href={`tel:${ONYX_PHONE}`}
                    onClick={() => setDockExpanded(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#141517]/95 backdrop-blur-xl border border-white/15 text-white hover:border-[#c5a059] shadow-xl transition-all group"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/85 group-hover:text-[#dfc082]">
                      Call Advisory
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#dfc082]">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                  </a>

                  {/* Schedule Site Visit */}
                  <button
                    onClick={() => {
                      setDockExpanded(false);
                      setSubmitted(false);
                      setModalOpen(true);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#141517]/95 backdrop-blur-xl border border-white/15 text-white hover:border-[#c5a059] shadow-xl transition-all group"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/85 group-hover:text-[#dfc082]">
                      Schedule Visit
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#c5a059] flex items-center justify-center text-[#141517]">
                      <Calendar className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {/* WhatsApp Concierge */}
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDockExpanded(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#141517]/95 backdrop-blur-xl border border-[#c5a059]/40 text-white hover:bg-[#9c8052] shadow-xl transition-all group"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#dfc082] group-hover:text-white">
                      WhatsApp Chat
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#dfc082] group-hover:text-white">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Primary Side Icon Trigger */}
            <button
              onClick={() => setDockExpanded((prev) => !prev)}
              aria-label={
                dockExpanded ? "Close concierge menu" : "Open WhatsApp & viewing concierge"
              }
              aria-expanded={dockExpanded}
              className={`w-13 h-13 rounded-full flex items-center justify-center shadow-[0_14px_34px_rgba(0,0,0,0.28)] border transition-all duration-300 backdrop-blur-xl ${
                dockExpanded
                  ? "bg-white text-[#141517] border-black/15"
                  : "bg-[#141517]/92 text-[#dfc082] border-[#c5a059]/45 hover:bg-[#9c8052] hover:text-white hover:border-[#9c8052]"
              }`}
            >
              {dockExpanded ? (
                <X className="w-5 h-5" />
              ) : (
                <MessageCircle className="w-5 h-5" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Quick VIP Viewing Scheduler Modal (Zero Payments) ─── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              data-lenis-prevent
              initial={
                prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 18 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, scale: 0.96, y: 16 }
              }
              transition={{ duration: 0.4, ease: EXPO_OUT }}
              className="relative w-full max-w-lg rounded-3xl bg-[#f6f5f0] text-[#141517] border border-black/10 shadow-2xl p-6 sm:p-9 z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close scheduler"
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                <div className="py-6 text-center space-y-5">
                  <div className="w-12 h-12 rounded-full bg-[#9c8052]/15 text-[#9c8052] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#9c8052]">
                      (VIEWING CONFIRMED)
                    </span>
                    <h3 className="font-serif text-3xl text-[#141517] font-light">
                      Private Tour Reserved
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5e6573] font-light max-w-sm mx-auto leading-relaxed">
                      Our senior partner will contact you at{" "}
                      <span className="text-[#141517] font-medium">{phone}</span>{" "}
                      to finalize access for{" "}
                      <span className="text-[#9c8052] font-medium">
                        {residence}
                      </span>
                      .
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${ONYX_WHATSAPP}?text=${encodeURIComponent(
                      `*VIP Site Visit Request*\nResidence: ${residence}\nName: ${name}\nPhone: ${phone}\nDate: ${date || "Flexible"}\nWindow: ${slot}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#141517] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#9c8052] transition-colors"
                  >
                    <span>Confirm via WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-5">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9c8052] block mb-1.5">
                      (PRIVATE APPOINTMENT)
                    </span>
                    <h3 className="font-serif text-3xl text-[#141517] font-light">
                      Schedule a Site{" "}
                      <span className="italic font-normal text-[#9c8052]">
                        Walkthrough
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573] block mb-1.5">
                        Select Estate
                      </label>
                      <select
                        value={residence}
                        onChange={(e) => setSelectedResidence(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[#141517] focus:outline-none focus:border-[#9c8052]"
                      >
                        {ALL_SELECTABLE_ESTATES.map((est) => (
                          <option key={est} value={est}>
                            {est}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573] block mb-1.5">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[#141517] focus:outline-none focus:border-[#9c8052]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573] block mb-1.5">
                          Phone / WhatsApp
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 ..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[#141517] focus:outline-none focus:border-[#9c8052]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573] block mb-1.5">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[#141517] focus:outline-none focus:border-[#9c8052]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e6573] block mb-1.5">
                          Time Window
                        </label>
                        <select
                          value={slot}
                          onChange={(e) => setSlot(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[#141517] focus:outline-none focus:border-[#9c8052]"
                        >
                          <option>Morning (10:00 AM – 1:00 PM)</option>
                          <option>Afternoon (2:00 PM – 5:30 PM)</option>
                          <option>Private Video Tour (NRI)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#141517] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#9c8052] transition-colors shadow-lg disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Reserving Slot..."
                      : "Confirm Private Viewing"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
