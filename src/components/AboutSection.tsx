"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rawImgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgY = useSpring(rawImgY, { stiffness: 60, damping: 20 });

  const stats = [
    { value: "60", unit: "%", label: "Open green landscapes, private balconies & serene breezeways." },
    { value: "30", unit: "+", label: "Years of combined engineering and architectural mastery." },
    { value: "11", unit: "", label: "Exclusive private villas in our gated coastal enclave (Villas 2–12)." },
    { value: "100", unit: "%", label: "Structural trust and certified RERA compliance on every project." },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 md:py-40 bg-[#f6f5f0] border-t border-black/5 relative overflow-hidden"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono tracking-[0.25em] text-[#9c8052] uppercase mb-12"
        >
          (ABOUT)
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-7 overflow-hidden">
            <motion.h2
              initial={{ y: "60%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#141517] font-light leading-[0.98] tracking-tight"
            >
              Timeless <br />
              <span className="italic font-normal text-[#9c8052]">Design</span>,{" "}
              <br />
              Wellness-Focused Living.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6 lg:pt-4"
          >
            <p className="text-base sm:text-lg text-[#2c3038] font-light leading-relaxed">
              Every element of Onyx Assets reflects an uncompromising commitment
              to excellence. From the structural durability of our foundations to
              our thoughtfully oriented floor plans, each property embodies a
              holistic approach to luxury living.
            </p>
            <p className="text-sm sm:text-base text-[#5e6573] font-light leading-relaxed">
              Whether you are seeking a serene riverfront haven, a landmark urban
              apartment in Kunjibettu, or a private gated villa estate, Onyx
              Assets crafts homes built to last for generations.
            </p>
          </motion.div>
        </div>

        {/* Stats + Parallax Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-black/10">
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="space-y-3"
              >
                <div className="text-6xl sm:text-7xl font-serif text-[#141517] font-light">
                  {s.value}
                  <span className="text-3xl sm:text-4xl text-[#9c8052]">{s.unit}</span>
                </div>
                <p className="text-xs sm:text-sm font-mono tracking-wider uppercase text-[#5e6573] leading-relaxed">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5"
              style={{ position: "relative" }}
            >
              {/* Parallax image with spring physics */}
              <motion.div
                style={{ y: imgY }}
                className="absolute inset-[-10%] w-[120%] h-[120%]"
              >
                <Image
                  src="https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/3.jpeg"
                  alt="Onyx Architectural Living Space"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#9c8052]/10 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
