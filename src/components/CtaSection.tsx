"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskedWords, ScrubbedText } from "@/components/ui/motion-primitives";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);
  const rawY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const bgScale = useSpring(rawScale, { stiffness: 70, damping: 24 });
  const bgY = useSpring(rawY, { stiffness: 70, damping: 24 });

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-36 md:py-52 bg-[#141517] text-white overflow-hidden"
    >
      {/* Background Cinematic Parallax Visual */}
      <motion.div
        style={prefersReducedMotion ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Sampoorna%20Big%20Villa%20Elevation.jpeg"
          alt="Onyx Sanctuary"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.3] contrast-[1.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141517]/90 via-[#141517]/40 to-[#0e1014]" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block"
        >
          (PRIVATE ADVISORY)
        </motion.span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white font-light tracking-tight leading-[1.02]">
          <MaskedWords segments={[{ text: "Discover the Essence of" }]} />
          <br />
          <MaskedWords
            segments={[
              {
                text: "Onyx Living",
                className: "italic font-normal text-[#c5a059]",
              },
            ]}
            delay={0.12}
          />
        </h2>

        <ScrubbedText
          segments={[
            {
              text: "Step into an elevated lifestyle. Schedule a private architectural walkthrough or request tailored floor plans directly with our principal partners in Udupi.",
            },
          ]}
          className="text-base sm:text-lg text-[#d1d5db] font-light max-w-2xl mx-auto leading-relaxed"
          baseOpacity={0.32}
          offset={["start 96%", "start 68%"]}
        />

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="pt-4 flex justify-center"
        >
          <Link
            href="/consultation"
            className="group px-9 py-4 rounded-full bg-[#c5a059] text-[#141517] font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 font-semibold inline-flex items-center gap-3 shadow-2xl"
          >
            <span>Book a Private Consultation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
