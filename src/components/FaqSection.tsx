"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { MaskedWords, ScrubbedText } from "@/components/ui/motion-primitives";

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
  const prefersReducedMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-28 md:py-40 bg-[#f6f5f0] border-t border-black/5 relative overflow-clip"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Editorial Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase block mb-3"
            >
              (FREQUENTLY ASKED QUESTIONS)
            </motion.span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#141517] font-light tracking-tight leading-tight">
              <MaskedWords segments={[{ text: "Your Questions," }]} />
              <br />
              <MaskedWords
                segments={[
                  {
                    text: "Answered",
                    className: "italic font-normal text-[#9c8052]",
                  },
                ]}
                delay={0.1}
              />
            </h2>
            <ScrubbedText
              segments={[
                {
                  text: "Everything you need to know about acquisitions, architectural floor plans, site visits, and development timelines.",
                },
              ]}
              className="mt-6 text-base text-[#5e6573] font-light leading-relaxed max-w-md"
            />
          </div>

          {/* Right Minimalist Hairline Accordion */}
          <div className="lg:col-span-7 divide-y divide-black/10 border-y border-black/10">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <motion.div
                  key={faq.question}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx)}
                    className="w-full py-7 text-left group flex items-center justify-between gap-6 cursor-pointer"
                  >
                    <h3 className="text-lg sm:text-xl font-serif text-[#141517] group-hover:text-[#9c8052] transition-colors">
                      {faq.question}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                      }}
                      className="text-[#141517] group-hover:text-[#9c8052] transition-colors shrink-0"
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? false
                            : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 text-sm sm:text-base text-[#5e6573] font-light leading-relaxed max-w-2xl">
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
