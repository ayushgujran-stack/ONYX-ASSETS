"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  animate,
  MotionValue,
} from "framer-motion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export interface WordSegment {
  text: string;
  className?: string;
}

interface MaskedWordsProps {
  segments: WordSegment[];
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Masked word-by-word slide-up reveal mirroring reference site headings.
 * Observes the unclipped outer container with useInView so words translated
 * outside their overflow-hidden clip always trigger cleanly on entry.
 */
export function MaskedWords({
  segments,
  className = "",
  delay = 0,
  stagger = 0.045,
}: MaskedWordsProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -40px 0px",
  });

  const words = segments.flatMap((seg) =>
    seg.text
      .split(/(\s+)/)
      .filter((t) => t.length > 0)
      .map((token) => ({
        token,
        isSpace: /^\s+$/.test(token),
        className: seg.className || "",
      }))
  );

  let wordIdx = 0;

  return (
    <span ref={containerRef} className={`inline ${className}`}>
      {words.map((item, idx) => {
        if (item.isSpace) {
          return <React.Fragment key={idx}> </React.Fragment>;
        }
        const currentDelay = delay + wordIdx * stagger;
        wordIdx += 1;

        return (
          <span
            key={idx}
            className="inline-block overflow-hidden align-bottom py-[0.08em] -my-[0.08em]"
          >
            <motion.span
              initial={prefersReducedMotion ? false : { y: "115%", opacity: 0.01 }}
              animate={
                prefersReducedMotion || isInView
                  ? { y: "0%", opacity: 1 }
                  : { y: "115%", opacity: 0.01 }
              }
              transition={{
                duration: 0.95,
                delay: isInView ? currentDelay : 0,
                ease: EXPO_OUT,
              }}
              className={`inline-block will-change-transform ${item.className}`}
            >
              {item.token}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

interface ScrubbedWordProps {
  token: string;
  progress: MotionValue<number>;
  range: [number, number];
  baseOpacity: number;
  className?: string;
}

function ScrubbedWord({
  token,
  progress,
  range,
  baseOpacity,
  className = "",
}: ScrubbedWordProps) {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${className}`}>
      {token}
    </motion.span>
  );
}

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

interface ScrubbedTextProps {
  segments: WordSegment[];
  className?: string;
  baseOpacity?: number;
  offset?: ScrollOffset;
}

/**
 * Scroll-scrubbed editorial copy reveal where words smoothly illuminate
 * sequentially in sync with scroll position.
 */
export function ScrubbedText({
  segments,
  className = "",
  baseOpacity = 0.25,
  offset = ["start 90%", "start 48%"],
}: ScrubbedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const tokens = segments.flatMap((seg) =>
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({
        word,
        className: seg.className || "",
      }))
  );

  if (prefersReducedMotion) {
    return (
      <p ref={ref} className={className}>
        {segments.map((s, i) => (
          <span key={i} className={s.className}>
            {s.text}
          </span>
        ))}
      </p>
    );
  }

  const total = Math.max(1, tokens.length);

  return (
    <p ref={ref} className={className}>
      {tokens.map((item, idx) => {
        const start = (idx / total) * 0.78;
        const end = Math.min(1, start + 0.22);
        return (
          <React.Fragment key={idx}>
            <ScrubbedWord
              token={item.word}
              progress={smoothProgress}
              range={[start, end]}
              baseOpacity={baseOpacity}
              className={item.className}
            />
            {idx < tokens.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </p>
  );
}

interface SlidingImageProps {
  src: string;
  alt: string;
  direction?: "left" | "right";
  className?: string;
  imageClassName?: string;
  sizes?: string;
  parallaxPercent?: number;
  priority?: boolean;
  overlayGradient?: string;
}

/**
 * Smooth directional clip-path pan-in image with subtle scale settle and
 * continuous GPU-composited scroll parallax. Observes the unclipped outer
 * wrapper so clipPath: inset(100%) never blocks IntersectionObserver entry.
 */
export function SlidingImage({
  src,
  alt,
  direction = "left",
  className = "",
  imageClassName = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  parallaxPercent = 8,
  priority = false,
  overlayGradient,
}: SlidingImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -40px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallaxPercent}%`, `${parallaxPercent}%`]
  );
  const y = useSpring(rawY, { stiffness: 75, damping: 24 });

  const initialClip =
    direction === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? false : { clipPath: initialClip }}
        animate={
          prefersReducedMotion || isInView
            ? { clipPath: "inset(0 0% 0 0)" }
            : { clipPath: initialClip }
        }
        transition={{ duration: 1.35, ease: EXPO_OUT }}
        className="relative w-full h-full overflow-hidden"
      >
        <motion.div
          initial={prefersReducedMotion ? false : { scale: 1.12 }}
          animate={
            prefersReducedMotion || isInView ? { scale: 1 } : { scale: 1.12 }
          }
          transition={{ duration: 1.6, ease: EXPO_OUT }}
          style={prefersReducedMotion ? undefined : { y }}
          className="relative w-full h-[118%] -top-[9%] will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={`object-cover ${imageClassName}`}
          />
        </motion.div>
        {overlayGradient && (
          <div
            className={`absolute inset-0 pointer-events-none ${overlayGradient}`}
          />
        )}
      </motion.div>
    </div>
  );
}

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
}

/**
 * Counts cleanly up from 0 when scrolled into view.
 */
export function AnimatedCounter({
  to,
  suffix = "",
  className = "",
  suffixClassName = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? to : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(to);
      return;
    }
    if (!inView) return;

    const controls = animate(0, to, {
      duration: 1.6,
      ease: EXPO_OUT,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, to, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
}
