/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  title?: string;
  subtitle?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
  className?: string;
  onCardClick?: (card: CardItem, index: number) => void;
}

const MAX_VISIBLE_DESKTOP = 7;
const HALF_DESKTOP = 3;

const MAX_VISIBLE_MOBILE = 5;
const HALF_MOBILE = 2;

const FAN_POSITIONS_DESKTOP = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
];

const FAN_POSITIONS_MOBILE = [
  { rot: -12, scale: 0.84, x: -16, y: -0.5, zIndex: 1 },
  { rot: -6,  scale: 0.92, x: -8,  y: -0.2, zIndex: 3 },
  { rot: 0,   scale: 1.0,  x: 0,   y: 0.0,  zIndex: 10 },
  { rot: 6,   scale: 0.92, x: 8,   y: -0.2, zIndex: 3 },
  { rot: 12,  scale: 0.84, x: 16,  y: -0.5, zIndex: 1 },
];

function subscribeMobile(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getIsMobileSnapshot() {
  return window.innerWidth < 640;
}

function getServerIsMobileSnapshot() {
  return false;
}

const emptySubscribe = () => () => {};

function getResponsiveMultiplier(width: number) {
  if (width < 360) return 0.24;
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

/**
 * Returns a multiplier (0..1] that scales y-offsets and entry animation
 * distances when the viewport is too short for the ideal layout height.
 */
function getHeightMultiplier(width: number) {
  let idealPx: number;
  if (width < 480) idealPx = 20 * 16;
  else if (width < 640) idealPx = 24 * 16;
  else if (width < 768) idealPx = 28 * 16;
  else if (width < 1024) idealPx = 34 * 16;
  else idealPx = 38 * 16;

  if (typeof window === "undefined") return 1;
  const available = window.innerHeight * 0.7;
  if (available >= idealPx) return 1;
  return Math.max(0.65, available / idealPx);
}

function getSlotConfig(isMobile: boolean, totalCards: number, slot: number) {
  const maxVisible = isMobile ? MAX_VISIBLE_MOBILE : MAX_VISIBLE_DESKTOP;
  const positions = isMobile ? FAN_POSITIONS_MOBILE : FAN_POSITIONS_DESKTOP;

  if (totalCards >= maxVisible) {
    return positions[slot] || positions[positions.length - 1];
  }
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  const maxRot = isMobile ? 12 : 21;
  const maxX = isMobile ? 16 : 30;
  const maxY = isMobile ? -0.5 : 7.3;

  return {
    rot: distance * maxRot,
    scale: 1.0 - (isMobile ? 0.16 : 0.2244) * absDistance * absDistance,
    x: distance * maxX,
    y: absDistance * absDistance * maxY,
    zIndex: 10 - Math.abs(slot - center),
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-black/15 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-[16px] text-[#141416] dark:text-white/80 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:border-black/30 hover:bg-white/80 active:scale-95 transition-all duration-300";

export function SocialCards({ cards, className = "", onCardClick }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getIsMobileSnapshot,
    getServerIsMobileSnapshot
  );

  const totalCards = cards.length;
  const maxVisible = isMobile ? MAX_VISIBLE_MOBILE : MAX_VISIBLE_DESKTOP;
  const half = isMobile ? HALF_MOBILE : HALF_DESKTOP;
  const needsPagination = totalCards > maxVisible;

  const [userCenterIndex, setUserCenterIndex] = useState<number | null>(null);
  const centerIndex = userCenterIndex ?? (needsPagination ? half : totalCards >> 1);

  const getVisibleMap = useCallback((center: number, mob: boolean) => {
    const map = new Map<number, number>();
    const maxVis = mob ? MAX_VISIBLE_MOBILE : MAX_VISIBLE_DESKTOP;
    const h = mob ? HALF_MOBILE : HALF_DESKTOP;

    if (totalCards <= maxVis) {
      cards.forEach((_, i) => map.set(i, i));
      return map;
    }
    for (let slot = 0; slot < maxVis; slot++) {
      map.set(((center + slot - h) % totalCards + totalCards) % totalCards, slot);
    }
    return map;
  }, [totalCards, cards]);

  const cycle = useCallback((direction: "left" | "right") => {
    if (isAnimating.current || !needsPagination) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setUserCenterIndex(prev => {
      const current = prev ?? (needsPagination ? half : totalCards >> 1);
      return direction === "right" ? (current + 1) % totalCards : (current - 1 + totalCards) % totalCards;
    });
  }, [totalCards, needsPagination, half]);

  // Touch Swipe Handlers for Mobile Phones
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect intentional horizontal swipe vs vertical scroll
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        cycle("right");
      } else {
        cycle("left");
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards || !isMounted) return;

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex, isMobile);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? maxVisible : totalCards;
    const config = (slot: number) => getSlotConfig(isMobile, slotCount, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    const enterDistance = isMobile ? 22 : 40;
    const exitDistance = isMobile ? 22 : 40;

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${6 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, {
            ...target,
            duration: 1.1,
            ease: "elastic.out(1.05,.78)",
            delay: 0.12 + slot * 0.05,
            overwrite: "auto",
            onComplete: onCardDone,
          });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? enterDistance : -enterDistance;
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * hMult}rem`,
            rotation: direction === "right" ? 16 : -16,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 0.55,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: onCardDone,
          });
        } else {
          gsap.to(card, {
            ...target,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: onCardDone,
          });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -exitDistance : exitDistance;
        gsap.to(card, {
          x: `${exitX}rem`,
          y: 0,
          opacity: 0,
          scale: 0.4,
          rotation: direction === "right" ? -16 : 16,
          duration: 0.35,
          ease: "power2.in",
          overwrite: "auto",
          zIndex: 0,
        });
      } else {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    // Desktop hover interactions (only active when not on mobile touch device)
    if (!isMobile) {
      const visibleEntries: { el: HTMLElement; slot: number }[] = [];
      cardElements.forEach((el, i) => {
        const slot = visibleMap.get(i);
        if (slot !== undefined) visibleEntries.push({ el, slot });
      });
      visibleEntries.sort((a, b) => a.slot - b.slot);

      let activeSlot: number | null = null;
      let leaveTimer: ReturnType<typeof setTimeout> | null = null;
      const centerSlot = visibleEntries.length >> 1;

      const updateHoverLayout = (hoveredSlot: number | null) => {
        const mult = getResponsiveMultiplier(window.innerWidth);
        const hM = getHeightMultiplier(window.innerWidth);

        visibleEntries.forEach(({ el, slot }) => {
          const base = config(slot);
          let targetX = base.x * mult;
          let targetY = base.y * hM;
          let targetRot = base.rot;
          let targetScale = base.scale;
          let delay = 0;

          if (hoveredSlot !== null) {
            const distance = Math.abs(slot - hoveredSlot);
            delay = distance * 0.02;

            if (slot === hoveredSlot) {
              targetY -= 2.0 * hM;
              targetScale *= 1.06;
            } else {
              const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
              const pushStrength = 7 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

              if (slot < hoveredSlot) {
                targetX -= pushStrength * mult;
                targetRot -= 3 / (distance + 1);
              } else {
                targetX += pushStrength * mult;
                targetRot += 3 / (distance + 1);
              }
            }
          } else {
            delay = Math.abs(slot - centerSlot) * 0.02;
          }

          gsap.to(el, {
            x: `${targetX}rem`,
            y: `${targetY}rem`,
            rotation: targetRot,
            scale: targetScale,
            duration: 0.5,
            delay,
            ease: "elastic.out(1,.75)",
            overwrite: "auto",
          });
          gsap.set(el, { zIndex: base.zIndex });
        });
      };

      const enterHandlers = visibleEntries.map(({ el, slot }) => {
        const handler = () => {
          if (isAnimating.current) return;
          if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
          if (activeSlot !== slot) { activeSlot = slot; updateHoverLayout(slot); }
        };
        el.addEventListener("mouseenter", handler);
        return { el, handler };
      });

      const onMouseLeave = () => {
        if (isAnimating.current) return;
        if (leaveTimer) clearTimeout(leaveTimer);
        leaveTimer = setTimeout(() => { activeSlot = null; updateHoverLayout(null); }, 50);
      };
      container.addEventListener("mouseleave", onMouseLeave);

      return () => {
        enterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
        container.removeEventListener("mouseleave", onMouseLeave);
        if (leaveTimer) clearTimeout(leaveTimer);
      };
    }
  }, [centerIndex, totalCards, getVisibleMap, needsPagination, isMobile, maxVisible, isMounted]);

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg className="relative z-[2] w-5 h-5 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <section className={`flex flex-col items-center w-full py-4 sm:py-6 px-3 sm:px-8 relative z-20 select-none ${className}`}>
      {/* Interactive Fanned Arc Area with Touch Swipe */}
      <div
        className="flex items-center justify-center w-full max-w-[90rem] touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div ref={containerRef} className="fan-layout flex relative justify-center items-center w-full max-w-[80rem]">
          {cards.map((card, index) => {
            const isCenterCard = index === centerIndex;
            const image = (
              <div className="relative w-full h-full overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] lg:rounded-[2.5rem] bg-[#141416]/10 border border-black/10 dark:border-white/10 shadow-2xl group">
                <img
                  src={card.imgUrl}
                  loading="lazy"
                  alt={card.alt || `Landmark ${index}`}
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* On-card Title Overlay (Visible on center card on mobile, and on hover on desktop) */}
                {card.title && (
                  <div
                    className={`absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white pointer-events-none transition-opacity duration-300 ${
                      isCenterCard ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <p className="font-serif text-base sm:text-lg leading-tight text-white">{card.title}</p>
                    {card.subtitle && (
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#dfc082] mt-0.5">{card.subtitle}</p>
                    )}
                  </div>
                )}
              </div>
            );

            const handleClick = (e: React.MouseEvent) => {
              if (onCardClick) {
                e.preventDefault();
                onCardClick(card, index);
              }
            };

            return card.linkUrl ? (
              <a
                key={index}
                href={card.linkUrl}
                onClick={handleClick}
                target={card.linkUrl.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="fan-card block cursor-pointer"
              >
                {image}
              </a>
            ) : (
              <div
                key={index}
                onClick={handleClick}
                className={`fan-card ${onCardClick ? "cursor-pointer" : ""}`}
              >
                {image}
              </div>
            );
          })}
        </div>
      </div>

      {/* Touch-Friendly Responsive Navigation Controls & Indicator Dots */}
      {needsPagination && (
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10 z-30">
          <button
            className={`${ARROW_CLASSES} w-11 h-11 sm:w-12 sm:h-12`}
            onClick={() => cycle("left")}
            aria-label="Previous landmark"
          >
            {chevron("left")}
          </button>

          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isAnimating.current) return;
                  setUserCenterIndex(i);
                }}
                aria-label={`View landmark ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === centerIndex
                    ? "w-6 bg-[#9c8052]"
                    : "w-2 bg-black/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>

          <button
            className={`${ARROW_CLASSES} w-11 h-11 sm:w-12 sm:h-12`}
            onClick={() => cycle("right")}
            aria-label="Next landmark"
          >
            {chevron("right")}
          </button>
        </div>
      )}
    </section>
  );
}

export default SocialCards;
export { SocialCards as CardFanCarousel };
