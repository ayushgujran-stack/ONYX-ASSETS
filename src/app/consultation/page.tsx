"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Calendar,
  Clock,
  MessageSquare,
  Building2,
  ExternalLink,
} from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ONYX_EMAIL = "onyxassets@outlook.com";
const ONYX_PHONE_PRIMARY = "+91 91139 25641";
const ONYX_PHONE_SECONDARY = "+91 91139 24480";
const ONYX_WHATSAPP = "919113925641";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    residence: "Opulence by Onyx",
    format: "Private On-Site Walkthrough",
    advisor: "Mr. Harish Bhat / Senior Principal",
    date: "",
    timeOfDay: "Morning (10:00 AM - 1:00 PM)",
    notes: "",
  });

  const getInquirySummary = () => {
    return `*Inquiry for Onyx Assets LLP*
*Project:* ${formData.residence}
*Client Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Preferred Format:* ${formData.format}
*Preferred Date:* ${formData.date || "Immediate"}
*Preferred Window:* ${formData.timeOfDay}
${formData.notes ? `*Client Notes:* ${formData.notes}` : ""}`;
  };

  const getWhatsAppUrl = () => {
    const text = getInquirySummary();
    return `https://wa.me/${ONYX_WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  const getMailtoUrl = () => {
    const subject = `[Onyx Assets Consultation Inquiry] - ${formData.residence} (${formData.name})`;
    const body = getInquirySummary();
    return `mailto:${ONYX_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Post to our API endpoint
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          targetEmail: ONYX_EMAIL,
          targetPhone: ONYX_PHONE_PRIMARY,
        }),
      });
    } catch (err) {
      console.error("Inquiry logging err:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f6f5f0] text-[#141517]">
        <Navbar onOpenBookVisit={() => {}} />

        {/* Hero Section */}
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
                  PRIVATE CLIENT ADVISORY
                </span>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[0.96]"
                  >
                    Private Consultation <br />
                    <span className="italic font-normal text-[#c5a059]">& Site Walk-Through</span>
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
                  Reserve a confidential session with our senior principals. Inquiries are routed directly to Onyx Assets LLP management for personalized attention.
                </p>
                <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-white/50 pt-2 border-t border-white/10">
                  <span>Confidential NDA</span>
                  <span>•</span>
                  <span>Direct Developer Desk</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Booking Form & Advisor Grid */}
        <section className="py-24 md:py-36">
          <div className="max-w-[1720px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left Column: Direct Contacts & Reassurances */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block">
                    THE ENGAGEMENT PROTOCOL
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#141517] tracking-tight">
                    Personalized Guidance, <br />
                    <span className="italic font-normal text-[#9c8052]">Direct With Onyx Principals</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#5e6573] font-light leading-relaxed">
                    We recognize that acquiring a luxury home in Udupi is an intimate, generational decision. Every consultation is conducted directly with key decision-makers who understand local zoning, structural engineering, bank loan facilitation, and Vastu orientation.
                  </p>
                </div>

                {/* Direct Contact Cards */}
                <div className="space-y-4">
                  {/* Phone Hotline */}
                  <div className="p-6 rounded-2xl bg-white border border-black/8 shadow-sm space-y-3">
                    <span className="text-[11px] font-mono text-[#9c8052] uppercase tracking-wider block">
                      Direct Partner Hotline
                    </span>
                    <div className="space-y-1">
                      <a
                        href={`tel:${ONYX_PHONE_PRIMARY.replace(/\s+/g, "")}`}
                        className="text-lg font-serif text-[#141517] hover:text-[#9c8052] transition-colors flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4 text-[#9c8052]" />
                        <span>{ONYX_PHONE_PRIMARY}</span>
                      </a>
                      <a
                        href={`tel:${ONYX_PHONE_SECONDARY.replace(/\s+/g, "")}`}
                        className="text-sm font-serif text-[#5e6573] hover:text-[#9c8052] transition-colors flex items-center gap-2 pl-6"
                      >
                        <span>{ONYX_PHONE_SECONDARY}</span>
                      </a>
                    </div>
                    <div className="pt-2">
                      <a
                        href={`https://wa.me/${ONYX_WHATSAPP}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-[#25D366] hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send us a HELLO on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Priority Email Desk */}
                  <div className="p-6 rounded-2xl bg-white border border-black/8 shadow-sm space-y-3">
                    <span className="text-[11px] font-mono text-[#9c8052] uppercase tracking-wider block">
                      Official Inquiries Email
                    </span>
                    <a
                      href={`mailto:${ONYX_EMAIL}`}
                      className="text-lg font-serif text-[#141517] hover:text-[#9c8052] transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-[#9c8052]" />
                      <span>{ONYX_EMAIL}</span>
                    </a>
                    <p className="text-xs text-[#5e6573] font-light">
                      Direct delivery to Onyx Assets LLP management for prioritized turnaround.
                    </p>
                  </div>

                  {/* Corporate Office Address & Hours */}
                  <div className="p-6 rounded-2xl bg-white border border-black/8 shadow-sm space-y-3 text-xs">
                    <span className="text-[11px] font-mono text-[#9c8052] uppercase tracking-wider block">
                      Registered Corporate Office
                    </span>
                    <div className="flex items-start gap-2.5 text-[#2c3038] font-light leading-relaxed">
                      <MapPin className="w-4 h-4 text-[#9c8052] shrink-0 mt-0.5" />
                      <div>
                        <strong>ONYX Assets LLP</strong>
                        <p>5-31(3), Vyavahar Pearl, Alevoor, Udupi, Karnataka, India 574118</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-[#5e6573] pt-2 border-t border-black/5">
                      <Clock className="w-4 h-4 text-[#9c8052] shrink-0 mt-0.5" />
                      <div>
                        <p>Monday – Friday: 9:00 am – 6:30 pm</p>
                        <p>Saturday: 9:00 am – 2:30 pm | Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#ede8df] border border-black/8 space-y-2 text-xs font-mono">
                    <div className="flex items-center gap-2 text-[#141517] font-semibold">
                      <ShieldCheck className="w-4 h-4 text-[#9c8052]" />
                      <span>Strict Confidentiality & Compliance</span>
                    </div>
                    <p className="text-[#5e6573] font-light leading-relaxed">
                      All communications are handled with absolute discretion. Verified RERA developer credentials and end-to-end documentation assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Tailored Booking Sheet */}
              <div className="lg:col-span-7 bg-white border border-black/10 rounded-3xl p-8 sm:p-12 shadow-xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#c5a059]/15 text-[#9c8052] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-serif text-[#141517]">
                        Consultation Registered
                      </h3>
                      <p className="text-sm text-[#5e6573] font-light max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>{formData.name}</strong>. Your inquiry for <strong>{formData.residence}</strong> has been logged and queued for Onyx Assets LLP.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#f6f5f0] border border-black/8 max-w-md mx-auto text-left space-y-4">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#9c8052] block">
                        Direct Dispatch Channels
                      </span>
                      <p className="text-xs text-[#5e6573] leading-relaxed">
                        To receive immediate priority booking confirmation, click below to send your details directly via official WhatsApp or email:
                      </p>

                      <div className="flex flex-col gap-3 pt-2">
                        <a
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 shadow-md"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Send via WhatsApp (+91 91139 25641)</span>
                        </a>

                        <a
                          href={getMailtoUrl()}
                          className="w-full py-3.5 px-4 rounded-xl bg-[#141517] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#9c8052] transition-colors flex items-center justify-center gap-2 shadow-md"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Send via Email ({ONYX_EMAIL})</span>
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 max-w-sm mx-auto text-xs font-mono text-[#5e6573] space-y-1">
                      <p>Meeting Format: {formData.format}</p>
                      <p>Contact: {formData.phone} • {formData.email}</p>
                    </div>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-full border border-black/15 text-xs font-mono uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                      Book Another Appointment
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="border-b border-black/8 pb-6">
                      <span className="text-xs font-mono tracking-widest uppercase text-[#9c8052] block mb-2">
                        Step 1 of 2
                      </span>
                      <h3 className="text-2xl font-serif text-[#141517]">
                        Consultation Preferences
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] font-mono tracking-widest uppercase text-[#5e6573] block mb-2">
                          Residence of Interest
                        </label>
                        <select
                          value={formData.residence}
                          onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                          className="w-full bg-[#f6f5f0] border border-black/10 rounded-xl px-4 py-3.5 text-sm text-[#141517] focus:outline-none focus:border-[#9c8052] transition-colors"
                        >
                          <option value="Opulence by Onyx">Opulence by Onyx (Kunjibettu)</option>
                          <option value="Riviera by Onyx">Riviera by Onyx (Mission Compound)</option>
                          <option value="A.R. Sattva by Onyx">A.R. Sattva Signature Series</option>
                          <option value="The Onyx Villa Enclave (Villas 2-12)">The Onyx Villa Enclave (Villas 2-12)</option>
                          <option value="Bespoke Coastal Villa Plot">Bespoke Coastal Villa Plot</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono tracking-widest uppercase text-[#5e6573] block mb-2">
                          Preferred Meeting Format
                        </label>
                        <select
                          value={formData.format}
                          onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                          className="w-full bg-[#f6f5f0] border border-black/10 rounded-xl px-4 py-3.5 text-sm text-[#141517] focus:outline-none focus:border-[#9c8052] transition-colors"
                        >
                          <option value="Private On-Site Walkthrough">Private On-Site Walkthrough (Udupi)</option>
                          <option value="Live Virtual Tour (Zoom / Google Meet)">Live Video Conference (Global NRI)</option>
                          <option value="In-Person at Corporate Office">In-Person at Corporate Office (Alevoor)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] font-mono tracking-widest uppercase text-[#5e6573] block mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-[#f6f5f0] border border-black/10 rounded-xl px-4 py-3.5 text-sm text-[#141517] focus:outline-none focus:border-[#9c8052] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono tracking-widest uppercase text-[#5e6573] block mb-2">
                          Preferred Time Window
                        </label>
                        <select
                          value={formData.timeOfDay}
                          onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value })}
                          className="w-full bg-[#f6f5f0] border border-black/10 rounded-xl px-4 py-3.5 text-sm text-[#141517] focus:outline-none focus:border-[#9c8052] transition-colors"
                        >
                          <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM IST)</option>
                          <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM IST)</option>
                          <option value="Sunset / Evening (5:00 PM - 6:30 PM)">Sunset / Evening (5:00 PM - 6:30 PM IST)</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-b border-black/8 pb-6 pt-4">
                      <span className="text-xs font-mono tracking-widest uppercase text-[#9c8052] block mb-2">
                        Step 2 of 2
                      </span>
                      <h3 className="text-2xl font-serif text-[#141517]">
                        Client Credentials
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-[11px] font-mono tracking-widest uppercase text-[#5e6573] block mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="E.g. Siddharth Rao"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#f6f5f0] border border-black/10 rounded-xl px-4 py-3.5 text-sm text-[#141517] placeholder-black/30 focus:outline-none focus:border-[#9c8052] transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[11px] font-mono tracking-widest uppercase text-[#5e6573] block mb-2">
                            Direct Telephone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 91139 25641"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#f6f5f0] border border-black/10 rounded-xl px-4 py-3.5 text-sm text-[#141517] placeholder-black/30 focus:outline-none focus:border-[#9c8052] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono tracking-widest uppercase text-[#5e6573] block mb-2">
                            Confidential Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="siddharth@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#f6f5f0] border border-black/10 rounded-xl px-4 py-3.5 text-sm text-[#141517] placeholder-black/30 focus:outline-none focus:border-[#9c8052] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono tracking-widest uppercase text-[#5e6573] block mb-2">
                          Specific Requirements or Customization Notes (Optional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="E.g. Interested in dual-penthouse configuration at Opulence or private garden sizing for Villa 8..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full bg-[#f6f5f0] border border-black/10 rounded-xl px-4 py-3.5 text-sm text-[#141517] placeholder-black/30 focus:outline-none focus:border-[#9c8052] transition-colors resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#141517] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#9c8052] transition-colors duration-300 font-semibold shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? "TRANSMITTING INQUIRY..." : "CONFIRM PRIVATE APPOINTMENT"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer onOpenBookVisit={() => {}} />
      </main>
    </SmoothScroll>
  );
}
