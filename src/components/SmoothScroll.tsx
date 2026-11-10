"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    // Preserve native momentum on touch devices and respect reduced-motion preferences
    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      anchors: true,
      autoResize: true,
    });

    window.__lenis = lenis;

    let rafId = 0;
    let resizeRaf = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const scheduleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => lenis.resize());
    };

    const observer = new MutationObserver(scheduleResize);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      observer.disconnect();
      lenis.destroy();
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
