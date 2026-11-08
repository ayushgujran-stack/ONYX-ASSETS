"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Direct real-time hardware cursor coordinates for the leading dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Physics-based spring trailing coordinates for the outer following circle
  const springConfig = { damping: 25, stiffness: 320, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is touch-only (mobile/tablet with no hover capability)
    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchOnly) return;

    setIsPointer(true);

    // Suppress default OS cursor across all elements
    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Dynamic hover detection for interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, input, select, textarea, [role='button'], [data-cursor-hover], label, option"
      );
      setIsHovered(Boolean(interactive));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isPointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] select-none">
      {/* Trailing Outer Golden Circle (follows the dot with smooth physics spring) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 flex items-center justify-center will-change-transform"
      >
        <motion.div
          animate={{
            width: isHovered ? 60 : 32,
            height: isHovered ? 60 : 32,
            opacity: isVisible ? 1 : 0,
            scale: isClicked ? 0.88 : 1,
            backgroundColor: isHovered
              ? "rgba(197, 160, 89, 0.18)" // Translucent gold reveals words behind
              : "rgba(197, 160, 89, 0.05)",
            borderColor: isHovered
              ? "rgba(197, 160, 89, 0.9)"
              : "rgba(156, 128, 82, 0.6)",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.2,
          }}
          className="rounded-full border-[1.5px] backdrop-blur-[1px] flex items-center justify-center shadow-[0_0_12px_rgba(197,160,89,0.35)]"
        />
      </motion.div>

      {/* Leading Center Golden Dot (moves immediately with mouse coordinates) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 4 : 6,
          height: isHovered ? 4 : 6,
          opacity: isVisible ? (isHovered ? 0.3 : 1) : 0,
          scale: isClicked ? 0.75 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 32,
        }}
        className="fixed top-0 left-0 rounded-full bg-[#c5a059] shadow-[0_0_8px_rgba(197,160,89,0.9),0_0_2px_rgba(0,0,0,0.5)] will-change-transform"
      />
    </div>
  );
}
