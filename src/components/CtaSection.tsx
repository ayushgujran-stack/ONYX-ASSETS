"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ShieldCheck, MessageSquare, Mail } from "lucide-react";

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("Opulence by Onyx");

  const getInquiryText = () => {
    return `*Inquiry for Onyx Assets LLP*\n*Residence:* ${project}\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}`;
  };

  const getWhatsAppUrl = () => {
    return `https://wa.me/919113925641?text=${encodeURIComponent(getInquiryText())}`;
  };

  const getMailtoUrl = () => {
    return `mailto:onyxassets@outlook.com?subject=${encodeURIComponent(`[Onyx Assets Inquiry] ${project} - ${name}`)}&body=${encodeURIComponent(getInquiryText())}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          residence: project,
          targetEmail: "onyxassets@outlook.com",
          targetPhone: "+91 91139 25641",
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" className="relative py-32 md:py-44 bg-[#141517] text-white overflow-hidden">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0" style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Image
          src="https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Sampoorna%20Big%20Villa%20Elevation.jpeg"
          alt="Onyx Sanctuary"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.25] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141517] via-transparent to-[#141517]/85" />
      </div>

      <div className="relative z-10 max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          {/* Left Title */}
          <div className="lg:col-span-7 space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block"
            >
              (PRIVATE ADVISORY)
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "70%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white font-light tracking-tight leading-[1.02]"
              >
                Discover the Essence of <br />
                <span className="italic font-normal text-[#c5a059]">Onyx Living</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-[#9ca3af] font-light max-w-xl leading-relaxed"
            >
              Step into an elevated lifestyle. Schedule a private architectural viewing or
              request tailored floor plans directly with our principal partners.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 text-xs font-mono text-[#9ca3af] pt-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>CONFIDENTIAL • NO OBLIGATION • DIRECT DEVELOPER PRICING</span>
            </motion.div>
          </div>

          {/* Right Lead Capture Box with spring entrance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif text-white font-normal">
                  Inquiry Registered
                </h3>
                <p className="text-xs text-[#9ca3af] font-light max-w-sm mx-auto">
                  Thank you, {name}. Your inquiry for {project} is logged. Choose a direct channel below for instant dispatch to Onyx principals:
                </p>

                <div className="flex flex-col gap-2.5 pt-2 max-w-sm mx-auto">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-mono text-[11px] uppercase tracking-wider font-semibold hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Confirm via WhatsApp (+91 91139 25641)</span>
                  </a>

                  <a
                    href={getMailtoUrl()}
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 border border-white/20"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Email (onyxassets@outlook.com)</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setPhone("");
                    setEmail("");
                  }}
                  className="text-[11px] font-mono text-[#9ca3af] underline hover:text-white pt-2 block mx-auto"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[11px] font-mono tracking-widest uppercase text-[#9ca3af] block mb-2">
                    Residence of Interest
                  </label>
                  <select
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  >
                    <option value="Opulence by Onyx" className="bg-[#141517]">
                      Opulence by Onyx (Kunjibettu)
                    </option>
                    <option value="Riviera by Onyx" className="bg-[#141517]">
                      Riviera by Onyx (Mission Compound)
                    </option>
                    <option value="A.R. Sattva by Onyx" className="bg-[#141517]">
                      A.R. Sattva Signature Suites
                    </option>
                    <option value="Onyx Villa Enclave" className="bg-[#141517]">
                      The Onyx Villa Enclave (Villas 2-12)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono tracking-widest uppercase text-[#9ca3af] block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Siddharth Rao"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono tracking-widest uppercase text-[#9ca3af] block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 91139 25641"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono tracking-widest uppercase text-[#9ca3af] block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="siddharth@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-full py-4 rounded-full bg-[#c5a059] text-[#141517] font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 font-semibold flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                >
                  <span>{isSubmitting ? "TRANSMITTING INQUIRY..." : "Request Private Viewing & Brochure"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
