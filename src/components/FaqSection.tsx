"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "What types of residences are available across Onyx Assets?",
    answer:
      "We offer a diverse portfolio of luxury residential formats: from newly launched high-rise luxury apartments at Opulence by Onyx (Kunjibettu) and riverfront residences at Riviera by Onyx (Mission Compound), to our signature completed suites at A.R. Sattva and the bespoke private gated Villa Enclave (Villas 2 through 12).",
  },
  {
    question: "Where are the flagship projects situated in Udupi?",
    answer:
      "Opulence by Onyx is centrally located in Kunjibettu, offering seamless proximity to central Udupi and Manipal. Riviera by Onyx sits gracefully in Mission Compound along serene water corridors. Our private villa collection is nestled within pristine coastal green belts of Udupi, Karnataka.",
  },
  {
    question: "What engineering standards and certifications does Onyx adhere to?",
    answer:
      "With over 30 years of combined structural engineering experience, all Onyx residences are engineered with seismic-resistant RCC frames, strict soil stratum load calibrations, advanced waterproofing membranes, and full RERA compliance.",
  },
  {
    question: "How can I obtain the official floor plans and downloadable brochures?",
    answer:
      "Direct architectural brochures for Opulence and Riviera are available for instant download on this site. You may also schedule a private consultation or request bespoke villa layouts directly through our advisory desk.",
  },
  {
    question: "What wellness and lifestyle amenities are provided?",
    answer:
      "Depending on the development, amenities include temperature-controlled infinity pools, rooftop sky lounges with panoramic sunset views, private elevators, fitness pavilions, landscaped meditation gardens, and dedicated EV charging stations.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-28 md:py-40 bg-[#f6f5f0] border-t border-black/5 relative overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Title with masked entrance */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
            >
              (FREQUENTLY ASKED QUESTIONS)
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "70%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl font-serif text-[#141517] font-light tracking-tight leading-tight"
              >
                Your Questions, <br />
                <span className="italic font-normal text-[#9c8052]">Answered</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base text-[#5e6573] font-light leading-relaxed max-w-md"
            >
              Everything you need to know about acquisitions, architectural floor plans,
              site visits, and development timelines.
            </motion.p>
          </div>

          {/* Right Accordion List with staggered entrance */}
          <div className="lg:col-span-7 divide-y divide-black/10 border-y border-black/10">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="py-7 group cursor-pointer"
                  onClick={() => toggle(idx)}
                >
                  <div className="flex items-center justify-between gap-6">
                    <h3 className="text-lg sm:text-xl font-serif text-[#141517] group-hover:text-[#9c8052] transition-colors">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black group-hover:border-black shrink-0"
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm sm:text-base text-[#5e6573] font-light leading-relaxed max-w-2xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
